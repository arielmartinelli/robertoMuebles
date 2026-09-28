/**
 * Geometría del isotipo "Cajón" de Chape.
 * Tres módulos apilados en perspectiva isométrica; el del medio (amarillo)
 * sale hacia adelante como un cajón. `open` va de 0 (cerrado) a 1 (abierto).
 */
type Pt = [number, number];
export type Face = { d: string; tone: 't' | 'l' | 'r' | 'a1' | 'a2' | 'a3' };

const C30 = Math.cos(Math.PI / 6);
const P = (x: number, y: number, z: number): Pt => [(x - y) * C30, (x + y) * 0.5 - z];

const H = 0.3;
const GAP = 0.05;
const MAX_OUT = 0.38;
const ZM0 = H + GAP;
const ZM1 = 2 * H + GAP;
const ZT0 = 2 * (H + GAP);
const ZT1 = ZT0 + H;

// Encuadre fijo calculado con el cajón totalmente abierto, para que no "salte" al animar.
const PAD = 2;
const bounds = (() => {
  const pts = [
    P(0, 0, 0), P(1, 1, 0), P(0, 1, 0), P(1, 0, 0),
    P(0, 0, ZT1), P(1, 0, ZT1), P(0, 1, ZT1), P(1, 1, ZT1),
    P(1 + MAX_OUT, 0, ZM1), P(1 + MAX_OUT, 1, ZM0), P(1 + MAX_OUT, 0, ZM0), P(1 + MAX_OUT, 1, ZM1),
  ];
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX, h = maxY - minY;
  const sc = (100 - 2 * PAD) / Math.max(w, h);
  return { minX, minY, sc, ox: PAD + (100 - 2 * PAD - w * sc) / 2, oy: PAD + (100 - 2 * PAD - h * sc) / 2 };
})();

const toD = (pts: Pt[]) =>
  'M' + pts.map(([x, y]) => `${((x - bounds.minX) * bounds.sc + bounds.ox).toFixed(2)} ${((y - bounds.minY) * bounds.sc + bounds.oy).toFixed(2)}`).join('L') + 'Z';

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, accent = false): Face[] {
  return [
    { d: toD([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]), tone: accent ? 'a1' : 't' },
    { d: toD([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)]), tone: accent ? 'a2' : 'l' },
    { d: toD([P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)]), tone: accent ? 'a3' : 'r' },
  ];
}

export function cajonFaces(open = 1): Face[] {
  const e = Math.max(0, Math.min(1, open)) * MAX_OUT;
  const faces: Face[] = [
    ...box(0, 0, 0, 1, 1, H),
    ...box(e, 0, ZM0, 1 + e, 1, ZM1, true),
    ...box(0, 0, ZT0, 1, 1, ZT1),
  ];
  if (e > 0.001) {
    // Parte del cajón que sobresale por delante del módulo superior.
    faces.push(
      { d: toD([P(1, 0, ZM1), P(1 + e, 0, ZM1), P(1 + e, 1, ZM1), P(1, 1, ZM1)]), tone: 'a1' },
      { d: toD([P(1, 1, ZM0), P(1 + e, 1, ZM0), P(1 + e, 1, ZM1), P(1, 1, ZM1)]), tone: 'a2' },
      { d: toD([P(1 + e, 0, ZM0), P(1 + e, 1, ZM0), P(1 + e, 1, ZM1), P(1 + e, 0, ZM1)]), tone: 'a3' },
    );
  }
  return faces;
}
