#!/usr/bin/env node
/**
 * Generates the mock photography in public/mock as self-contained SVG scenes.
 * Everything is drawn procedurally from a fixed seed, so re-running this
 * produces byte-identical output. No external assets, no network.
 *
 *   npm run mock:images
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "mock");
const W = 900;
const H = 600;

/* ---------------------------------------------------------------- utils */

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Number(v).toFixed(1);

const lin = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">` +
  stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("") +
  `</linearGradient>`;

const rad = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">` +
  stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("") +
  `</radialGradient>`;

/** Soft rolling hill / headland silhouette. */
function ridge(rnd, y, amp) {
  const p = [];
  const ph = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const v =
      Math.sin(t * 6.283 * 1 + ph[0]) * 0.55 +
      Math.sin(t * 6.283 * 2.3 + ph[1]) * 0.3 +
      Math.sin(t * 6.283 * 4.7 + ph[2]) * 0.15;
    p.push(`${n(t * W)},${n(y - v * amp)}`);
  }
  return `M0,${H} L${p.join(" L")} L${W},${H} Z`;
}

/** Jagged mountain range. Returns { path, apexes } so snow caps can be added. */
function peaks(rnd, y, amp, count) {
  const pts = [[0, y]];
  const apexes = [];
  for (let i = 0; i < count; i++) {
    const x0 = (i / count) * W;
    const x1 = ((i + 1) / count) * W;
    const px = x0 + (x1 - x0) * (0.3 + rnd() * 0.4);
    const py = y - amp * (0.55 + rnd() * 0.45);
    apexes.push([px, py]);
    pts.push([px, py]);
    pts.push([x1, y - amp * (rnd() * 0.2)]);
  }
  const d =
    `M0,${H} L` +
    pts.map(([x, y2]) => `${n(x)},${n(y2)}`).join(" L") +
    ` L${W},${H} Z`;
  return { path: d, apexes };
}

/** White cap sitting on a peak apex. */
function snowCap(rnd, [px, py], amp, fill = "#ffffff", op = 0.92) {
  const dropL = amp * (0.16 + rnd() * 0.1);
  const dropR = amp * (0.16 + rnd() * 0.1);
  const wl = amp * (0.2 + rnd() * 0.12);
  const wr = amp * (0.2 + rnd() * 0.12);
  const midX = px + (rnd() - 0.5) * wl * 0.4;
  return (
    `<path d="M${n(px)},${n(py)} L${n(px + wr)},${n(py + dropR)} ` +
    `L${n(px + wr * 0.35)},${n(py + dropR * 0.55)} L${n(midX)},${n(py + dropR * 0.95)} ` +
    `L${n(px - wl * 0.4)},${n(py + dropL * 0.5)} L${n(px - wl)},${n(py + dropL)} Z" ` +
    `fill="${fill}" opacity="${op}"/>`
  );
}

function pine(x, baseY, h, w, fill, op = 1) {
  return (
    `<g opacity="${op}" fill="${fill}">` +
    `<rect x="${n(x - w * 0.05)}" y="${n(baseY - h * 0.18)}" width="${n(w * 0.1)}" height="${n(h * 0.2)}"/>` +
    `<polygon points="${n(x)},${n(baseY - h)} ${n(x - w * 0.42)},${n(baseY - h * 0.5)} ${n(x + w * 0.42)},${n(baseY - h * 0.5)}"/>` +
    `<polygon points="${n(x)},${n(baseY - h * 0.75)} ${n(x - w * 0.55)},${n(baseY - h * 0.28)} ${n(x + w * 0.55)},${n(baseY - h * 0.28)}"/>` +
    `<polygon points="${n(x)},${n(baseY - h * 0.5)} ${n(x - w * 0.68)},${n(baseY - h * 0.05)} ${n(x + w * 0.68)},${n(baseY - h * 0.05)}"/>` +
    `</g>`
  );
}

/** Row of pines along a baseline, back-to-front. */
function pineRow(rnd, baseY, h, count, fill, op = 1, jitter = 0.35) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1)) * (W + 120) - 60 + (rnd() - 0.5) * (W / count) * jitter;
    const hh = h * (0.7 + rnd() * 0.6);
    s += pine(x, baseY + rnd() * 8, hh, hh * 0.5, fill, op);
  }
  return s;
}

function frond(x, y, len, angleDeg, fill, op = 1) {
  const a = (angleDeg * Math.PI) / 180;
  const ex = x + Math.cos(a) * len;
  const ey = y + Math.sin(a) * len;
  const perp = a + Math.PI / 2;
  const bow = len * 0.26;
  const c1x = x + Math.cos(a) * len * 0.45 + Math.cos(perp) * bow;
  const c1y = y + Math.sin(a) * len * 0.45 + Math.sin(perp) * bow;
  const c2x = x + Math.cos(a) * len * 0.5 - Math.cos(perp) * bow * 0.3;
  const c2y = y + Math.sin(a) * len * 0.5 - Math.sin(perp) * bow * 0.3;
  return `<path d="M${n(x)},${n(y)} Q${n(c1x)},${n(c1y)} ${n(ex)},${n(ey)} Q${n(c2x)},${n(c2y)} ${n(x)},${n(y)} Z" fill="${fill}" opacity="${op}"/>`;
}

