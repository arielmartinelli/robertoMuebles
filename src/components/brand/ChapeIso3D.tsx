import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Isotipo "Cajón" interactivo en 3D (proyección propia sobre SVG, sin librerías 3D).
 *
 * - Girar: click y arrastrar (PC) o deslizar con el dedo. Gira 360° en horizontal e inclina en vertical.
 * - Hover: solo resalta con brillo el módulo que está exactamente debajo del puntero (o su etiqueta).
 * - Click / toque sin arrastrar: guarda o saca el cajón. Por defecto el cajón (Fabricamos) está afuera.
 * - Etiquetas con flecha recta (Diseñamos · Fabricamos · Instalamos), ordenadas en columna sin pisarse.
 * - En reposo gira despacio y el resaltado rota solo. Respeta "reducir movimiento".
 */

type V3 = [number, number, number];
type Pt = [number, number];
type Tone = 't' | 'l' | 'r' | 'a1' | 'a2' | 'a3';

const FILL: Record<Tone, string> = {
  t: 'var(--iso-t)',
  l: 'var(--iso-l)',
  r: 'var(--iso-r)',
  a1: 'var(--iso-a1)',
  a2: 'var(--iso-a2)',
  a3: 'var(--iso-a3)',
};

const H = 0.3;
const GAP = 0.05;
const MAX_OUT = 0.38;
const CENTER: V3 = [0.62, 0.5, 0.62];
const SCALE = 33;
const DEG = Math.PI / 180;
const YAW0 = 45;
const PITCH0 = 35.26;
const PITCH_RANGE = 16;
const SLOTS = 16;
const GLOW_SLOTS = 8;
const IDLE_SPIN = 8; // °/s en reposo
const AUTO_MS = 2600; // cambio automático del paso resaltado
const EXPLODE = 0.07; // separación fija entre módulos, para que las etiquetas tengan lugar

// Etiquetas
const COL_X = 71; // columna de las etiquetas (coordenadas del viewBox)
const CHIP_W = 29;
const CHIP_H = 8;
const CHIP_GAP = 2.5; // espacio mínimo entre etiquetas
const SHIFT = -13; // el logo se corre a la izquierda para dejar lugar a las etiquetas

const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

const STEPS = [
  { n: '01', t: 'Diseñamos' },
  { n: '02', t: 'Fabricamos' },
  { n: '03', t: 'Instalamos' },
] as const;

type Box = { min: V3; max: V3; accent: boolean; c: V3; mod: number };
type Face = { d: string; fill: string; hl: number; mod: number; pts: Pt[] };

