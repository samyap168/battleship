// Multiplayer session: lobby, then a replicated match.
//
// How a match stays in sync (no game server, the host's browser is the hub):
//   * Every peer runs the same deterministic simulation (seeded RNG, fixed 60 Hz ticks).
//   * A player's click becomes a small command. It goes to the host, which stamps it with the tick it will run on
//     (the next one) and relays it to everybody. Every peer applies it at that same tick.
//   * The host announces how far the sim may run ("adv n": no new command will land at or before tick n). Peers sim
//     up to n minus a small jitter buffer, so a late packet never forces a rollback.
//   * Every few seconds the host sends a state snapshot + hash. A peer that drifted (different JS engine rounding,
//     a long tab freeze) detects it by hash and is pulled back onto the host's state.
import { Cmd, sanitize, applyCommand } from './commands.js';
import { snapshot, applySnapshot, stateHash } from './state.js';
import { HOST_ID } from './transport.js';

export const TICK = 1 / 60;
const ADV_EVERY = 2;      // ticks between "adv" messages (30 per second)
const SNAP_EVERY = 300;   // ticks between snapshots (5 s)
const BUF_MIN = 3, BUF_MAX = 12; // clients stay `buf` ticks behind the host's announced tick (jitter absorber, adapts to the network)
const SEATS = 10;
const cleanName = (n) => String(n || 'Captain').replace(/[<>&"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 18) || 'Captain'; // names reach innerHTML in the kill feed: strip markup
const CMD_PER_SEC = 40, CHAT_GAP_MS = 500;
export { cleanName };

export class Session {
  constructor(transport, name) {
    this.t = transport; this.name = name || 'Captain';
    this.isHost = transport.isHost;
    this.h = {};
    this.seats = Array(SEATS).fill(null); // { peer, name } or null (a bot)
    this.diff = 'normal';
    this.phase = 'lobby'; // lobby | loading | play | closed
    this.G = null; this.cfg = null;
    this.tick = 0; this.acc = 0; this.allowed = 0; this.sched = new Map(); this.outbox = []; this.snaps = new Map();
    this.ready = new Set(); this.go = false; this.over = null;
    this.stats = { desyncs: 0, rtt: 0, behind: 0, ticksRun: 0 };
    this.buf = 4; this.lastStall = 0;
    this.maxSteps = 6; this.accCap = 0.25; // per-frame catch-up limits (tests raise them to run faster than real time)
    this.nameOf = new Map();
    transport.on('message', (from, msg) => this._onMsg(from, msg));
    transport.on('leave', (p) => this._onLeave(p));
    transport.on('close', (why) => this._closed(why));
    transport.on('error', (e) => this.emit('error', e));
    if (this.isHost) {
      this.nameOf.set(HOST_ID, this.name);
      this.myId = HOST_ID;
      this._place(HOST_ID, this.name, 2);
      transport.on('join', () => {}); // seats are assigned when the player says hello
    } else {
      this.myId = transport.id;
      transport.send(HOST_ID, { t: 'hello', name: this.name });
      this.pingT = setInterval(() => transport.send(HOST_ID, { t: 'ping', ts: performance.now() }), 2000);
    }
  }

  /** Host broadcast: seated players only (an unseated or rejected connection must not eat bandwidth). */
  _bcast(msg) { for (const s of this.seats) if (s && s.peer !== HOST_ID) this.t.send(s.peer, msg); }

  on(ev, fn) { (this.h[ev] ||= []).push(fn); return this; }
  emit(ev, ...a) { for (const f of this.h[ev] || []) f(...a); }

  // ------------------------------------------------------------------ lobby
  get mySeat() { return this.seats.findIndex((s) => s && s.peer === this.myId); }
  humanCount() { return this.seats.filter(Boolean).length; }

  /** Seat order tries the middle lane first, then alternates teams so a lobby fills 1v1, 2v2, ... */
  _place(peer, name, prefSlot) {
    const free = (team) => [prefSlot ?? 2, 2, 0, 4, 1, 3].map((s) => team * 5 + s).find((i) => !this.seats[i]);
    const humans = (team) => this.seats.slice(team * 5, team * 5 + 5).filter(Boolean).length;
    const team = humans(0) <= humans(1) ? 0 : 1;
    let i = free(team); if (i === undefined) i = free(1 - team);
    if (i === undefined) return -1;
    this.seats[i] = { peer, name: cleanName(name) };
    return i;
  }

  _lobbyMsg() { return { t: 'lobby', seats: this.seats.map((s) => (s ? [s.peer, s.name] : null)), diff: this.diff }; }
  _pushLobby() { if (!this.isHost) return; this._bcast(this._lobbyMsg()); this.emit('lobby'); }

  setDifficulty(d) { if (this.isHost && this.phase === 'lobby') { this.diff = d; this._pushLobby(); } }
  moveToSeat(i) {
    if (this.phase !== 'lobby' || i < 0 || i >= SEATS) return;
    if (this.isHost) this._seatRequest(HOST_ID, i); else this.t.send(HOST_ID, { t: 'seat', i });
  }
  _seatRequest(peer, i) {
    if (!Number.isInteger(i) || i < 0 || i >= SEATS || this.seats[i]) return;
    const cur = this.seats.findIndex((s) => s && s.peer === peer);
    if (cur < 0) return;
    this.seats[i] = this.seats[cur]; this.seats[cur] = null;
    this._pushLobby();
  }

  // ------------------------------------------------------------------ messages
  _onMsg(from, m) {
    if (!m || typeof m !== 'object' || this.phase === 'closed') return;
    if (this.isHost) return this._hostMsg(from, m);
    switch (m.t) {
      case 'lobby':
        this.seats = m.seats.slice(0, SEATS).map((s) => (s ? { peer: String(s[0]), name: cleanName(s[1]) } : null)); this.diff = m.diff; this.emit('lobby'); break;
      case 'full': this._closed(m.why === 'started' ? 'That match has already started.' : 'The lobby is full.'); break;
      case 'chat': this.emit('chat', m); break;
      case 'start': if (this.phase === 'lobby') { this.phase = 'loading'; this.cfg = m.cfg; this.emit('start', m.cfg); } break;
      case 'go': this.go = true; this.phase = 'play'; break;
      case 'adv': this._onAdv(m); break;
      case 'snap': this.snaps.set(m.n, m); break;
      case 'over': this.over = m; break;
      case 'pong': this.stats.rtt = Math.round(performance.now() - m.ts); break;
      case 'toast': this.emit('toast', m.text); break;
      default:
    }
  }

  _hostMsg(from, m) {
    switch (m.t) {
      case 'hello': {
        if (this.phase !== 'lobby') { this.t.send(from, { t: 'full', why: 'started' }); return; }
        const name = cleanName(m.name);
        if (this.seats.some((s) => s && s.peer === from)) return;
        if (this._place(from, name) < 0) { this.t.send(from, { t: 'full' }); return; }
        this._pushLobby();
        break;
      }
      case 'seat': if (this.phase === 'lobby' && Number.isInteger(m.i)) this._seatRequest(from, m.i); break;
      case 'ready': this.ready.add(from); this._maybeGo(); break;
      case 'ping': this.t.send(from, { t: 'pong', ts: m.ts }); break;
      case 'chat': {
        const seat = this.seats.findIndex((s) => s && s.peer === from), now = performance.now();
        if (seat < 0 || now - (this._chatAt?.[seat] || 0) < CHAT_GAP_MS) break; // one message per half second
        (this._chatAt ||= [])[seat] = now;
        this._chat(seat, m.text); break;
      }
      case 'cmd': {
        if (this.phase !== 'play') return;
        const seat = this.seats.findIndex((s) => s && s.peer === from);
        const c = sanitize(m.c);
        if (seat < 0 || !c || c.k === 'bot') break;
        const now = performance.now(), r = (this._rate ||= [])[seat] ||= { t: now, n: 0 };
        if (now - r.t > 1000) { r.t = now; r.n = 0; }
        if (++r.n <= CMD_PER_SEC) this._schedule(seat, c); // a flood of orders must not freeze every peer
        break;
      }
      default:
    }
  }

  _onLeave(peer) {
    if (!this.isHost) return;
    const seat = this.seats.findIndex((s) => s && s.peer === peer);
    if (seat < 0) return;
    if (this.phase === 'lobby') { this.seats[seat] = null; this._pushLobby(); return; }
    this.seats[seat] = null;
    if (this.phase === 'play' || this.phase === 'loading') { this._schedule(seat, Cmd.bot()); this.ready.delete(peer); this._maybeGo(); }
  }

  _closed(why) {
    if (this.phase === 'closed') return;
    this.phase = 'closed';
    clearInterval(this.pingT); clearTimeout(this._goT);
    try { this.t.close(); } catch { /* already gone */ }
    this.emit('closed', why);
  }

  leave() {
    clearInterval(this.pingT); clearTimeout(this._goT);
    this.phase = 'closed';
    this.t.close();
  }

  // ------------------------------------------------------------------ match start
  /** Host: lock the lobby and tell everyone to build the match. */
  start() {
    if (!this.isHost || this.phase !== 'lobby') return;
    const seed = (Math.random() * 4294967296) >>> 0;
    this.cfg = { seed, diff: this.diff, seats: this.seats.map((s) => (s ? [s.peer, s.name] : null)) };
    this.phase = 'loading';
    this._bcast({ t: 'start', cfg: this.cfg });
    this.emit('start', this.cfg);
    this.loadT = performance.now();
    this._maybeGo();
  }

  /** The Game is built (host or client): clients tell the host they are ready. */
  attachGame(G) {
    this.G = G; this.tick = 0; this.acc = 0;
    if (this.isHost) { this.ready.add(HOST_ID); this._maybeGo(); } else this.t.send(HOST_ID, { t: 'ready' });
  }

  _maybeGo() {
    if (!this.isHost || this.phase !== 'loading' || !this.G) return;
    const humans = this.seats.filter(Boolean);
    const waiting = humans.filter((s) => !this.ready.has(s.peer));
    if (waiting.length && performance.now() - this.loadT < 60000) { clearTimeout(this._goT); this._goT = setTimeout(() => this._maybeGo(), 500); return; }
    for (const s of waiting) { const i = this.seats.indexOf(s); this.seats[i] = null; this._schedule(i, Cmd.bot()); this.t.send(s.peer, { t: 'toast', text: 'Too slow to load: a bot took your seat.' }); }
    this.phase = 'play'; this.go = true;
    this._bcast({ t: 'go' });
  }

  // ------------------------------------------------------------------ chat
  /** Say something. "/t text" goes to your team only. */
  chat(text) {
    text = String(text || '').trim().slice(0, 140);
    if (!text) return;
    if (this.isHost) { const seat = this.mySeat; if (seat >= 0) this._chat(seat, text); } else this.t.send(HOST_ID, { t: 'chat', text });
  }
  _chat(seat, text) {
    text = String(text || '').trim().slice(0, 140);
    if (!text) return;
    const team = Math.floor(seat / 5), teamOnly = /^\/t\s/i.test(text);
    const msg = { t: 'chat', name: this.seats[seat].name, team, text: teamOnly ? text.replace(/^\/t\s+/i, '') : text, teamOnly };
    for (const [i, s] of this.seats.entries()) {
      if (!s || (teamOnly && Math.floor(i / 5) !== team)) continue;
      if (s.peer === HOST_ID) this.emit('chat', msg); else this.t.send(s.peer, msg);
    }
  }

  // ------------------------------------------------------------------ the match loop
  /** Local player's command (already built with Cmd.*). */
  command(c) {
    if (this.phase !== 'play' && this.phase !== 'loading') return;
    if (this.isHost) { const seat = this.mySeat; if (seat >= 0) this._schedule(seat, c); } else this.t.send(HOST_ID, { t: 'cmd', c });
  }

  _schedule(seat, c) {
    const k = this.tick + 1;
    (this.sched.get(k) || this.sched.set(k, []).get(k)).push([seat, c]);
    this.outbox.push([k, seat, c]);
  }

  _onAdv(m) {
    for (const [k, seat, c] of m.cmds) (this.sched.get(k) || this.sched.set(k, []).get(k)).push([seat, c]);
    if (m.n > this.allowed) this.allowed = m.n;
  }

  /** Drive the match from the render loop. */
  update(dt) {
    const G = this.G;
    if (!G || !this.go || this.phase === 'closed') return;
    this.acc = Math.min(this.acc + dt, this.accCap);
    let steps = 0;
    if (this.isHost) {
      while (this.acc >= TICK && steps < this.maxSteps) { this.acc -= TICK; this._step(); this._hostAfter(); steps++; }
    } else {
      const lag = this.allowed - this.buf - this.tick;
      this.stats.behind = Math.max(0, lag); this.stats.buf = this.buf;
      // normal pace, or a faster catch-up when the tab was frozen / the network stalled
      let n = lag > 12 ? Math.min(Math.max(8, this.maxSteps), lag) : Math.floor(this.acc / TICK);
      n = Math.min(n, Math.max(0, lag));
      for (; n > 0; n--) { this.acc = Math.max(0, this.acc - TICK); this._step(); steps++; }
      if (lag <= 0) {
        // starved: we have been ready to run for 3+ ticks (50 ms) with nothing from the host: buffer a little more
        if (this.acc >= 3 * TICK && performance.now() - this.lastStall > 400) { this.buf = Math.min(BUF_MAX, this.buf + 1); this.lastStall = performance.now(); }
        this.acc = Math.min(this.acc, 3 * TICK); // do not bank time while waiting on the host
      } else if (performance.now() - this.lastStall > 12000) { this.buf = Math.max(BUF_MIN, this.buf - 1); this.lastStall = performance.now(); } // calm for a while: tighten again
    }
    if (steps > 0) this.lastAdvance = performance.now();
    G.presentPose(Math.min(1, this.acc / TICK));
    this.stats.stallMs = this.lastAdvance ? performance.now() - this.lastAdvance : 0;
    G.visualUpdate(dt);
  }

  _step() {
    const G = this.G, k = this.tick + 1;
    G.restoreTickPose();
    const list = this.sched.get(k);
    if (list) {
      this.sched.delete(k);
      for (const [seat, c] of list) applyCommand(G, G.heroes.find((h) => h.seat === seat), c);
    }
    G.tick(TICK);
    this.tick = k; this.stats.ticksRun++;
    if (!this.isHost) {
      const s = this.snaps.get(k);
      if (s) {
        this.snaps.delete(k);
        if (stateHash(G) !== s.hash) { this.stats.desyncs++; console.warn('[net] desync at tick', k, '- resyncing from the host'); }
        applySnapshot(G, s.s);
      }
    }
  }

  _hostAfter() {
    const k = this.tick, G = this.G;
    if (k % SNAP_EVERY === 0) this._bcast({ t: 'snap', n: k, hash: stateHash(G), s: snapshot(G) });
    if (k % ADV_EVERY === 0 || this.outbox.length) {
      this._bcast({ t: 'adv', n: k, cmds: this.outbox });
      this.outbox = [];
    }
    if (G.over && !this.overSent) { this.overSent = true; this._bcast({ t: 'over', tick: k, winner: G.winner }); }
  }
}