function palm(rnd, x, baseY, h, fill, lean = 1) {
  const topX = x + lean * h * 0.22;
  const topY = baseY - h;
  /* Tapered trunk built symmetrically about the lean, so it holds its
     width whichever way the tree leans. */
  const bw = h * 0.032;
  const tw = h * 0.013;
  const cx = x + lean * h * 0.03;
  const cy = baseY - h * 0.55;
  let s =
    `<path d="M${n(x - bw)},${n(baseY)} Q${n(cx - bw * 0.8)},${n(cy)} ${n(topX - tw)},${n(topY)} ` +
    `L${n(topX + tw)},${n(topY)} Q${n(cx + bw * 0.8)},${n(cy)} ${n(x + bw)},${n(baseY)} Z" fill="${fill}"/>`;
  const base = lean > 0 ? -20 : -160;
  for (let i = 0; i < 7; i++) {
    const ang = base + (i - 3) * 27 + (rnd() - 0.5) * 12;
    s += frond(topX, topY, h * (0.32 + rnd() * 0.16), ang, fill);
  }
  return s;
}

function stars(rnd, count, maxY) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const x = rnd() * W;
    const y = rnd() * maxY;
    const r = 0.6 + rnd() * 1.5;
    s += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#ffffff" opacity="${(0.25 + rnd() * 0.65).toFixed(2)}"/>`;
  }
  return s;
}

/** Sun-path glitter on water. */
function streaks(rnd, y0, y1, cx, color, count) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const y = y0 + (y1 - y0) * Math.pow(t, 0.75);
    const w = (34 + t * 300) * (0.55 + rnd() * 0.85);
    const h = 1.4 + t * 4.2;
    const x = cx + (rnd() - 0.5) * w * 0.55;
    s += `<rect x="${n(x - w / 2)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(h / 2)}" fill="${color}" opacity="${(0.09 + rnd() * 0.24).toFixed(2)}"/>`;
  }
  return s;
}

function birds(rnd, count, x0, y0, spread) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const x = x0 + (rnd() - 0.5) * spread;
    const y = y0 + (rnd() - 0.5) * spread * 0.5;
    const w = 5 + rnd() * 7;
    s += `<path d="M${n(x - w)},${n(y)} q${n(w / 2)},${n(-w * 0.55)} ${n(w)},0 q${n(w / 2)},${n(-w * 0.55)} ${n(w)},0" fill="none" stroke="#2b3440" stroke-opacity="0.35" stroke-width="1.6" stroke-linecap="round"/>`;
  }
  return s;
}

/* Shared finishing layers — these are what make it read as a photo. */
const FX_DEFS =
  `<filter id="grain" x="0" y="0" width="100%" height="100%">` +
  `<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>` +
  `<feColorMatrix type="saturate" values="0"/>` +
  `</filter>` +
  `<filter id="soft" x="-50%" y="-50%" width="200%" height="200%">` +
  `<feGaussianBlur stdDeviation="16"/></filter>` +
  rad("vig", [["0.55", "#000000", 0], ["1", "#000000", 0.3]], 0.5, 0.45, 0.75);

/** Diffuse cloud — blurred so it doesn't read as a hard white blob. */
const cloud = (x, y, rx, op = 0.5, fill = "#ffffff") =>
  `<g filter="url(#soft)" opacity="${op}">` +
  `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(rx * 0.24)}" fill="${fill}"/>` +
  `<ellipse cx="${n(x - rx * 0.3)}" cy="${n(y - rx * 0.1)}" rx="${n(rx * 0.42)}" ry="${n(rx * 0.2)}" fill="${fill}"/>` +
  `<ellipse cx="${n(x + rx * 0.34)}" cy="${n(y + rx * 0.05)}" rx="${n(rx * 0.36)}" ry="${n(rx * 0.17)}" fill="${fill}"/>` +
  `</g>`;

const FX =
  `<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.07" style="mix-blend-mode:overlay"/>` +
  `<rect width="${W}" height="${H}" fill="url(#vig)"/>`;

function svg(defs, body) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    `<defs>${defs}${FX_DEFS}</defs>${body}${FX}</svg>`
  );
}

const sky = (id) => `<rect width="${W}" height="${H}" fill="url(#${id})"/>`;

/* ---------------------------------------------------------------- scenes */

const scenes = {};

/* 1 — Malibu: sunset over the Pacific */
scenes["malibu"] = () => {
  const r = rng(101);
  const hz = 330;
  const defs =
    lin("sky", [["0", "#213a63"], ["0.42", "#8a5c86"], ["0.72", "#e8825e"], ["1", "#ffc98a"]]) +
    lin("sea", [["0", "#c9764f"], ["0.18", "#5c6f8f"], ["1", "#1e2f4d"]]) +
    rad("glow", [["0", "#fff3cf", 0.95], ["0.45", "#ffb46b", 0.4], ["1", "#ff9a5a", 0]], 0.5, 0.5, 0.5);
  const body =
    sky("sky") +
    `<circle cx="470" cy="${hz - 6}" r="150" fill="url(#glow)"/>` +
    `<circle cx="470" cy="${hz - 18}" r="40" fill="#fff6dc"/>` +
    `<rect y="${hz}" width="${W}" height="${H - hz}" fill="url(#sea)"/>` +
    streaks(r, hz + 4, H, 470, "#ffd9a1", 34) +
    `<path d="${ridge(r, hz + 6, 44)}" fill="#22293f" opacity="0.55"/>` +
    `<path d="M0,${H} L0,436 C130,404 236,446 322,506 L360,${H} Z" fill="#161d2e"/>` +
    pine(96, 440, 74, 40, "#111826") +
    pine(150, 452, 54, 30, "#111826") +
    birds(r, 5, 690, 190, 150);
  return svg(defs, body);
};

