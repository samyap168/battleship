// Multiplayer menu: host / join, then the 5v5 lobby (seats, difficulty for the bots that fill empty seats).
import { TEAMS } from '../core/config.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const NAME_KEY = 'aa.mpname';
const get = (k) => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
const set = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

export class LobbyUI {
  constructor(root) {
    this.root = root;
    this.cb = {};
    this.session = null;
    this.net = 'peer';
  }
  on(ev, fn) { this.cb[ev] = fn; return this; }

  get open() { return !this.root.classList.contains('hidden'); }
  hide() { this.root.classList.add('hidden'); }

  // ---------------------------------------------------------------- entry
  showEntry(prefillCode = '', error = '') {
    this.session = null;
    this.root.classList.remove('hidden');
    const name = get(NAME_KEY) || '';
    this.root.innerHTML = `
      <div class="mp-box panel ornate">
        <div class="mp-title">MULTIPLAYER</div>
        <div class="mp-sub">5v5 with friends and colleagues · empty seats are filled by bots</div>
        <label class="mp-lbl">Your name</label>
        <input id="mpName" maxlength="18" placeholder="Captain" value="${esc(name)}" autocomplete="off" />
        <div class="mp-cols">
          <div class="mp-col">
            <button class="btn-primary mp-btn" id="mpHost">HOST A GAME</button>
            <div class="mp-hint">You get a room code. Share it (or the invite link) with up to 9 others.</div>
          </div>
          <div class="mp-col">
            <input id="mpCode" class="mp-code" maxlength="5" placeholder="CODE" value="${esc(prefillCode)}" autocomplete="off" spellcheck="false" />
            <button class="btn-ghost mp-btn" id="mpJoin">JOIN</button>
            <div class="mp-hint">Enter the 5-letter code from the host.</div>
          </div>
        </div>
        <div class="seg mp-net" id="mpNet"><button data-v="peer" class="on">Online (internet)</button><button data-v="local">Two windows, one PC</button></div>
        <div class="mp-err" id="mpErr">${esc(error)}</div>
        <button class="btn-ghost mp-back" id="mpBack">Back</button>
      </div>`;
    const $ = (s) => this.root.querySelector(s);
    const nameEl = $('#mpName'), codeEl = $('#mpCode'), err = $('#mpErr');
    $('#mpNet').querySelectorAll('button').forEach((b) => { b.onclick = () => { this.net = b.dataset.v; $('#mpNet').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); }; });
    $('#mpNet').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x.dataset.v === this.net));
    codeEl.oninput = () => { codeEl.value = codeEl.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); };
    const busy = (on, text) => { this.root.querySelectorAll('button').forEach((b) => (b.disabled = on)); err.textContent = text || ''; err.classList.toggle('info', on); };
    const nm = () => { const v = nameEl.value.trim() || 'Captain'; set(NAME_KEY, v); return v; };
    $('#mpHost').onclick = async () => { busy(true, 'Opening a room…'); try { await this.cb.host(nm(), this.net); } catch (e) { busy(false, e.message); } };
    $('#mpJoin').onclick = async () => {
      if (codeEl.value.length < 4) { err.textContent = 'Enter the room code first.'; return; }
      busy(true, 'Connecting…');
      try { await this.cb.join(nm(), codeEl.value, this.net); } catch (e) { busy(false, e.message); }
    };
    $('#mpBack').onclick = () => { this.hide(); this.cb.back && this.cb.back(); };
    (prefillCode ? nameEl : nameEl).focus();
  }

  // ---------------------------------------------------------------- lobby
  showLobby(session, code, net) {
    this.session = session; this.code = code; this.netKind = net;
    this.root.classList.remove('hidden');
    this.render();
  }

  render() {
    const s = this.session;
    if (!s) return;
    const isHost = s.isHost, mine = s.mySeat;
    const inviteUrl = `${location.origin}${location.pathname}?join=${this.code}${this.netKind === 'local' ? '&net=local' : ''}`;
    const col = (team) => {
      const rows = [];
      for (let k = 0; k < 5; k++) {
        const i = team * 5 + k, seat = s.seats[i];
        const cls = seat ? (i === mine ? 'me' : 'human') : 'bot';
        const label = seat ? esc(seat.name) + (i === mine ? ' <i>you</i>' : '') + (seat.peer === 'host' ? ' <i>host</i>' : '') : 'Bot';
        rows.push(`<button class="seat ${cls}" data-i="${i}" ${seat ? 'disabled' : ''}>${label}</button>`);
      }
      return `<div class="mp-team" style="--c:${TEAMS[team].css}"><div class="mp-th">${esc(TEAMS[team].name)}</div>${rows.join('')}</div>`;
    };
    const humans = s.humanCount();
    this.root.innerHTML = `
      <div class="mp-box panel ornate mp-lobby">
        <div class="mp-title">LOBBY</div>
        <div class="mp-codebar">
          <div><div class="mp-lbl">Room code</div><div class="mp-roomcode">${esc(this.code)}</div></div>
          <button class="btn-ghost" id="mpCopy">Copy invite link</button>
        </div>
        <div class="mp-teams">${col(0)}<div class="mp-vs">VS</div>${col(1)}</div>
        <div class="mp-meta">${humans} ${humans === 1 ? 'player' : 'players'} · ${10 - humans} bot${10 - humans === 1 ? '' : 's'} fill the rest${s.stats.rtt ? ` · ping ${s.stats.rtt} ms` : ''}</div>
        ${isHost ? `
          <div class="row"><div class="lbl">Bots</div><div class="seg" id="mpDiff"><button data-v="easy">Recruit</button><button data-v="normal">Captain</button><button data-v="hard">Admiral</button></div></div>
          <button class="btn-primary mp-btn" id="mpStart">START MATCH</button>
          <div class="mp-hint">Click an empty seat to switch sides. The match runs in your browser: keep this tab in the foreground.</div>`
        : `<div class="mp-wait">Waiting for the host to start… <span class="dim">Click an empty seat to switch sides.</span></div>`}
        <div class="mp-err" id="mpErr"></div>
        <button class="btn-ghost mp-back" id="mpLeave">Leave</button>
      </div>`;
    const $ = (q) => this.root.querySelector(q);
    this.root.querySelectorAll('.seat.bot').forEach((b) => { b.onclick = () => s.moveToSeat(+b.dataset.i); });
    $('#mpCopy').onclick = async () => { try { await navigator.clipboard.writeText(inviteUrl); $('#mpCopy').textContent = 'Copied!'; } catch { $('#mpErr').textContent = inviteUrl; } };
    $('#mpLeave').onclick = () => { this.cb.leave && this.cb.leave(); };
    if (isHost) {
      $('#mpDiff').querySelectorAll('button').forEach((b) => { b.classList.toggle('on', b.dataset.v === s.diff); b.onclick = () => s.setDifficulty(b.dataset.v); });
      $('#mpStart').onclick = () => { $('#mpStart').disabled = true; s.start(); };
    }
  }

  showLoading(text = 'Preparing the arena…') {
    this.root.classList.remove('hidden');
    this.root.innerHTML = `<div class="mp-box panel ornate"><div class="mp-title">${esc(text)}</div><div class="mp-sub">Waiting for every captain to be ready</div></div>`;
  }
}