/** Proyecta el modelo. Módulos: 0 arriba (Diseñamos), 1 cajón (Fabricamos), 2 abajo (Instalamos). */
function project(yawDeg: number, pitchDeg: number, open: number, lift: number[], hl: number[], shift: number) {
  const y = yawDeg * DEG;
  const p = pitchDeg * DEG;
  const view: V3 = [Math.cos(p) * Math.cos(y), Math.cos(p) * Math.sin(y), Math.sin(p)];
  const right: V3 = [Math.sin(y), -Math.cos(y), 0];
  const up: V3 = [-Math.sin(p) * Math.cos(y), -Math.sin(p) * Math.sin(y), Math.cos(p)];
  const toScreen = (pt: V3): Pt => {
    const q: V3 = [pt[0] - CENTER[0], pt[1] - CENTER[1], pt[2] - CENTER[2]];
    return [50 + shift + dot(q, right) * SCALE, 50 - dot(q, up) * SCALE];
  };

  const e = Math.max(0, Math.min(1, open)) * MAX_OUT;
  const zm0 = H + GAP;
  const zm1 = 2 * H + GAP;
  const zt0 = 2 * (H + GAP);
  const zTop = EXPLODE + lift[0];
  const zBot = -EXPLODE - lift[2];

  const mk = (min: V3, max: V3, accent: boolean, mod: number): Box => ({
    min,
    max,
    accent,
    mod,
    c: [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2],
  });
  const boxes: Box[] = [
    mk([0, 0, zBot], [1, 1, H + zBot], false, 2),
    mk([e, 0, zm0], [Math.max(e + 0.001, 1), 1, zm1], true, 1),
    mk([0, 0, zt0 + zTop], [1, 1, zt0 + H + zTop], false, 0),
  ];
  if (e > 0.001) boxes.push(mk([1, 0, zm0], [1 + e, 1, zm1], true, 1));

  // Orden del pintor con planos de separación.
  const behind = (a: Box, b: Box) => {
    const eps = 1e-6;
    if (a.max[2] <= b.min[2] + eps) return true;
    if (b.max[2] <= a.min[2] + eps) return false;
    if (a.max[0] <= b.min[0] + eps) return view[0] > 0;
    if (b.max[0] <= a.min[0] + eps) return view[0] < 0;
    if (a.max[1] <= b.min[1] + eps) return view[1] > 0;
    if (b.max[1] <= a.min[1] + eps) return view[1] < 0;
    return dot(a.c, view) < dot(b.c, view);
  };
  const pending = [...boxes];
  const ordered: Box[] = [];
  while (pending.length) {
    const i = pending.findIndex((a) => pending.every((b) => b === a || !behind(b, a)));
    ordered.push(...pending.splice(i < 0 ? 0 : i, 1));
  }

  const faces: Face[] = [];
  for (const b of ordered) {
    const [x0, y0, z0] = b.min;
    const [x1, y1, z1] = b.max;
    const candidates: { n: V3; pts: V3[] }[] = [
      { n: [0, 0, 1], pts: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]] },
      { n: [1, 0, 0], pts: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]] },
      { n: [-1, 0, 0], pts: [[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1]] },
      { n: [0, 1, 0], pts: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]] },
      { n: [0, -1, 0], pts: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]] },
    ];
    for (const f of candidates) {
      if (dot(f.n, view) <= 0.001) continue;
      const isTop = f.n[2] === 1;
      const facesRight = dot(f.n, right) > 0;
      const tone: Tone = isTop ? (b.accent ? 'a1' : 't') : facesRight ? (b.accent ? 'a3' : 'r') : b.accent ? 'a2' : 'l';
      const sp = f.pts.map((pt) => toScreen(pt));
      const d = 'M' + sp.map(([sx, sy]) => `${sx.toFixed(2)} ${sy.toFixed(2)}`).join('L') + 'Z';
      const h = hl[b.mod];
      // El módulo marcado se aclara un poco (el cajón amarillo conserva su saturación).
      const fill = h <= 0.01 || b.accent ? FILL[tone] : `color-mix(in srgb, ${FILL[tone]} ${(100 - 20 * h).toFixed(1)}%, #fff)`;
      faces.push({ d, fill, hl: h, mod: b.mod, pts: sp });
    }
  }

  // Rango vertical en pantalla de cada módulo (para ubicar su etiqueta dentro de su altura).
  const ranges = [0, 1, 2].map((m) => {
    const ys = faces.filter((f) => f.mod === m).flatMap((f) => f.pts.map((q) => q[1]));
    return { min: Math.min(...ys), max: Math.max(...ys) };
  });
  const centers = [boxes[2], boxes[1], boxes[0]].map((b) => toScreen(b.c)[1]);

  return { faces, ranges, centers };
}