/* 2 — Aspen: snow peaks */
scenes["aspen"] = () => {
  const r = rng(202);
  const defs =
    lin("sky", [["0", "#3f7fbe"], ["0.55", "#9cc9e6"], ["1", "#e4f1f8"]]) +
    lin("far", [["0", "#8fb3d0"], ["1", "#b9d2e4"]]) +
    lin("mid", [["0", "#5e7f9e"], ["1", "#8fadc4"]]);
  const far = peaks(r, 330, 190, 4);
  const mid = peaks(r, 412, 158, 5);
  const body =
    sky("sky") +
    `<path d="${far.path}" fill="url(#far)"/>` +
    far.apexes.map((a) => snowCap(r, a, 190, "#ffffff", 0.85)).join("") +
    `<path d="${mid.path}" fill="url(#mid)"/>` +
    mid.apexes.map((a) => snowCap(r, a, 158)).join("") +
    `<path d="${ridge(r, 470, 30)}" fill="#eef5fa"/>` +
    `<path d="${ridge(r, 512, 24)}" fill="#ffffff"/>` +
    pineRow(r, 520, 96, 13, "#1f3b34", 0.9) +
    pineRow(r, 574, 132, 9, "#162b26");
  return svg(defs, body);
};

/* 3 — Lake Tahoe */
scenes["tahoe"] = () => {
  const r = rng(303);
  const hz = 356;
  const defs =
    lin("sky", [["0", "#4f9ad4"], ["0.6", "#a8d3ec"], ["1", "#dcf0f8"]]) +
    lin("water", [["0", "#4f90b6"], ["0.5", "#3d7ba3"], ["1", "#28577a"]]) +
    lin("mtn", [["0", "#6b8ba6"], ["1", "#9db6c9"]]);
  const mt = peaks(r, hz, 132, 5);
  const body =
    sky("sky") +
    `<circle cx="742" cy="112" r="46" fill="#fdfbe8" opacity="0.9"/>` +
    `<path d="${mt.path}" fill="url(#mtn)"/>` +
    mt.apexes.map((a) => snowCap(r, a, 132, "#f4fafd", 0.8)).join("") +
    pineRow(r, hz + 2, 46, 22, "#2c4a42", 0.85) +
    `<rect y="${hz}" width="${W}" height="${H - hz}" fill="url(#water)"/>` +
    streaks(r, hz + 6, H - 30, 460, "#cfe9f5", 26) +
    `<path d="M0,${H} L0,392 C60,380 108,404 150,${H} Z" fill="#1d3630"/>` +
    pine(52, 400, 118, 62, "#162924") +
    pine(816, 404, 138, 72, "#162924") +
    pine(872, 428, 100, 54, "#1d3630");
  return svg(defs, body);
};

/* 4 — Joshua Tree: desert dusk */
scenes["joshua"] = () => {
  const r = rng(404);
  const defs =
    lin("sky", [["0", "#5b3a72"], ["0.38", "#c2607a"], ["0.68", "#ef9163"], ["1", "#f8cf94"]]) +
    lin("sand", [["0", "#c98c5c"], ["1", "#8a5638"]]);
  const yucca = (x, y, s, fill) => {
    let out = `<rect x="${n(x - s * 0.06)}" y="${n(y - s)}" width="${n(s * 0.12)}" height="${n(s)}" fill="${fill}"/>`;
    for (const [bx, by, bl, ba] of [
      [x, y - s, s * 0.42, -128],
      [x, y - s, s * 0.4, -52],
      [x, y - s * 0.78, s * 0.34, -160],
      [x, y - s * 0.78, s * 0.32, -20],
    ]) {
      out += `<rect x="${n(bx)}" y="${n(by - 3)}" width="${n(bl)}" height="6" fill="${fill}" transform="rotate(${ba} ${n(bx)} ${n(by)})"/>`;
      const ex = bx + Math.cos((ba * Math.PI) / 180) * bl;
      const ey = by + Math.sin((ba * Math.PI) / 180) * bl;
      for (let k = 0; k < 5; k++) {
        out += frond(ex, ey, s * 0.17, ba - 60 + k * 30, fill);
      }
    }
    return out;
  };
  const body =
    sky("sky") +
    `<circle cx="640" cy="352" r="34" fill="#ffe9b8" opacity="0.85"/>` +
    `<path d="${ridge(r, 392, 34)}" fill="#7c4a5e" opacity="0.6"/>` +
    `<path d="${ridge(r, 436, 26)}" fill="#5e3348" opacity="0.75"/>` +
    `<rect y="452" width="${W}" height="${H - 452}" fill="url(#sand)"/>` +
    `<ellipse cx="300" cy="470" rx="150" ry="16" fill="#a86b45" opacity="0.5"/>` +
    yucca(180, 500, 150, "#2e1c25") +
    yucca(724, 528, 110, "#2a1922") +
    `<ellipse cx="500" cy="540" rx="58" ry="18" fill="#3a2430" opacity="0.55"/>` +
    `<ellipse cx="860" cy="500" rx="44" ry="14" fill="#3a2430" opacity="0.45"/>`;
  return svg(defs, body);
};

/* 5 — Big Sur: foggy cliffs */
scenes["bigsur"] = () => {
  const r = rng(505);
  const hz = 372;
  const defs =
    lin("sky", [["0", "#b9cdd6"], ["0.6", "#dfe9ec"], ["1", "#f2f6f7"]]) +
    lin("sea", [["0", "#93aab5"], ["1", "#5f7c8a"]]) +
    lin("fog", [["0", "#ffffff", 0], ["1", "#ffffff", 0.75]]);
  const body =
    sky("sky") +
    `<rect y="${hz}" width="${W}" height="${H - hz}" fill="url(#sea)"/>` +
    streaks(r, hz + 10, H - 40, 520, "#ffffff", 20) +
    `<path d="${ridge(r, hz - 4, 62)}" fill="#7d94a0" opacity="0.5"/>` +
    `<path d="${ridge(r, hz + 30, 78)}" fill="#5d7583" opacity="0.6"/>` +
    `<rect y="${hz - 60}" width="${W}" height="120" fill="url(#fog)" opacity="0.55"/>` +
    `<path d="M${W},${H} L${W},350 C806,346 726,392 660,470 L612,${H} Z" fill="#3f5460"/>` +
    `<path d="M0,${H} L0,428 C96,414 190,470 250,${H} Z" fill="#33454f"/>` +
    pine(70, 434, 92, 46, "#26343c") +
    pine(786, 372, 78, 40, "#31434d") +
    `<rect y="${hz - 20}" width="${W}" height="60" fill="url(#fog)" opacity="0.35"/>`;
  return svg(defs, body);
};

