// Transports for multiplayer. Star topology: the host is the hub; clients only talk to the host.
//   PeerTransport  - WebRTC data channels via PeerJS (room code = peer id). Works from a static page, no game server.
//   LocalTransport - BroadcastChannel between tabs of one browser (dev, tests, "two windows on one PC").
// Both deliver small JSON messages reliably and in order, which is all the lockstep protocol needs.

export const HOST_ID = 'host';
const rid = () => Math.random().toString(36).slice(2, 10);

export class Transport {
  constructor() { this.h = {}; this.id = null; this.isHost = false; this.peers = new Set(); this.closed = false; }
  on(ev, fn) { (this.h[ev] ||= []).push(fn); return this; }
  emit(ev, ...a) { for (const f of this.h[ev] || []) f(...a); }
  /** Host: send to everyone. */
  broadcast(msg) { for (const p of this.peers) this.send(p, msg); }
}

// ---------------------------------------------------------------------------
export class LocalTransport extends Transport {
  constructor() { super(); this.kind = 'local'; this.bc = null; this.hb = null; this.seen = new Map(); }

  _open(code) {
    this.bc = new BroadcastChannel('armada-ascension-' + code);
    this.bc.onmessage = (e) => this._recv(e.data);
  }

  host(code) {
    this.isHost = true; this.id = HOST_ID;
    return new Promise((resolve) => {
      this._open(code);
      this.hb = setInterval(() => {
        const now = performance.now();
        for (const [p, t] of this.seen) if (now - t > 60000) this._drop(p); // generous: a peer's page may be busy compiling shaders
      }, 2000);
      resolve();
    });
  }

  join(code) {
    this.id = 'p' + rid();
    return new Promise((resolve, reject) => {
      this._open(code);
      const t = setTimeout(() => reject(new Error('No room with that code is open in this browser.')), 3000);
      this._welcome = () => { clearTimeout(t); this.hb = setInterval(() => this._raw(HOST_ID, { t: '__hb' }), 1500); resolve(); };
      this._raw(HOST_ID, { t: '__join' });
    });
  }

  _raw(to, msg) { if (this.bc) this.bc.postMessage({ from: this.id, to, msg }); }
  send(to, msg) { this._raw(to, msg); }

  _recv({ from, to, msg }) {
    if (to !== this.id || from === this.id) return;
    if (this.isHost) {
      this.seen.set(from, performance.now());
      if (msg.t === '__join') { if (!this.peers.has(from)) { this.peers.add(from); this._raw(from, { t: '__welcome' }); this.emit('join', from); } return; }
      if (msg.t === '__hb') return;
      if (msg.t === '__leave') { this._drop(from); return; }
      this.emit('message', from, msg);
    } else {
      if (msg.t === '__welcome') { if (this._welcome) this._welcome(); return; }
      if (msg.t === '__close') { this.emit('close', 'The host closed the room.'); return; }
      this.emit('message', from, msg);
    }
  }

  _drop(p) { this.seen.delete(p); if (this.peers.delete(p)) this.emit('leave', p); }

  close() {
    if (this.closed) return;
    this.closed = true;
    clearInterval(this.hb);
    if (this.bc) {
      if (this.isHost) this.broadcast({ t: '__close' }); else this._raw(HOST_ID, { t: '__leave' });
      this.bc.close();
    }
  }
}

// ---------------------------------------------------------------------------
const PREFIX = 'armada-ascension-';
const ICE = [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478' }];

function peerConfig() {
  // Optional overrides for self-hosted signalling / TURN (e.g. ?peerhost=peers.example.com&turn=turn:...&tuser=..&tpass=..)
  const q = new URLSearchParams(location.search);
  const cfg = { config: { iceServers: [...ICE] }, debug: 0 };
  if (q.get('peerhost')) { // own signalling server: ?peerhost=host[&peerport=443][&peerpath=/][&peersecure=0]
    cfg.host = q.get('peerhost');
    cfg.secure = q.get('peersecure') !== '0';
    cfg.port = +(q.get('peerport') || (cfg.secure ? 443 : 80));
    cfg.path = q.get('peerpath') || '/';
  }
  if (q.get('turn')) cfg.config.iceServers.push({ urls: q.get('turn'), username: q.get('tuser') || '', credential: q.get('tpass') || '' });
  return cfg;
}

const friendly = (err) => {
  const t = err && (err.type || err.message) || String(err);
  if (t === 'unavailable-id') return 'That room code is already in use. Host a new game.';
  if (t === 'peer-unavailable') return 'No room with that code. Check the code, and that the host has the lobby open.';
  if (t === 'network' || t === 'server-error' || t === 'socket-error' || t === 'socket-closed') return 'Could not reach the matchmaking service (blocked network?). Try another network, or host from a different connection.';
  return 'Connection problem: ' + t;
};

export class PeerTransport extends Transport {
  constructor() { super(); this.kind = 'peer'; this.peer = null; this.conns = new Map(); this.up = null; }

  async _newPeer(id) {
    const { Peer } = await import('peerjs');
    return id ? new Peer(id, peerConfig()) : new Peer(peerConfig());
  }

  async host(code) {
    this.isHost = true; this.id = HOST_ID;
    const peer = await this._newPeer(PREFIX + code.toLowerCase());
    this.peer = peer;
    await new Promise((resolve, reject) => {
      peer.on('open', resolve);
      peer.on('error', (e) => reject(new Error(friendly(e))));
    });
    peer.on('error', (e) => this.emit('error', new Error(friendly(e))));
    peer.on('disconnected', () => { try { peer.reconnect(); } catch { /* destroyed */ } }); // signalling dropped: the open data channels carry on
    peer.on('connection', (conn) => {
      conn.on('open', () => {
        this.conns.set(conn.peer, conn); this.peers.add(conn.peer);
        this.emit('join', conn.peer);
      });
      conn.on('data', (m) => this.emit('message', conn.peer, m));
      const gone = () => { if (this.conns.delete(conn.peer)) { this.peers.delete(conn.peer); this.emit('leave', conn.peer); } };
      conn.on('close', gone); conn.on('error', gone);
    });
  }

  async join(code) {
    const peer = await this._newPeer(null);
    this.peer = peer;
    await new Promise((resolve, reject) => { peer.on('open', resolve); peer.on('error', (e) => reject(new Error(friendly(e)))); });
    this.id = peer.id;
    const conn = peer.connect(PREFIX + code.toLowerCase(), { reliable: true, serialization: 'json' });
    this.up = conn;
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('Could not connect to the host (a strict firewall may block direct connections).')), 15000);
      conn.on('open', () => { clearTimeout(t); resolve(); });
      peer.on('error', (e) => { clearTimeout(t); reject(new Error(friendly(e))); });
      conn.on('error', (e) => { clearTimeout(t); reject(new Error(friendly(e))); });
    });
    conn.on('data', (m) => this.emit('message', HOST_ID, m));
    conn.on('close', () => { if (!this.closed) this.emit('close', 'Lost the connection to the host.'); });
  }

  send(to, msg) {
    const c = this.isHost ? this.conns.get(to) : this.up;
    if (c && c.open) c.send(msg);
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    try { this.peer && this.peer.destroy(); } catch { /* already gone */ }
  }
}

export function randomRoomCode() {
  const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no look-alikes (I, L, O, 0, 1)
  let s = '';
  for (let i = 0; i < 5; i++) s += A[Math.floor(Math.random() * A.length)];
  return s;
}
