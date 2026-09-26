import * as THREE from 'three';
import { TEAMS, AGES, AGE_HULLS, HULLS, ABILITIES, UPGRADES, MATCH } from '../core/config.js';
import { ISLANDS, LANES, BOUNDS } from '../game/map.js';
import { ICONS, abilityIcon } from './icons.js';

const _v = new THREE.Vector3();
const KEYS = ['Q', 'W', 'E', 'R'];
const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export class HUD {
  constructor(root, overlayCanvas) {
    this.root = root;
    this.cv = overlayCanvas;
    this.ctx = overlayCanvas.getContext('2d');
    this.floats = [];
    this.handlers = {};
    this.hoverAbility = -1;
    this.aiming = -1;
    this.cursor = null;
    this.annQueue = [];
    this.annBusy = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  on(name, fn) { this.handlers[name] = fn; }
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.cv.width = window.innerWidth * dpr; this.cv.height = window.innerHeight * dpr;
    this.cv.style.width = window.innerWidth + 'px'; this.cv.style.height = window.innerHeight + 'px';
  }

  // ------------------------------------------------------------------ build
  mount(G) {
    this.G = G;
    const p = G.player;
    this.root.innerHTML = `
      <div id="topbar" class="panel ornate">
        <div class="side blue"><div class="kills" id="k0">0</div><div class="era"><span>${TEAMS[0].name}</span><b id="e0">Age of Sail</b></div></div>
        <div class="clock"><div class="t" id="clock">10:00</div><div class="sun"><i id="sun"></i></div></div>
        <div class="side red"><div class="kills" id="k1">0</div><div class="era"><span>${TEAMS[1].name}</span><b id="e1">Age of Sail</b></div></div>
      </div>
      <div id="feed" class="passthru"></div>
      <div id="announce" class="passthru"></div>
      <div id="minimap" class="panel ornate"><canvas id="mm" width="600" height="368"></canvas></div>
      ${p ? `<div id="command">
        <div id="portrait" class="panel ornate">
          <div class="lvl" id="lvl">1</div>
          <div class="name" id="shipname"></div>
          <div class="sub" id="shipsub"></div>
          <div class="bar" id="hpbar"><div class="lag" id="hplag"></div><div class="fill" id="hpfill"></div><div class="shield" id="shfill"></div><div class="txt" id="hptxt"></div></div>
          <div class="bar xp"><div class="fill" id="xpfill"></div></div>
        </div>
        <div id="abilities" class="panel ornate"></div>
        <div id="goldbox" class="panel ornate">
          <div class="gold" id="gold">0</div>
          <button id="ageup"></button>
        </div>
      </div>
      <div id="shop" class="panel ornate"><h3>ARMORY</h3><div id="upgs"></div></div>` : ''}
      <div id="tip" class="panel hidden"></div>
      <div id="scoreboard" class="panel ornate hidden"></div>
      <div id="modalRoot"></div>
      <div id="deathRoot"></div>
      <div id="hintRoot" class="passthru"></div>`;
    this.elCache = {};
    this.valCache = {};
    this.$ = (id) => {
      const c = this.elCache[id];
      if (c && c.isConnected) return c;
      return (this.elCache[id] = this.root.querySelector('#' + id));
    };
    // write-if-changed helpers (avoid per-frame DOM churn)
    this.txt = (id, v) => { const k = 't' + id; if (this.valCache[k] !== v) { this.valCache[k] = v; const e = this.$(id); if (e) e.textContent = v; } };
    this.sty = (id, prop, v) => { const k = id + prop; if (this.valCache[k] !== v) { this.valCache[k] = v; const e = this.$(id); if (e) e.style[prop] = v; } };
    this.mm = this.$('mm');
    this.mmCtx = this.mm.getContext('2d');
    this.buildMinimapBase();
    this.mm.addEventListener('mousedown', (e) => {
      const r = this.mm.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 * BOUNDS.x - BOUNDS.x;
      const z = ((e.clientY - r.top) / r.height) * 2 * BOUNDS.z - BOUNDS.z;
      if (e.button === 2 && this.handlers.minimapMove) this.handlers.minimapMove(x, z);
      else if (this.handlers.minimapLook) this.handlers.minimapLook(x, z);
      e.preventDefault();
    });
    this.mm.addEventListener('contextmenu', (e) => e.preventDefault());
    if (p) {
      this.buildAbilities();
      this.buildShop();
      this.$('ageup').addEventListener('click', () => this.handlers.ageUp && this.handlers.ageUp());
      this.lastHull = p.hullId;
    }
    this.lastHpF = 1;
  }

  buildAbilities() {
    const p = this.G.player;
    const box = this.$('abilities');
    box.innerHTML = p.abilities.map((ab, i) => `
      <div class="ab" data-i="${i}">${abilityIcon(ab)}<div class="cd"></div><div class="cdt"></div><div class="key">${KEYS[i]}</div>${ab.minLevel ? `<div class="lock hidden">LV ${ab.minLevel}</div>` : ''}</div>`).join('');
    box.querySelectorAll('.ab').forEach((el) => {
      const i = +el.dataset.i;
      el.addEventListener('mouseenter', () => { this.hoverAbility = i; this.showTip(el, this.abilityTip(p.abilities[i])); });
      el.addEventListener('mouseleave', () => { this.hoverAbility = -1; this.hideTip(); });
      el.addEventListener('click', () => this.handlers.castButton && this.handlers.castButton(i));
    });
    this.abEls = [...box.querySelectorAll('.ab')];
  }

  abilityTip(ab) {
    const bits = [];
    if (ab.dmg) bits.push(`${ab.dmg}${ab.count > 1 ? ` × ${ab.count}` : ''} dmg`);
    if (ab.range) bits.push(`range ${ab.range}`);
    bits.push(`${ab.cd}s cooldown`);
    return `<h4>${esc(ab.name)}</h4><div class="meta">${bits.join(' · ')}${ab.minLevel ? ` · requires level ${ab.minLevel}` : ''}</div>${esc(ab.desc)}`;
  }

  buildShop() {
    const box = this.$('upgs');
    box.innerHTML = UPGRADES.map((u, i) => `
      <div class="upg" data-id="${u.id}">${ICONS[u.id]}<div><div class="n">${u.name} <span class="k">Ctrl+${i + 1}</span></div><div class="pips">${'<i></i>'.repeat(u.max)}</div></div><div class="c"></div></div>`).join('');
    box.querySelectorAll('.upg').forEach((el) => {
      const def = UPGRADES.find((u) => u.id === el.dataset.id);
      el.addEventListener('click', () => this.handlers.buy && this.handlers.buy(def.id));
      el.addEventListener('mouseenter', () => this.showTip(el, `<h4>${def.name}</h4>${def.desc}`));
      el.addEventListener('mouseleave', () => this.hideTip());
    });
    this.upgEls = [...box.querySelectorAll('.upg')];
  }

  showTip(el, html) {
    const tip = this.$('tip');
    tip.innerHTML = html;
    tip.classList.remove('hidden');
    const r = el.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    tip.style.left = Math.max(8, Math.min(window.innerWidth - tr.width - 8, r.left + r.width / 2 - tr.width / 2)) + 'px';
    tip.style.top = (r.top - tr.height - 10) + 'px';
  }
  hideTip() { this.$('tip').classList.add('hidden'); }

  // ------------------------------------------------------------------ age choice
  openAgeChoice(options, onPick) {
    const p = this.G.player;
    const next = AGES[p.age];
    const root = this.$('modalRoot');
    root.innerHTML = `<div class="modal"><h1>${next.name.toUpperCase()}</h1><div class="choice">${options.map((id) => {
      const h = HULLS[id];
      return `<div class="card panel ornate" data-id="${id}"><div class="role">${h.role}</div><h2>${h.name}</h2><p>${h.desc}</p>
        <div class="stats"><span>Hull <b>${h.hp}</b></span><span>Speed <b>${h.speed}</b></span><span>Range <b>${h.guns.range}</b></span></div>
        <ul>${h.abilities.map((a, i) => `<li><b>${KEYS[i]}</b>${ABILITIES[a].name}</li>`).join('')}</ul></div>`;
    }).join('')}</div></div>`;
    root.querySelectorAll('.card').forEach((c) => c.addEventListener('click', () => { root.innerHTML = ''; onPick(c.dataset.id); }));
    root.querySelector('.modal').addEventListener('mousedown', (e) => { if (e.target.classList.contains('modal')) root.innerHTML = ''; });
  }
  get modalOpen() { return !!this.$('modalRoot')?.innerHTML; }
  closeModal() { this.$('modalRoot').innerHTML = ''; }

  // ------------------------------------------------------------------ messages
  announce(title, sub = '', color = '#e8c47a', size = '') {
    this.annQueue.push({ title, sub, color, size });
    if (this.annQueue.length > 3) this.annQueue.splice(1, 1);
    if (!this.annBusy) this.nextAnnounce();
  }
  nextAnnounce() {
    const a = this.annQueue.shift();
    const box = this.$('announce');
    if (!a || !box) { this.annBusy = false; return; }
    this.annBusy = true;
    box.innerHTML = `<div class="a ${a.size}" style="--c:${a.color}"><h1>${esc(a.title)}</h1><div class="bar"></div><p>${esc(a.sub)}</p></div>`;
    const el = box.firstChild;
    setTimeout(() => el.classList.add('out'), a.size ? 2000 : 2600);
    setTimeout(() => this.nextAnnounce(), a.size ? 2500 : 3100);
  }
  feed(html) {
    const box = this.$('feed');
    if (!box) return;
    const d = document.createElement('div');
    d.className = 'item';
    d.innerHTML = html;
    box.prepend(d);
    while (box.children.length > 6) box.lastChild.remove();
    setTimeout(() => { d.style.opacity = '0'; setTimeout(() => d.remove(), 700); }, 9000);
  }
  hint(html, ms = 5000) {
    const r = this.$('hintRoot');
    r.innerHTML = `<div class="hint panel">${html}</div>`;
    clearTimeout(this.hintT);
    this.hintT = setTimeout(() => (r.innerHTML = ''), ms);
  }
  floatText(x, y, z, text, color = '#fff', size = 14) {
    if (this.floats.length > 80) this.floats.shift();
    this.floats.push({ x, y, z, text, color, size, t: 0, life: 1.1, dx: (Math.random() - 0.5) * 30, born: performance.now() });
  }
  /** Creep-kill gold is summed into one popup above the player's ship. */
  goldPop(hero, amount) {
    const g = this.goldAcc;
    if (g && g.t < 0.6) { g.sum += amount; g.float.text = `+${g.sum}`; g.t = 0; g.float.t = Math.min(g.float.t, 0.2); return; }
    const float = { x: hero.x, y: (hero.rig?.height || 8) + 10, z: hero.z, text: `+${amount}`, color: '#ffd24a', size: 17, t: 0, life: 1.2, dx: 0, born: performance.now() };
    this.floats.push(float);
    this.goldAcc = { t: 0, sum: amount, float };
  }
  /** Aggregates rapid hits on the same target into one rising number. */
  damageNumber(target, amount, incoming) {
    const key = target.id + (incoming ? 'i' : 'o');
    this.dmgAcc ||= new Map();
    let a = this.dmgAcc.get(key);
    if (!a || a.t > 0.35) {
      a = { t: 0, sum: 0, target, incoming, float: null };
      this.dmgAcc.set(key, a);
    }
    a.sum += amount;
    if (!a.float || a.float.t > 0.35) {
      a.float = { x: target.x, y: (target.rig?.height || 8) + 4, z: target.z, text: '', color: incoming ? '#ff6a5a' : '#ffffff', size: 15, t: 0, life: 1.0, dx: (Math.random() - 0.5) * 30, born: performance.now() };
      this.floats.push(a.float);
      if (this.floats.length > 60) this.floats.shift();
    }
    a.float.text = String(Math.round(a.sum));
    a.float.size = Math.min(26, 13 + Math.sqrt(a.sum) * 0.35);
  }
  death(respawn, killer) {
    const r = this.$('deathRoot');
    r.innerHTML = `<div id="death"><h1>SUNK</h1><p>${killer && killer.name ? `by ${esc(killer.name)} · ` : ''}Recommissioning in <span id="rsp">${Math.ceil(respawn)}</span>s</p></div>`;
  }
  respawned() { this.$('deathRoot').innerHTML = ''; }

  // ------------------------------------------------------------------ scoreboard / end
  scoreboardHTML(G) {
    const rows = (team) => G.heroes.filter((h) => h.team === team).sort((a, b) => b.kills - a.kills).map((h) => `
      <tr class="${h.isPlayer ? 'me' : ''}"><td style="color:${TEAMS[team].css}">${esc(h.name)}${h.isPlayer ? ' (you)' : ''}</td><td>${HULLS[h.hullId].name}</td><td>${h.level}</td>
      <td>${h.kills} / ${h.deaths} / ${h.assists}</td><td>${h.creepKills}</td><td>${Math.round(h.dmgDealt / 100) / 10}k</td><td>${Math.floor(h.gold)}</td></tr>`).join('');
    const head = `<tr><th>Captain</th><th>Vessel</th><th>Lv</th><th>K / D / A</th><th>Sunk</th><th>Damage</th><th>Gold</th></tr>`;
    return `<table><tr><td colspan="7" class="team" style="color:${TEAMS[0].css}">${TEAMS[0].name} · ${G.teams[0].kills} kills</td></tr>${head}${rows(0)}
      <tr><td colspan="7" class="team" style="color:${TEAMS[1].css}">${TEAMS[1].name} · ${G.teams[1].kills} kills</td></tr>${head}${rows(1)}</table>`;
  }
  toggleScoreboard(show) {
    const sb = this.$('scoreboard');
    if (!sb) return;
    sb.classList.toggle('hidden', !show);
    if (show) sb.innerHTML = this.scoreboardHTML(this.G);
  }
  endScreen(G, winner, reason) {
    const me = G.player ? G.player.team : 0;
    const won = winner === me;
    const title = winner < 0 ? 'STALEMATE' : won ? 'VICTORY' : 'DEFEAT';
    const sub = winner < 0 ? 'The seas remain contested' : reason === 'citadel' ? `${TEAMS[winner].name} razed the enemy citadel` : `${TEAMS[winner].name} controls the seas at dusk`;
    this.$('hintRoot').innerHTML = ''; this.$('deathRoot').innerHTML = '';
    const r = this.$('modalRoot');
    r.innerHTML = `<div id="end"><h1 class="${won ? 'win' : 'lose'}">${title}</h1><div class="sub">${sub}</div>
      <div class="panel ornate">${this.scoreboardHTML(G)}</div>
      <button class="btn-primary" id="again">SAIL AGAIN</button><button class="btn-ghost" id="tomenu">Main menu</button></div>`;
    r.querySelector('#again').onclick = () => this.handlers.again && this.handlers.again();
    r.querySelector('#tomenu').onclick = () => this.handlers.menu && this.handlers.menu();
  }

  // ------------------------------------------------------------------ minimap
  buildMinimapBase() {
    const W = this.mm.width, H = this.mm.height;
    const base = document.createElement('canvas');
    base.width = W; base.height = H;
    const c = base.getContext('2d');
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0d2a3a'); g.addColorStop(1, '#0a1f2c');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const sx = W / (BOUNDS.x * 2), sz = H / (BOUNDS.z * 2);
    this.mmS = { sx, sz };
    c.strokeStyle = 'rgba(160,200,220,.12)'; c.lineWidth = 10;
    for (const lane of Object.values(LANES)) {
      c.beginPath();
      lane.forEach((p, i) => { const x = (p.x + BOUNDS.x) * sx, y = (p.z + BOUNDS.z) * sz; i ? c.lineTo(x, y) : c.moveTo(x, y); });
      c.stroke();
    }
    for (const i of ISLANDS) {
      c.beginPath();
      c.arc((i.x + BOUNDS.x) * sx, (i.z + BOUNDS.z) * sz, i.r * sx, 0, Math.PI * 2);
      c.fillStyle = i.kind === 'jungle' ? '#2d3d24' : '#3a3833'; c.fill();
      c.strokeStyle = 'rgba(230,220,180,.35)'; c.lineWidth = 1.5; c.stroke();
    }
    this.mmBase = base;
  }

  drawMinimap(G, camFocus, camView) {
    const c = this.mmCtx, W = this.mm.width, H = this.mm.height;
    const { sx, sz } = this.mmS;
    const X = (x) => (x + BOUNDS.x) * sx, Z = (z) => (z + BOUNDS.z) * sz;
    c.drawImage(this.mmBase, 0, 0);
    for (const p of G.ports) {
      c.save(); c.translate(X(p.x), Z(p.z)); c.rotate(Math.PI / 4);
      c.fillStyle = p.owner >= 0 ? TEAMS[p.owner].css : '#ddd'; c.fillRect(-6, -6, 12, 12);
      c.restore();
    }
    for (const s of G.structures) {
      if (!s.alive) continue;
      const sz2 = s.kind === 'citadel' ? 16 : 10;
      c.fillStyle = TEAMS[s.team].css; c.strokeStyle = '#000'; c.lineWidth = 2;
      c.fillRect(X(s.x) - sz2 / 2, Z(s.z) - sz2 / 2, sz2, sz2); c.strokeRect(X(s.x) - sz2 / 2, Z(s.z) - sz2 / 2, sz2, sz2);
    }
    for (const cr of G.creeps) {
      if (!cr.alive) continue;
      c.fillStyle = cr.team === 0 ? '#8fd0ff' : '#ff9a8a';
      c.fillRect(X(cr.x) - 2, Z(cr.z) - 2, 4, 4);
    }
    for (const h of G.heroes) {
      if (!h.alive) continue;
      c.beginPath(); c.arc(X(h.x), Z(h.z), h.isPlayer ? 8 : 6.5, 0, Math.PI * 2);
      c.fillStyle = TEAMS[h.team].css; c.fill();
      c.lineWidth = h.isPlayer ? 3 : 1.5; c.strokeStyle = h.isPlayer ? '#ffe28a' : '#000'; c.stroke();
    }
    // drones as faint haze
    c.fillStyle = 'rgba(255,255,255,.5)';
    for (let i = 0; i < G.drones.list.length; i += 3) { const d = G.drones.list[i]; c.fillRect(X(d.x), Z(d.z), 1.5, 1.5); }
    // camera view
    if (camView) {
      c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.5;
      c.strokeRect(X(camFocus.x - camView.w / 2), Z(camFocus.z - camView.h / 2), camView.w * sx, camView.h * sz);
    }
  }

  // ------------------------------------------------------------------ per-frame
  update(G, camera, dt, camFocus, camView) {
    const p = G.player;
    this.txt('k0', String(G.teams[0].kills));
    this.txt('k1', String(G.teams[1].kills));
    this.txt('e0', AGES[G.teams[0].era - 1].name);
    this.txt('e1', AGES[G.teams[1].era - 1].name);
    this.txt('clock', fmtTime(Math.max(0, MATCH.duration - G.time)));
    this.sty('sun', 'left', `${Math.min(100, (G.time / MATCH.duration) * 100).toFixed(1)}%`);
    this.mmT = (this.mmT || 0) + dt;
    if (this.mmT > 0.066) { this.mmT = 0; this.drawMinimap(G, camFocus, camView); }
    if (p) this.updatePlayerPanel(G, p);
    const sb = this.$('scoreboard');
    if (sb && !sb.classList.contains('hidden') && G.frame % 20 === 0) sb.innerHTML = this.scoreboardHTML(G);
    const rsp = this.$('rsp');
    if (rsp && p) rsp.textContent = Math.max(0, Math.ceil(p.respawn));
    if (G.over) { this.ctx.setTransform(1, 0, 0, 1, 0, 0); this.ctx.clearRect(0, 0, this.cv.width, this.cv.height); return; }
    this.drawOverlay(G, camera, dt);
  }

  updatePlayerPanel(G, p) {
    if (p.hullId !== this.lastHull) { this.buildAbilities(); this.lastHull = p.hullId; }
    const hull = HULLS[p.hullId];
    this.txt('shipname', `${p.name} · ${hull.name}`);
    this.txt('shipsub', `${AGES[p.age - 1].name} · ${hull.role}`);
    this.txt('lvl', String(p.level));
    const hpF = Math.max(0, p.hp / p.maxHp);
    this.sty('hpfill', 'transform', `scaleX(${hpF.toFixed(3)})`);
    this.sty('hplag', 'transform', `scaleX(${hpF.toFixed(3)})`);
    this.sty('hpfill', 'background', hpF < 0.3 ? 'linear-gradient(180deg,#ff8a6a,#c33a2a)' : '');
    this.sty('shfill', 'transform', `scaleX(${Math.min(1, p.shield / p.maxHp).toFixed(3)})`);
    this.txt('hptxt', `${Math.ceil(Math.max(0, p.hp))} / ${p.maxHp}`);
    this.sty('xpfill', 'transform', `scaleX(${(p.level >= MATCH.maxLevel ? 1 : p.xp / p.xpToNext()).toFixed(3)})`);
    this.txt('gold', String(Math.floor(p.gold)));
    p.abilities.forEach((ab, i) => {
      const el = this.abEls[i];
      if (!el) return;
      const cdMax = ab.cd * p.cdMul;
      const cd = p.cds[i];
      el.querySelector('.cd').style.setProperty('--p', `${(cd / cdMax) * 100}%`);
      el.querySelector('.cdt').textContent = cd > 0 ? (cd < 1 ? cd.toFixed(1) : Math.ceil(cd)) : '';
      const lock = el.querySelector('.lock');
      if (lock) lock.classList.toggle('hidden', p.level >= ab.minLevel);
      el.classList.toggle('ready', cd <= 0);
      el.classList.toggle('silenced', p.silence > 0 || p.stun > 0);
      if (el._wasCd && cd <= 0) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
      el._wasCd = cd > 0;
    });
    if (G.frame % 6 !== 0) return;
    const btn = this.$('ageup');
    if (p.canAgeUp()) {
      const next = AGES[p.age];
      const can = p.gold >= next.cost;
      btn.innerHTML = `<b>Advance to the ${next.name}</b>${Math.floor(p.gold)} / ${next.cost} gold · [T]`;
      btn.disabled = !can;
      btn.classList.toggle('can', can);
    } else { btn.innerHTML = '<b>Age of Swarms reached</b>Pinnacle of naval technology'; btn.disabled = true; btn.classList.remove('can'); }
    this.upgEls.forEach((el) => {
      const id = el.dataset.id;
      const lvl = p.upg[id];
      const cost = p.upgradeCost(id);
      el.querySelectorAll('.pips i').forEach((pip, k) => pip.classList.toggle('on', k < lvl));
      el.querySelector('.c').textContent = isFinite(cost) ? cost : 'MAX';
      el.classList.toggle('no', isFinite(cost) && p.gold < cost);
      el.classList.toggle('max', !isFinite(cost));
    });
  }

  drawOverlay(G, camera, dt) {
    const c = this.ctx, dpr = this.dpr;
    const W = this.cv.width, H = this.cv.height;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, W, H);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = W / dpr, h = H / dpr;
    const proj = (x, y, z) => {
      _v.set(x, y, z).project(camera);
      if (_v.z > 1) return null;
      return { x: (_v.x * 0.5 + 0.5) * w, y: (-_v.y * 0.5 + 0.5) * h };
    };
    const p = G.player;
    // range indicator
    if (p && p.alive) {
      let range = 0, col = 'rgba(232,196,122,.5)';
      if (this.hoverAbility >= 0) { const ab = p.abilities[this.hoverAbility]; range = ab.range || (ab.radius || 0); }
      else if (this.showRange) { range = p.hull.guns.range; col = 'rgba(255,255,255,.28)'; }
      if (range) this.drawRing(c, proj, p.x, p.z, range, col);
      if (this.aiming >= 0 && this.cursor) this.drawAim(c, proj, p, p.abilities[this.aiming], this.cursor);
    }
    // health bars
    c.font = '600 12px Rajdhani, sans-serif';
    c.textAlign = 'center';
    for (const u of G.units) {
      if (!u.alive) continue;
      const height = u.rig ? (u.rig.height || 10) : 10;
      const s = proj(u.x, height + (u.kind === 'citadel' ? 18 : u.kind === 'tower' ? 8 : 5), u.z);
      if (!s || s.x < -50 || s.y < -50 || s.x > w + 50 || s.y > h + 50) continue;
      const hero = u.kind === 'hero';
      const bw = hero ? 74 : u.kind === 'creep' ? 34 : 96, bh = hero ? 8 : u.kind === 'creep' ? 4 : 8;
      const x0 = s.x - bw / 2, y0 = s.y;
      const f = Math.max(0, u.hp / u.maxHp);
      c.fillStyle = 'rgba(0,0,0,.65)';
      c.fillRect(x0 - 1, y0 - 1, bw + 2, bh + 2);
      c.fillStyle = u === p ? '#6ff08a' : TEAMS[u.team].css;
      c.fillRect(x0, y0, bw * f, bh);
      if (u.shield > 0) { c.fillStyle = 'rgba(210,240,255,.9)'; c.fillRect(x0, y0, Math.min(bw, bw * (u.shield / u.maxHp)), bh * 0.45); }
      if (hero) {
        // segment ticks every 500 hp
        c.fillStyle = 'rgba(0,0,0,.55)';
        for (let k = 500; k < u.maxHp; k += 500) c.fillRect(x0 + (bw * k) / u.maxHp, y0, 1, bh);
        c.fillStyle = u === p ? '#ffe28a' : '#fff';
        c.strokeStyle = 'rgba(0,0,0,.8)'; c.lineWidth = 3;
        const label = `${u.level}  ${u.name}`;
        c.strokeText(label, s.x, y0 - 5); c.fillText(label, s.x, y0 - 5);
        if (u.stun > 0) { c.fillStyle = '#9cf'; c.fillText('STUNNED', s.x, y0 + bh + 12); }
      } else if ((u.kind === 'tower' || u.kind === 'citadel') && u.invulnerable) {
        c.fillStyle = 'rgba(200,220,255,.7)'; c.fillText('⛨', s.x + bw / 2 + 8, y0 + 8);
      }
    }
    // ports capture arcs
    for (const port of G.ports) {
      const s = proj(port.x, 12, port.z);
      if (!s) continue;
      c.beginPath(); c.lineWidth = 4;
      c.strokeStyle = 'rgba(0,0,0,.5)'; c.arc(s.x, s.y, 14, 0, Math.PI * 2); c.stroke();
      if (Math.abs(port.prog) > 0.01) {
        c.beginPath(); c.strokeStyle = port.prog < 0 ? TEAMS[0].css : TEAMS[1].css;
        c.arc(s.x, s.y, 14, -Math.PI / 2, -Math.PI / 2 + Math.abs(port.prog) * Math.PI * 2); c.stroke();
      }
      c.fillStyle = '#e8c47a'; c.font = '700 11px Rajdhani, sans-serif';
      c.fillText('PORT', s.x, s.y + 4);
    }
    if (this.dmgAcc) for (const [k, a] of this.dmgAcc) { a.t += dt; if (a.t > 1.2) this.dmgAcc.delete(k); }
    if (this.goldAcc) this.goldAcc.t += dt;
    // floating text
    for (let i = this.floats.length - 1; i >= 0; i--) {
      const f = this.floats[i];
      f.t = Math.max(f.t + dt, f.born ? (performance.now() - f.born) / 1000 - 2 : 0); // never outlive wall-clock
      if (f.born && performance.now() - f.born > 4000) f.t = f.life;
      if (f.t > f.life) { this.floats.splice(i, 1); continue; }
      const s = proj(f.x, f.y, f.z);
      if (!s) continue;
      const k = f.t / f.life;
      const pop = k < 0.12 ? 1 + (0.12 - k) * 5 : 1;
      c.globalAlpha = k > 0.6 ? 1 - (k - 0.6) / 0.4 : 1;
      c.font = `700 ${f.size * pop}px Rajdhani, sans-serif`;
      c.lineWidth = 4; c.strokeStyle = 'rgba(0,0,0,.85)';
      const x = s.x + f.dx * k, y = s.y - 40 * k;
      c.strokeText(f.text, x, y);
      c.fillStyle = f.color; c.fillText(f.text, x, y);
      c.globalAlpha = 1;
    }
  }

  /** Targeting indicator for the ability being aimed. */
  drawAim(c, proj, p, ab, cur) {
    let dx = cur.x - p.x, dz = cur.z - p.z;
    const d = Math.hypot(dx, dz) || 1;
    dx /= d; dz /= d;
    const range = ab.range || 60;
    this.drawRing(c, proj, p.x, p.z, range, 'rgba(232,196,122,.45)');
    const ready = p.cds[this.aiming] <= 0 && (!ab.minLevel || p.level >= ab.minLevel);
    const col = ready ? 'rgba(255,170,90,.9)' : 'rgba(160,160,160,.6)';
    if (ab.target === 'point') {
      const k = Math.min(d, range);
      const x = p.x + dx * k, z = p.z + dz * k;
      const r = ab.area ? ab.area + (ab.radius || 0) : ab.radius || 14;
      this.drawRing(c, proj, x, z, Math.max(8, r), col, true);
      const a = proj(x, 0.5, z);
      if (a) { c.fillStyle = col; c.beginPath(); c.arc(a.x, a.y, 3, 0, Math.PI * 2); c.fill(); }
    } else {
      // skillshot lane (width ~ projectile/beam width), fan for spreads
      const w = (ab.width || ab.radius || 3) + 2;
      const lanes = ab.count > 1 && ab.spread ? [-ab.spread / 2, 0, ab.spread / 2] : [0];
      const base = Math.atan2(dx, dz);
      for (const off of lanes) {
        const a = base + off, ux = Math.sin(a), uz = Math.cos(a), nx = uz, nz = -ux;
        const pts = [[p.x + nx * w, p.z + nz * w], [p.x + ux * range + nx * w, p.z + uz * range + nz * w], [p.x + ux * range - nx * w, p.z + uz * range - nz * w], [p.x - nx * w, p.z - nz * w]].map(([x, z]) => proj(x, 0.5, z));
        if (pts.some((q) => !q)) continue;
        c.beginPath(); pts.forEach((q, i) => (i ? c.lineTo(q.x, q.y) : c.moveTo(q.x, q.y))); c.closePath();
        c.fillStyle = ready ? 'rgba(255,150,70,.16)' : 'rgba(150,150,150,.12)'; c.fill();
        c.strokeStyle = col; c.lineWidth = 1.5; c.stroke();
      }
    }
  }

  drawRing(c, proj, x, z, r, col, solid = false) {
    c.beginPath();
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const s = proj(x + Math.cos(a) * r, 0.5, z + Math.sin(a) * r);
      if (!s) continue;
      i ? c.lineTo(s.x, s.y) : c.moveTo(s.x, s.y);
    }
    c.strokeStyle = col; c.lineWidth = 2; if (!solid) c.setLineDash([8, 6]); c.stroke(); c.setLineDash([]);
    if (solid) { c.fillStyle = col.replace(/[\d.]+\)$/, '0.12)'); c.fill(); }
  }
}