/* 6 — Sedona: red rock */
scenes["sedona"] = () => {
  const r = rng(606);
  const defs =
    lin("sky", [["0", "#5aa7d0"], ["0.55", "#a7d3e4"], ["1", "#f3e0c4"]]) +
    lin("butteA", [["0", "#c96341"], ["1", "#8e3a25"]]) +
    lin("butteB", [["0", "#b4512f"], ["1", "#7a2f1e"]]) +
    lin("floor", [["0", "#a9613e"], ["1", "#7e422a"]]);
  /* Mesas: flat-topped with stepped shoulders */
  const butte = (x, w, top, base, fill) =>
    `<path d="M${n(x)},${n(base)} L${n(x + w * 0.08)},${n(top + 26)} L${n(x + w * 0.2)},${n(top)} ` +
    `L${n(x + w * 0.78)},${n(top)} L${n(x + w * 0.9)},${n(top + 30)} L${n(x + w)},${n(base)} Z" fill="${fill}"/>`;
  const body =
    sky("sky") +
    cloud(250, 134, 120, 0.45) +
    cloud(700, 98, 90, 0.38) +
    butte(-40, 340, 262, 452, "url(#butteB)") +
    butte(250, 300, 214, 452, "url(#butteA)") +
    butte(520, 420, 250, 452, "url(#butteB)") +
    /* strata lines */
    [0, 1, 2, 3].map((i) => `<rect x="250" y="${262 + i * 34}" width="300" height="4" fill="#000000" opacity="0.07"/>`).join("") +
    `<rect y="452" width="${W}" height="${H - 452}" fill="url(#floor)"/>` +
    `<ellipse cx="440" cy="470" rx="330" ry="20" fill="#c2764c" opacity="0.45"/>` +
    pineRow(r, 470, 40, 14, "#3f4a2e", 0.75) +
    `<ellipse cx="160" cy="548" rx="70" ry="22" fill="#5c3722" opacity="0.5"/>` +
    `<ellipse cx="720" cy="566" rx="90" ry="24" fill="#5c3722" opacity="0.45"/>`;
  return svg(defs, body);
};

/* 7 — Portland: misty forest */
scenes["portland"] = () => {
  const r = rng(707);
  const defs =
    lin("sky", [["0", "#c3d6cd"], ["0.6", "#e2ece5"], ["1", "#f2f7f3"]]) +
    lin("fog", [["0", "#f4f8f5", 0], ["0.5", "#f4f8f5", 0.85], ["1", "#f4f8f5", 0]]);
  let body = sky("sky");
  const layers = [
    { y: 300, h: 118, c: "#9db4a8", o: 0.55, count: 16 },
    { y: 372, h: 148, c: "#7a9a8c", o: 0.7, count: 14 },
    { y: 446, h: 186, c: "#4f7365", o: 0.85, count: 12 },
    { y: 528, h: 232, c: "#2c4a40", o: 1, count: 10 },
    { y: 600, h: 268, c: "#1b332c", o: 1, count: 8 },
  ];
  layers.forEach((l, i) => {
    body += pineRow(r, l.y, l.h, l.count, l.c, l.o);
    /* Forest floor at each baseline. Without this the gaps between the
       front trees fall through to the pale sky and read as white spikes. */
    body += `<path d="${ridge(r, l.y + 4, 9)}" fill="${l.c}" opacity="${l.o}"/>`;
    if (i < 3) body += `<rect y="${l.y - 40}" width="${W}" height="96" fill="url(#fog)" opacity="0.7"/>`;
  });
  return svg(defs, body);
};