/** Punto dentro de polígono (ray casting). */
function inside([x, y]: Pt, poly: Pt[]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** Borde derecho del dibujo a una altura dada (considerando todas las caras, o solo las de un módulo). */
function edgeAt(faces: Face[], yy: number, mod?: number) {
  let x = -Infinity;
  for (const f of faces) {
    if (mod !== undefined && f.mod !== mod) continue;
    const poly = f.pts;
    for (let k = 0; k < poly.length; k++) {
      const [ax, ay] = poly[k];
      const [bx, by] = poly[(k + 1) % poly.length];
      if ((ay - yy) * (by - yy) > 0 || ay === by) continue;
      x = Math.max(x, ax + ((yy - ay) / (by - ay)) * (bx - ax));
    }
  }
  return x;
}

/** Ubica las etiquetas: cada una dentro de la altura de su módulo, en orden y sin pisarse. */
function layoutLabels(centers: number[], ranges: { min: number; max: number }[]) {
  const half = CHIP_H / 2;
  const ys = centers.map((c, i) => Math.min(Math.max(c, ranges[i].min + half * 0.6), ranges[i].max - half * 0.6));
  const step = CHIP_H + CHIP_GAP;
  for (let i = 1; i < ys.length; i++) ys[i] = Math.max(ys[i], ys[i - 1] + step);
  // Si la última quedó muy abajo, se compacta hacia arriba respetando el espacio mínimo.
  const limit = 96 - half;
  if (ys[2] > limit) {
    ys[2] = limit;
    for (let i = 1; i >= 0; i--) ys[i] = Math.min(ys[i], ys[i + 1] - step);
  }
  return ys;
}

type Props = { className?: string; replayKey?: string };

export function ChapeIso3D({ className = '', replayKey }: Props) {
  const reduce = useReducedMotion();
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const glowRefs = useRef<Array<SVGPathElement | null>>([]);
  const lineRefs = useRef<Array<SVGPathElement | null>>([]);
  const arrowRefs = useRef<Array<SVGPathElement | null>>([]);
  const chipRefs = useRef<Array<SVGGElement | null>>([]);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const wrapRef = useRef<HTMLButtonElement>(null);
  const [hint, setHint] = useState(true);
  const [out, setOut] = useState(true);
  const [grabbing, setGrabbing] = useState(false);

  const s = useRef({
    yaw: YAW0, pitch: PITCH0, open: 1, labels: reduce ? 1 : 0,
    tYaw: YAW0, tPitch: PITCH0, tOpen: 1,
    lift: [0, 0, 0], hl: [0, 0, 0], focus: -1,
    faces: [] as Face[], chipYs: [0, 0, 0],
    over: false, hoverMod: -1, dragging: false, moved: false, lastX: 0, lastY: 0, startX: 0, startY: 0, visible: true,
  });

  const draw = () => {
    const st = s.current;
    const shift = SHIFT * st.labels;
    const { faces, ranges, centers } = project(st.yaw, st.pitch, st.open, st.lift, st.hl, shift);
    st.faces = faces;

    for (let i = 0; i < SLOTS; i++) {
      const el = pathRefs.current[i];
      if (!el) continue;
      const f = faces[i];
      if (f) {
        el.setAttribute('d', f.d);
        el.style.fill = f.fill;
        el.style.stroke = f.fill; // tapa las costuras entre caras
        el.style.display = '';
      } else el.style.display = 'none';
    }

    // Resplandor amarillo detrás del módulo resaltado, que late suave.
    const glowFaces = faces.filter((f) => f.hl > 0.01);
    const pulse = 0.7 + 0.3 * Math.sin(performance.now() / 380);
    for (let i = 0; i < GLOW_SLOTS; i++) {
      const g = glowRefs.current[i];
      if (!g) continue;
      const f = glowFaces[i];
      if (f) {
        g.setAttribute('d', f.d);
        g.style.opacity = (f.hl * pulse).toFixed(3);
        g.style.display = '';
      } else g.style.display = 'none';
    }

    // Altura de cada flecha: la más cercana al centro del módulo donde ese módulo es el que está adelante,
    // así la flecha nunca apunta a otro módulo (por ejemplo, al cajón cuando está afuera).
    const aims = centers.map((c, i) => {
      const { min, max } = ranges[i];
      let best = c;
      let bestD = Infinity;
      for (let k = 1; k < 24; k++) {
        const yy = min + ((max - min) * k) / 24;
        const own = edgeAt(faces, yy, i);
        if (!Number.isFinite(own) || own < edgeAt(faces, yy) - 0.3) continue;
        const d = Math.abs(yy - c);
        if (d < bestD) {
          bestD = d;
          best = yy;
        }
      }
      return best;
    });

    // Etiquetas en columna; la flecha es recta y termina en el borde del módulo a esa altura.
    const ys = layoutLabels(aims, ranges);
    st.chipYs = ys;
    ys.forEach((yy, i) => {
      const op = Math.max(0, Math.min(1, st.labels * 1.8 - i * 0.4));
      const on = st.focus === i;
      const own = edgeAt(faces, yy, i);
      const all = edgeAt(faces, yy);
      // Si otro módulo queda más adelante a esa altura, la flecha se detiene ahí para no cruzarlo.
      const target = Number.isFinite(own) ? Math.max(own, all) : all;
      const tip = Math.min((Number.isFinite(target) ? target : 50) + 0.6, COL_X - 3);
      const line = lineRefs.current[i];
      if (line) {
        line.setAttribute('d', `M${(COL_X - 0.6).toFixed(2)} ${yy.toFixed(2)}H${(tip + 2.2).toFixed(2)}`);
        line.style.strokeDashoffset = (1 - op).toFixed(3);
        line.style.stroke = on ? 'var(--corte)' : 'var(--muted)';
        line.style.opacity = on ? '1' : '0.6';
      }
      const arrow = arrowRefs.current[i];
      if (arrow) {
        arrow.setAttribute('d', `M${tip.toFixed(2)} ${yy.toFixed(2)}L${(tip + 2.6).toFixed(2)} ${(yy - 1.3).toFixed(2)}L${(tip + 2.6).toFixed(2)} ${(yy + 1.3).toFixed(2)}Z`);
        arrow.style.fill = on ? 'var(--corte)' : 'var(--muted)';
        arrow.style.opacity = (op * (on ? 1 : 0.75)).toFixed(3);
      }
      const chip = chipRefs.current[i];
      if (chip) {
        chip.setAttribute('transform', `translate(${(COL_X + (1 - op) * 4).toFixed(2)} ${(yy - CHIP_H / 2).toFixed(2)})`);
        chip.style.opacity = op.toFixed(3);
        chip.dataset.active = on ? 'true' : 'false';
      }
    });

    if (shadowRef.current) shadowRef.current.setAttribute('cx', (50 + shift).toFixed(2));
  };

  /** Módulo debajo de un punto del viewBox: primero las etiquetas, después las caras de adelante hacia atrás. */
  const hitTest = (x: number, y: number) => {
    const st = s.current;
    for (let i = 0; i < 3; i++) {
      const cy = st.chipYs[i];
      if (x >= COL_X - 1 && x <= COL_X + CHIP_W + 1 && y >= cy - CHIP_H / 2 - 0.5 && y <= cy + CHIP_H / 2 + 0.5) return i;
    }
    for (let i = st.faces.length - 1; i >= 0; i--) if (inside([x, y], st.faces[i].pts)) return st.faces[i].mod;
    return -1;
  };

  // Al cambiar de modo: vuelve al estado inicial (cajón afuera).
  useEffect(() => {
    const st = s.current;
    st.tOpen = 1;
    if (reduce) {
      st.open = 1;
      st.labels = 1;
      draw();
    }
    setOut(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayKey, reduce]);

  // Bucle de animación (solo mientras el logo está en pantalla).
  useEffect(() => {
    draw();
    if (reduce) return;
    const st = s.current;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = now / 1000;

      // En reposo gira despacio; se detiene mientras el puntero está encima o se arrastra.
      if (!st.over && !st.dragging) {
        st.tYaw += IDLE_SPIN * dt;
        st.tPitch = PITCH0 + Math.sin(time * 0.45) * 3;
      }

      // Módulo resaltado: el del hover; sin puntero, rota solo.
      st.focus = st.over ? st.hoverMod : Math.floor(time / (AUTO_MS / 1000)) % 3;

      const ease = 1 - Math.pow(0.001, dt);
      const easeSlow = 1 - Math.pow(0.004, dt);
      st.yaw += (st.tYaw - st.yaw) * ease;
      st.pitch += (st.tPitch - st.pitch) * ease;
      st.open += (st.tOpen - st.open) * easeSlow;
      st.labels += (1 - st.labels) * easeSlow;
      for (let i = 0; i < 3; i++) {
        const tl = (i === 0 && st.focus === 0) || (i === 2 && st.focus === 2) ? 0.1 : 0;
        const th = st.focus === i ? 1 : 0;
        st.lift[i] += (tl - st.lift[i]) * easeSlow;
        st.hl[i] += (th - st.hl[i]) * ease;
      }

      draw();
      if (st.visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
      if (st.visible) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    });
    if (wrapRef.current) io.observe(wrapRef.current);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  /* ---------- Interacción ---------- */

  const toView = (clientX: number, clientY: number) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return [((clientX - r.left) / r.width) * 100, ((clientY - r.top) / r.height) * 100] as Pt;
  };

  const onPointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    s.current.over = true;
    setHint(false);
  };

  const onPointerLeave = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    const st = s.current;
    st.over = false;
    st.hoverMod = -1;
  };

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    const st = s.current;
    st.dragging = true;
    st.moved = false;
    st.startX = st.lastX = e.clientX;
    st.startY = st.lastY = e.clientY;
    if (e.pointerType === 'mouse') {
      setGrabbing(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* sin captura */
      }
    } else {
      // En el celular, tocar un módulo también lo resalta.
      const [x, y] = toView(e.clientX, e.clientY);
      st.over = true;
      st.hoverMod = hitTest(x, y);
    }
    setHint(false);
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const st = s.current;
    if (st.dragging) {
      // Arrastrar gira el modelo: horizontal 360°, vertical con límite.
      const dx = e.clientX - st.lastX;
      const dy = e.clientY - st.lastY;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      st.tYaw += dx * 0.7;
      st.tPitch = Math.max(PITCH0 - PITCH_RANGE, Math.min(PITCH0 + PITCH_RANGE, st.tPitch + dy * 0.25));
      if (Math.abs(e.clientX - st.startX) + Math.abs(e.clientY - st.startY) > 6) st.moved = true;
      return;
    }
    if (e.pointerType === 'mouse') {
      // Hover: solo resalta el módulo que está debajo del puntero.
      const [x, y] = toView(e.clientX, e.clientY);
      st.hoverMod = hitTest(x, y);
    }
  };

  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    const st = s.current;
    st.dragging = false;
    setGrabbing(false);
    if (e.pointerType !== 'mouse') {
      st.over = false;
      st.hoverMod = -1;
    }
  };

  const toggleDrawer = () => {
    const st = s.current;
    st.tOpen = st.tOpen > 0.5 ? 0 : 1;
    if (reduce) {
      st.open = st.tOpen;
      draw();
    }
    setOut(st.tOpen === 1);
  };

  const onClick = () => {
    if (s.current.moved) {
      s.current.moved = false;
      return; // fue un arrastre, no un click
    }
    toggleDrawer();
    setHint(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const st = s.current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      st.tYaw += e.key === 'ArrowLeft' ? -20 : 20;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      st.tPitch = Math.max(PITCH0 - PITCH_RANGE, Math.min(PITCH0 + PITCH_RANGE, st.tPitch + (e.key === 'ArrowUp' ? -5 : 5)));
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={wrapRef}
        type="button"
        aria-label={out ? 'Isotipo de Chape en 3D: guardar el cajón' : 'Isotipo de Chape en 3D: sacar el cajón'}
        aria-pressed={out}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`block aspect-square w-full touch-pan-y select-none rounded-full outline-offset-8 ${grabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <filter id="iso3d-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
            <filter id="iso3d-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>
          <ellipse ref={shadowRef} cx="50" cy="93" rx="27" ry="4.5" fill="#000" opacity="0.2" filter="url(#iso3d-shadow)" />
          {/* Resplandor del módulo resaltado: va detrás del logo */}
          <g filter="url(#iso3d-glow)">
            {Array.from({ length: GLOW_SLOTS }, (_, i) => (
              <path
                key={i}
                ref={(el) => {
                  glowRefs.current[i] = el;
                }}
                fill="var(--corte)"
                stroke="var(--corte)"
                strokeWidth="2.2"
                strokeLinejoin="round"
                style={{ display: 'none' }}
              />
            ))}
          </g>
          {Array.from({ length: SLOTS }, (_, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              strokeWidth={0.25}
              strokeLinejoin="round"
            />
          ))}
          {/* Etiquetas: flecha recta + número y nombre */}
          {STEPS.map((st, i) => (
            <g key={st.t} className="pointer-events-none">
              <path
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                fill="none"
                strokeWidth="0.45"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
              />
              <path
                ref={(el) => {
                  arrowRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
              />
              <g
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                className="iso-chip"
                style={{ opacity: 0 }}
              >
                <rect width={CHIP_W} height={CHIP_H} rx="1.4" className="iso-chip-bg" strokeWidth="0.35" />
                <text x="2.2" y={CHIP_H / 2 + 0.85} fontSize="2.3" fontFamily="IBM Plex Mono, monospace" fontWeight="600" className="iso-chip-n">
                  {st.n}
                </text>
                <text x="6.6" y={CHIP_H / 2 + 1} fontSize="2.75" fontFamily="IBM Plex Mono, monospace" fontWeight="600" letterSpacing="0.2" className="iso-chip-t">
                  {st.t.toUpperCase()}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </button>
      <p
        aria-hidden="true"
        className={`pointer-events-none mt-1 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted transition-opacity duration-500 ${hint && !reduce ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="hidden [@media(hover:hover)]:inline">Arrastrá para girar · click guarda el cajón</span>
        <span className="[@media(hover:hover)]:hidden">Deslizá para girar · tocá para guardar el cajón</span>
      </p>
    </div>
  );
}
