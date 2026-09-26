// Musical stingers, all in D to sit on top of the score.
// Each takes (k, dest, wet, t) and returns its duration in seconds.
import * as Ins from './instruments.js';
import { BEAT } from './music.js';

export const STINGERS = {
  ageUp(k, dest, wet, t) {
    Ins.gong(k, [dest, wet], t, 0.55, 98, 6);
    Ins.taiko(k, dest, t, 1, 60);
    Ins.taiko(k, dest, t + BEAT * 0.5, 0.6, 90);
    [50, 57, 62, 66, 69].forEach((m, i) => {
      const ti = t + 0.1 + i * 0.12;
      Ins.brass(k, [dest, wet], ti, m, 2.6 - i * 0.12, 0.06, 0.55 + i * 0.08, { rel: 1.4 });
    });
    Ins.choir(k, [dest, wet], t + 0.2, [62, 66, 69, 74], 2.6, 0.07, { a: 1.2, rel: 1.8 });
    [74, 76, 78, 81, 86].forEach((m, i) => Ins.pluck(k, [dest, wet], t + 0.55 + i * 0.065, m, 0.22));
    Ins.taiko(k, dest, t + 2.2, 0.7, 62);
    return 4.8;
  },

  victory(k, dest, wet, t) {
    for (let i = 0; i < 9; i++) {
      const ti = t + 1.0 * (1 - Math.pow(1 - i / 9, 1.6));
      Ins.taiko(k, dest, ti, 0.3 + 0.07 * i, i % 2 ? 96 : 70);
    }
    const tb = t + 1.1;
    Ins.taiko(k, dest, tb, 1, 58);
    Ins.gong(k, [dest, wet], tb, 0.6, 96, 6);
    let tn = tb;
    for (const [m, d] of [[62, 0.34], [69, 0.34], [74, 1.1]]) {
      Ins.brass(k, [dest, wet], tn, m, d, 0.07, 0.75, { rel: 0.5 });
      Ins.brass(k, [dest, wet], tn, m - 12, d, 0.045, 0.5, { rel: 0.5, scoop: false });
      tn += d;
    }
    const tc = tb + 1.25;
    for (const m of [50, 57, 62, 66, 69]) Ins.brass(k, [dest, wet], tc, m, 2.0, 0.05, 0.7, { rel: 1.6 });
    Ins.choir(k, [dest, wet], tb, [62, 66, 69, 74], 3.2, 0.07, { a: 1.0, rel: 1.8 });
    [86, 83, 81, 78, 76, 74].forEach((m, i) => Ins.pluck(k, [dest, wet], tc + i * 0.08, m, 0.2));
    Ins.taiko(k, dest, tc, 0.9, 60);
    Ins.taiko(k, dest, tc + 2.0, 0.6, 62);
    return 6.2;
  },

  defeat(k, dest, wet, t) {
    Ins.gong(k, [dest, wet], t, 0.6, 70, 7);
    Ins.taiko(k, dest, t, 0.55, 58);
    Ins.taiko(k, dest, t + 2.7, 0.45, 58);
    let tn = t;
    for (const [m, d] of [[57, 1.0], [55, 0.8], [53, 1.0], [50, 2.2]]) {
      Ins.brass(k, [dest, wet], tn, m, d, 0.05, 0.25, { rel: 0.9, scoop: false });
      tn += d;
    }
    Ins.brass(k, [dest, wet], t, 38, 4.6, 0.04, 0.15, { rel: 1.2, scoop: false });
    Ins.choir(k, [dest, wet], t + 0.3, [50, 57, 62, 65], 3.8, 0.05, { a: 1.8, rel: 1.8 });
    Ins.lead(k, [dest, wet], t + 0.6, [{ m: 74, b: 0.9 }, { m: 72, b: 0.6 }, { m: 69, b: 1.6 }, { m: 67, b: 0.7 }, { m: 65, b: 0.7 }, { m: 62, b: 2.5 }], 0.5, 0.08, 'erhu');
    return 6.2;
  },

  firstBlood(k, dest, wet, t) {
    Ins.taiko(k, dest, t, 0.9, 60);
    Ins.taiko(k, dest, t + 0.18, 0.6, 92);
    for (const m of [50, 57, 62, 67]) Ins.brass(k, [dest, wet], t, m, 0.45, 0.05, 0.8, { rel: 1.0 });
    Ins.gong(k, wet, t, 0.25, 150, 3);
    return 2.6;
  },

  towerDown(k, dest, wet, t) {
    Ins.taiko(k, dest, t, 1, 56);
    k.tone(t, { f: 50, f1: 30, sweep: 0.8, a: 0.003, d: 1.2, peak: 0.35, dest });
    for (const m of [38, 50, 57]) Ins.brass(k, [dest, wet], t, m, 0.6, 0.05, 0.6, { rel: 1.2 });
    k.burst(t, { kind: 'white', type: 'highpass', f: 5000, a: 0.01, d: 1.5, peak: 0.06, dest: [dest, wet] });
    return 2.8;
  },

  enemyAge(k, dest, wet, t) {
    k.burst(t, { kind: 'white', type: 'bandpass', f: 200, f1: 2200, sweep: 1.15, Q: 2, a: 1.1, d: 0.05, peak: 0.12, dest });
    for (const m of [50, 51, 57]) Ins.brass(k, [dest, wet], t + 0.2, m, 1.6, 0.045, 0.3, { rel: 1.4, scoop: false });
    Ins.brass(k, [dest, wet], t + 0.2, 38, 1.6, 0.04, 0.2, { rel: 1.4, scoop: false });
    Ins.taiko(k, dest, t + 1.15, 0.8, 58);
    Ins.taiko(k, dest, t + 1.5, 0.6, 62);
    return 3.4;
  },

  matchStart(k, dest, wet, t) {
    Ins.gong(k, [dest, wet], t, 0.5, 100, 6);
    [0.6, 1.0, 1.3, 1.5].forEach((dt, i) => Ins.taiko(k, dest, t + dt, 0.55 + i * 0.12, i < 3 ? 64 : 58));
    let tn = t + 1.65;
    for (const [m, d] of [[62, 0.4], [67, 0.4], [69, 1.6]]) {
      Ins.brass(k, [dest, wet], tn, m, d, 0.06, 0.65, { rel: 0.8 });
      Ins.brass(k, [dest, wet], tn, m - 12, d, 0.04, 0.45, { rel: 0.8, scoop: false });
      tn += d;
    }
    Ins.choir(k, [dest, wet], t + 1.65, [50, 57, 62, 69], 2.0, 0.045, { a: 1.2, rel: 1.5 });
    return 4.4;
  },

  warning(k, dest, wet, t) {
    const lp = k.filter('lowpass', 1800, 0.8, [dest, wet]);
    for (const dt of [0, 0.3]) {
      k.tone(t + dt, { type: 'square', f: 440, a: 0.015, hold: 0.14, d: 0.14, peak: 0.05, dest: lp });
      k.tone(t + dt, { type: 'square', f: 659.3, a: 0.015, hold: 0.14, d: 0.14, peak: 0.035, dest: lp });
    }
    Ins.taiko(k, dest, t, 0.5, 70);
    return 1.3;
  },
};