/* 8 — Santa Fe: adobe at dusk */
scenes["santafe"] = () => {
  const r = rng(808);
  const defs =
    lin("sky", [["0", "#3d3a70"], ["0.4", "#8f5f86"], ["0.72", "#d97f6a"], ["1", "#f2b880"]]) +
    lin("adobe", [["0", "#d09566"], ["1", "#a06843"]]) +
    lin("ground", [["0", "#8a5a3c"], ["1", "#5c3a28"]]);
  const body =
    sky("sky") +
    stars(r, 40, 190) +
    `<circle cx="196" cy="140" r="30" fill="#fdf3d0" opacity="0.9"/>` +
    `<path d="${ridge(r, 386, 46)}" fill="#5b4066" opacity="0.7"/>` +
    `<rect y="430" width="${W}" height="${H - 430}" fill="url(#ground)"/>` +
    /* stepped adobe block */
    `<path d="M120,${H} L120,352 L300,352 L300,300 L470,300 L470,368 L640,368 L640,${H} Z" fill="url(#adobe)"/>` +
    /* vigas + windows */
    [0, 1, 2, 3, 4].map((i) => `<rect x="${132 + i * 34}" y="342" width="14" height="10" rx="3" fill="#7c4d31"/>`).join("") +
    [[176, 396], [252, 396], [344, 342], [420, 342], [520, 410], [580, 410]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="42" height="52" rx="5" fill="#f7d79a" opacity="0.92"/>`)
      .join("") +
    `<rect x="300" y="452" width="54" height="88" rx="6" fill="#5e3722"/>` +
    pine(724, 470, 96, 50, "#3a2a30") +
    `<ellipse cx="800" cy="520" rx="80" ry="20" fill="#4a2f22" opacity="0.5"/>`;
  return svg(defs, body);
};

/* 9 — Hudson Valley: autumn hills */
scenes["hudson"] = () => {
  const r = rng(909);
  const defs =
    lin("sky", [["0", "#7db4d8"], ["0.6", "#bcdaea"], ["1", "#eaf3f6"]]) +
    lin("h1", [["0", "#9ab08a"], ["1", "#7d9670"]]) +
    lin("h2", [["0", "#c08a4a"], ["1", "#9a6733"]]) +
    lin("h3", [["0", "#8f5a34"], ["1", "#5f3a22"]]);
  const blob = (x, y, rr, fill, op = 1) =>
    `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rr)}" ry="${n(rr * 0.82)}" fill="${fill}" opacity="${op}"/>`;
  let trees = "";
  for (let i = 0; i < 26; i++) {
    const x = r() * W;
    const y = 430 + r() * 130;
    const rr = 14 + r() * 26;
    const c = ["#b3652f", "#8d4f2a", "#c98a3c", "#6f7f45"][Math.floor(r() * 4)];
    trees += `<rect x="${n(x - rr * 0.08)}" y="${n(y)}" width="${n(rr * 0.16)}" height="${n(rr * 0.5)}" fill="#5a3d29"/>` + blob(x, y, rr, c);
  }
  const body =
    sky("sky") +
    cloud(180, 112, 110, 0.5) +
    cloud(620, 88, 140, 0.42) +
    `<path d="${ridge(r, 320, 58)}" fill="#93a8c0" opacity="0.55"/>` +
    `<path d="${ridge(r, 372, 48)}" fill="url(#h1)"/>` +
    `<path d="${ridge(r, 438, 42)}" fill="url(#h2)"/>` +
    trees +
    `<path d="${ridge(r, 552, 30)}" fill="url(#h3)"/>`;
  return svg(defs, body);
};

/* 10 — Kauai: tropical beach */
scenes["kauai"] = () => {
  const r = rng(1010);
  const hz = 300;
  const defs =
    lin("sky", [["0", "#3fa8d8"], ["0.6", "#9ddcee"], ["1", "#e4f6f7"]]) +
    lin("sea", [["0", "#1f95a8"], ["0.4", "#37b3bd"], ["1", "#8fe0d8"]]) +
    lin("sand", [["0", "#f0dcb4"], ["1", "#d8bb8a"]]);
  const body =
    sky("sky") +
    cloud(700, 92, 120, 0.55) +
    `<path d="${ridge(r, hz - 6, 58)}" fill="#3f7a72" opacity="0.5"/>` +
    `<rect y="${hz}" width="${W}" height="180" fill="url(#sea)"/>` +
    /* surf lines */
    [0, 1, 2, 3].map((i) => `<rect y="${400 + i * 22}" width="${W}" height="${5 - i * 0.6}" rx="3" fill="#ffffff" opacity="${0.5 - i * 0.09}"/>`).join("") +
    `<path d="M0,466 C180,452 320,478 470,466 C620,454 760,478 900,464 L900,${H} L0,${H} Z" fill="url(#sand)"/>` +
    `<ellipse cx="440" cy="474" rx="330" ry="10" fill="#ffffff" opacity="0.5"/>` +
    palm(r, 128, 560, 300, "#1f4a3d", 1) +
    palm(r, 792, 588, 250, "#20503f", -1) +
    `<ellipse cx="300" cy="566" rx="40" ry="10" fill="#c4a473" opacity="0.55"/>`;
  return svg(defs, body);
};

/* 11 — Park City: ski slopes */
scenes["parkcity"] = () => {
  const r = rng(1111);
  const defs =
    lin("sky", [["0", "#2f7fc4"], ["0.55", "#8dc4e6"], ["1", "#dcf0fa"]]) +
    lin("snowA", [["0", "#ffffff"], ["1", "#dae8f2"]]) +
    lin("snowB", [["0", "#f4fafd"], ["1", "#c3d8e8"]]);
  const mt = peaks(r, 316, 176, 4);
  const body =
    sky("sky") +
    `<circle cx="150" cy="98" r="40" fill="#fffdf0" opacity="0.85"/>` +
    `<path d="${mt.path}" fill="#8fb0c8"/>` +
    mt.apexes.map((a) => snowCap(r, a, 176)).join("") +
    `<path d="${ridge(r, 396, 40)}" fill="url(#snowB)"/>` +
    pineRow(r, 400, 60, 18, "#22443b", 0.85) +
    `<path d="${ridge(r, 476, 34)}" fill="url(#snowA)"/>` +
    pineRow(r, 486, 92, 12, "#193a31") +
    `<path d="M0,${H} L0,540 C220,506 470,566 900,520 L900,${H} Z" fill="#ffffff"/>` +
    /* chairlift */
    `<path d="M40,300 L860,214" stroke="#3c4a55" stroke-width="2" opacity="0.5"/>` +
    [180, 360, 540, 720].map((x, i) => {
      const y = 300 - ((x - 40) / 820) * 86;
      return `<rect x="${x - 2}" y="${n(y)}" width="4" height="46" fill="#3c4a55" opacity="0.5"/><rect x="${x - 12}" y="${n(y + 46)}" width="24" height="16" rx="4" fill="#3c4a55" opacity="${0.55 - i * 0.05}"/>`;
    }).join("");
  return svg(defs, body);
};

/* 12 — Marfa: desert night */
scenes["marfa"] = () => {
  const r = rng(1212);
  const defs =
    lin("sky", [["0", "#0d1230"], ["0.5", "#23295c"], ["0.82", "#5b4a7d"], ["1", "#a8709a"]]) +
    lin("ground", [["0", "#2a2038"], ["1", "#140f1e"]]) +
    rad("moon", [["0", "#fff8e0", 0.9], ["1", "#fff8e0", 0]], 0.5, 0.5, 0.5);
  const body =
    sky("sky") +
    stars(r, 130, 330) +
    `<circle cx="716" cy="120" r="70" fill="url(#moon)"/>` +
    `<circle cx="716" cy="120" r="26" fill="#fdf8e4"/>` +
    /* milky way smear */
    `<ellipse cx="380" cy="150" rx="300" ry="52" fill="#ffffff" opacity="0.05" transform="rotate(-18 380 150)"/>` +
    `<path d="${ridge(r, 452, 26)}" fill="#1a1528" opacity="0.9"/>` +
    `<rect y="470" width="${W}" height="${H - 470}" fill="url(#ground)"/>` +
    /* lone building with a lit window */
    `<path d="M580,${H} L580,436 L680,436 L680,470 L760,470 L760,${H} Z" fill="#0e0a16"/>` +
    `<rect x="606" y="458" width="30" height="34" rx="3" fill="#ffcf7a" opacity="0.9"/>` +
    `<rect x="700" y="492" width="26" height="30" rx="3" fill="#ffcf7a" opacity="0.7"/>` +
    `<ellipse cx="220" cy="520" rx="70" ry="16" fill="#0f0b18" opacity="0.7"/>`;
  return svg(defs, body);
};

/* ------------------------------------------------- interiors + terrace */

/** Shared room shell: wall, floor, window with a view, light spill. */
function room({ seed, viewGrad, warm = true, extras = "" }) {
  const r = rng(seed);
  const wallA = warm ? "#f2ece3" : "#eef0f1";
  const wallB = warm ? "#ddd3c6" : "#d9dde0";
  const floorY = 430;
  const wx = 500;
  const wy = 74;
  const ww = 340;
  const wh = 288;
  const defs =
    lin("wall", [["0", wallA], ["1", wallB]]) +
    lin("floor", [["0", "#caa77f"], ["1", "#9c7850"]]) +
    viewGrad +
    lin("beam", [["0", "#fff6e2", 0.5], ["1", "#fff6e2", 0]]);
  const body =
    `<rect width="${W}" height="${H}" fill="url(#wall)"/>` +
    `<rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#floor)"/>` +
    /* floor boards */
    [0, 1, 2, 3, 4].map((i) => `<rect y="${floorY + 26 + i * 34}" width="${W}" height="2" fill="#000000" opacity="0.05"/>`).join("") +
    /* window */
    `<rect x="${wx - 10}" y="${wy - 10}" width="${ww + 20}" height="${wh + 20}" rx="8" fill="#ffffff"/>` +
    `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#view)"/>` +
    `<rect x="${wx + ww / 2 - 3}" y="${wy}" width="6" height="${wh}" fill="#ffffff"/>` +
    `<rect x="${wx}" y="${wy + wh * 0.55 - 3}" width="${ww}" height="6" fill="#ffffff"/>` +
    /* light spilling onto the floor */
    `<path d="M${wx},${floorY} L${wx + ww},${floorY} L${wx + ww + 90},${H} L${wx - 130},${H} Z" fill="url(#beam)"/>` +
    /* potted plant */
    `<g>` +
    [0, 1, 2, 3, 4, 5].map((i) => frond(160, 388, 66 + r() * 30, -150 + i * 26, "#3f6b4a")).join("") +
    `<path d="M136,388 L184,388 L176,442 L144,442 Z" fill="#c2765a"/>` +
    `</g>` +
    extras;
  return svg(defs, body);
}

scenes["int-living"] = () =>
  room({
    seed: 2001,
    viewGrad: lin("view", [["0", "#7cc0e4"], ["0.58", "#bfe4f2"], ["0.62", "#2f8fa8"], ["1", "#1d6b85"]]),
    extras:
      /* rug */
      `<ellipse cx="410" cy="536" rx="300" ry="58" fill="#e2d6c4" opacity="0.75"/>` +
      /* sofa */
      `<g>` +
      `<rect x="212" y="404" width="330" height="86" rx="16" fill="#b9b0a2"/>` +
      `<rect x="228" y="440" width="298" height="72" rx="14" fill="#cdc4b6"/>` +
      `<rect x="252" y="422" width="120" height="52" rx="10" fill="#d9d1c4"/>` +
      `<rect x="386" y="422" width="120" height="52" rx="10" fill="#d9d1c4"/>` +
      `<rect x="240" y="508" width="14" height="24" rx="4" fill="#8a6a49"/>` +
      `<rect x="500" y="508" width="14" height="24" rx="4" fill="#8a6a49"/>` +
      `</g>` +
      /* coffee table */
      `<g><rect x="596" y="492" width="180" height="12" rx="6" fill="#a3784f"/>` +
      `<rect x="612" y="504" width="10" height="40" rx="4" fill="#8a6440"/>` +
      `<rect x="750" y="504" width="10" height="40" rx="4" fill="#8a6440"/></g>` +
      /* wall art */
      `<rect x="196" y="150" width="130" height="160" rx="4" fill="#ffffff"/>` +
      `<rect x="208" y="162" width="106" height="136" fill="#d6c3a8"/>` +
      `<circle cx="261" cy="216" r="30" fill="#c98a5e"/>`,
  });

scenes["int-bedroom"] = () =>
  room({
    seed: 2002,
    viewGrad: lin("view", [["0", "#e8a06e"], ["0.55", "#f5cf9a"], ["0.6", "#4a6f8e"], ["1", "#2c4a66"]]),
    extras:
      `<ellipse cx="400" cy="546" rx="290" ry="48" fill="#e0d4c2" opacity="0.6"/>` +
      /* headboard + bed */
      `<rect x="196" y="248" width="360" height="150" rx="12" fill="#c5b8a6"/>` +
      `<rect x="180" y="392" width="392" height="106" rx="12" fill="#fbfaf7"/>` +
      `<rect x="180" y="452" width="392" height="52" rx="10" fill="#cfd8d3"/>` +
      `<rect x="222" y="366" width="140" height="46" rx="14" fill="#ffffff"/>` +
      `<rect x="378" y="366" width="140" height="46" rx="14" fill="#ffffff"/>` +
      `<rect x="196" y="496" width="14" height="26" rx="4" fill="#8a6a49"/>` +
      `<rect x="542" y="496" width="14" height="26" rx="4" fill="#8a6a49"/>` +
      /* nightstand + lamp */
      `<rect x="600" y="440" width="96" height="76" rx="6" fill="#a3784f"/>` +
      `<rect x="632" y="392" width="10" height="50" fill="#6f5a44"/>` +
      `<path d="M612,392 L662,392 L672,356 L602,356 Z" fill="#f0e2c4"/>`,
  });

scenes["int-kitchen"] = () =>
  room({
    seed: 2003,
    viewGrad: lin("view", [["0", "#8fd0e8"], ["0.6", "#cfeaf4"], ["0.64", "#39a08f"], ["1", "#227a6e"]]),
    extras:
      /* upper cabinets */
      `<rect x="80" y="120" width="330" height="130" rx="6" fill="#e6e0d5"/>` +
      `<rect x="246" y="120" width="4" height="130" fill="#cdc5b7"/>` +
      `<rect x="230" y="176" width="34" height="6" rx="3" fill="#9a9184"/>` +
      /* counter + base units */
      `<rect x="60" y="382" width="400" height="20" rx="4" fill="#3f4750"/>` +
      `<rect x="60" y="402" width="400" height="128" fill="#d8cfc0"/>` +
      `<rect x="258" y="402" width="4" height="128" fill="#c2b8a7"/>` +
      `<rect x="150" y="432" width="40" height="6" rx="3" fill="#8f8779"/>` +
      `<rect x="330" y="432" width="40" height="6" rx="3" fill="#8f8779"/>` +
      /* sink + tap */
      `<rect x="96" y="386" width="90" height="12" rx="4" fill="#98a0a8"/>` +
      `<path d="M300,382 L300,340 Q300,330 314,330 L340,330" stroke="#98a0a8" stroke-width="7" fill="none" stroke-linecap="round"/>` +
      /* pendants */
      [200, 320].map((x) => `<rect x="${x - 1}" y="120" width="2" height="110" fill="#6f6a60"/><path d="M${x - 30},262 L${x + 30},262 L${x + 18},230 L${x - 18},230 Z" fill="#c9a45e"/>`).join("") +
      /* bowl of fruit */
      `<ellipse cx="404" cy="374" rx="34" ry="12" fill="#b9865d"/>` +
      `<circle cx="392" cy="366" r="9" fill="#c85b4a"/><circle cx="410" cy="364" r="9" fill="#d98a3c"/>`,
  });

scenes["int-bath"] = () =>
  room({
    seed: 2004,
    warm: false,
    viewGrad: lin("view", [["0", "#a9d8ea"], ["0.6", "#dcf0f6"], ["0.64", "#5aa38f"], ["1", "#37776a"]]),
    extras:
      /* tiled floor tint */
      `<rect y="430" width="${W}" height="${H - 430}" fill="#dfe3e5"/>` +
      [0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 160}" y="430" width="2" height="170" fill="#c6ccd0"/>`).join("") +
      [0, 1, 2, 3].map((i) => `<rect y="${460 + i * 40}" width="${W}" height="2" fill="#c6ccd0"/>`).join("") +
      /* freestanding tub */
      `<path d="M180,412 Q176,530 250,534 L470,534 Q544,530 540,412 Z" fill="#ffffff"/>` +
      `<ellipse cx="360" cy="412" rx="180" ry="26" fill="#eef3f5"/>` +
      `<ellipse cx="360" cy="414" rx="160" ry="20" fill="#cfe6ee"/>` +
      `<rect x="228" y="530" width="16" height="26" rx="5" fill="#b9c2c7"/>` +
      `<rect x="476" y="530" width="16" height="26" rx="5" fill="#b9c2c7"/>` +
      /* tap */
      `<path d="M600,412 L600,300 Q600,288 586,288 L520,288" stroke="#aab3ba" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      /* towel + stool */
      `<rect x="676" y="404" width="70" height="120" rx="8" fill="#eef2f4"/>` +
      `<rect x="676" y="404" width="70" height="14" rx="6" fill="#d7dee2"/>`,
  });

/* Terrace + infinity pool — the listing hero */
scenes["villa-pool"] = () => {
  const r = rng(3001);
  const hz = 232;

  /** Sun lounger drawn at the origin, then placed with a group transform
   *  so mirroring flips the whole thing rather than one child. */
  const lounger = (x, y, s = 1, flip = false) =>
    `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s})">` +
    `<path d="M0,0 L28,-40 L48,-34 L24,3 Z" fill="#f7f2e8"/>` +
    `<rect x="0" y="0" width="88" height="13" rx="6" fill="#f7f2e8"/>` +
    `<rect x="10" y="13" width="6" height="18" rx="2" fill="#cbb693"/>` +
    `<rect x="72" y="13" width="6" height="18" rx="2" fill="#cbb693"/>` +
    `</g>`;

  const defs =
    lin("sky", [["0", "#3f9ed4"], ["0.55", "#9fd6ec"], ["1", "#e6f5fa"]]) +
    lin("ocean", [["0", "#2c7ea3"], ["1", "#54abc4"]]) +
    lin("pool", [["0", "#63cbdb"], ["0.55", "#37accb"], ["1", "#1d84a8"]]) +
    lin("deck", [["0", "#efe4d2"], ["1", "#d3c0a2"]]);

  const body =
    sky("sky") +
    cloud(190, 96, 130, 0.5) +
    cloud(690, 70, 96, 0.36) +
    `<rect y="${hz}" width="${W}" height="104" fill="url(#ocean)"/>` +
    streaks(r, hz + 8, 322, 580, "#dff2f8", 16) +
    /* deck fills everything below the horizon, then the pool sits on it */
    `<rect y="336" width="${W}" height="${H - 336}" fill="url(#deck)"/>` +
    /* infinity edge: bright lip where the pool meets the sea */
    `<rect y="330" width="${W}" height="7" fill="#eaf7fa" opacity="0.9"/>` +
    /* coping, then water inset within it */
    `<path d="M150,344 L750,344 L800,556 L100,556 Z" fill="#e6dac4"/>` +
    `<path d="M164,352 L736,352 L782,546 L118,546 Z" fill="url(#pool)"/>` +
    [0, 1, 2, 3, 4].map((i) => {
      const y = 380 + i * 36;
      const inset = 22 + i * 9;
      return `<path d="M${176 + inset},${y} Q450,${y - 9} ${724 - inset},${y}" stroke="#ffffff" stroke-opacity="${(0.2 - i * 0.028).toFixed(2)}" stroke-width="${3 + i}" fill="none"/>`;
    }).join("") +
    /* loungers sit on the deck either side of the pool */
    lounger(14, 470, 0.92) +
    lounger(884, 452, 0.86, true) +
    /* parasol — anchored so the canopy stays inside the frame */
    `<g transform="translate(806,0)">` +
    `<rect x="-3" y="372" width="6" height="106" rx="2" fill="#b09a78"/>` +
    `<path d="M-84,376 Q0,306 84,376 Z" fill="#e4705e"/>` +
    `<path d="M-84,376 Q-42,360 0,376 Q42,360 84,376 Z" fill="#c9564a" opacity="0.55"/>` +
    `</g>` +
    palm(r, 66, 420, 230, "#20553f", 1);
  return svg(defs, body);
};

/* ------------------------------------------------------------------ map */

function mapTile() {
  const r = rng(777);
  const MW = 800;
  const MH = 1000;
  const road = (d, w) =>
    `<path d="${d}" stroke="#ffffff" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  const casing = (d, w) =>
    `<path d="${d}" stroke="#e2ddd3" stroke-width="${w + 3}" fill="none" stroke-linecap="round"/>`;

  const paths = [];
  for (let i = 1; i < 7; i++) {
    const y = (i / 7) * MH + (r() - 0.5) * 26;
    paths.push({ d: `M-20,${n(y)} L${MW + 20},${n(y + (r() - 0.5) * 40)}`, w: 5 + r() * 4 });
  }
  for (let i = 1; i < 6; i++) {
    const x = (i / 6) * MW + (r() - 0.5) * 26;
    paths.push({ d: `M${n(x)},-20 L${n(x + (r() - 0.5) * 40)},${MH + 20}`, w: 5 + r() * 4 });
  }
  paths.push({ d: `M-20,760 C220,690 300,470 520,300 C640,206 700,120 760,-20`, w: 12 });
  paths.push({ d: `M-20,240 C160,300 340,250 520,330 C660,392 720,520 820,600`, w: 10 });

  let blocks = "";
  for (let i = 0; i < 46; i++) {
    const x = r() * MW;
    const y = r() * MH;
    const w = 18 + r() * 54;
    const h = 16 + r() * 44;
    blocks += `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="2" fill="#ddd7cb" opacity="${(0.45 + r() * 0.4).toFixed(2)}"/>`;
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MW} ${MH}" width="${MW}" height="${MH}">` +
    `<rect width="${MW}" height="${MH}" fill="#eae6df"/>` +
    /* water */
    `<path d="M${MW},0 L${MW},420 C660,400 580,300 600,180 C612,110 640,50 620,0 Z" fill="#a9d4e4"/>` +
    `<path d="M0,${MH} L0,830 C150,860 260,940 320,${MH} Z" fill="#a9d4e4"/>` +
    /* parks */
    `<path d="M120,180 C200,150 300,190 300,260 C300,330 190,360 130,320 C80,286 70,206 120,180 Z" fill="#cfe0bd"/>` +
    `<path d="M470,700 C540,676 620,720 610,790 C600,856 500,876 456,830 C420,792 424,716 470,700 Z" fill="#cfe0bd"/>` +
    blocks +
    paths.map((p) => casing(p.d, p.w)).join("") +
    paths.map((p) => road(p.d, p.w)).join("") +
    `</svg>`
  );
}

/* ---------------------------------------------------------------- write */

mkdirSync(OUT, { recursive: true });

let count = 0;
for (const [name, build] of Object.entries(scenes)) {
  writeFileSync(join(OUT, `${name}.svg`), build());
  count++;
}
writeFileSync(join(OUT, "map.svg"), mapTile());
count++;

console.log(`Wrote ${count} mock images to public/mock/`);
