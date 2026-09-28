import type { Mode } from '../context/mode';

/**
 * Tarifas ORIENTATIVAS del presupuestador (USD).
 * Calibrar con los precios reales de Chape antes de publicar.
 */
export type Unit = 'ml' | 'm2';
export type Typology = { id: string; label: string; unit: Unit; rate: number; min: number; max: number; initial: number; baseDays: number };
export type Finish = { id: string; label: string; detail: string; factor: number };
export type Extra = { id: string; label: string; pct: number };

export const PRICING: Record<Mode, { typologies: Typology[]; finishes: Finish[]; extras: Extra[] }> = {
  residencial: {
    typologies: [
      { id: 'cocina', label: 'Cocina', unit: 'ml', rate: 520, min: 1, max: 20, initial: 4, baseDays: 15 },
      { id: 'placard', label: 'Placard o vestidor', unit: 'ml', rate: 380, min: 1, max: 15, initial: 3, baseDays: 12 },
      { id: 'living', label: 'Mueble de living / TV', unit: 'ml', rate: 300, min: 1, max: 10, initial: 2, baseDays: 10 },
      { id: 'bano', label: 'Vanitory de baño', unit: 'ml', rate: 340, min: 1, max: 5, initial: 1, baseDays: 8 },
    ],
    finishes: [
      { id: 'estandar', label: 'Melamina clásica', detail: 'Placa 18 mm, canto ABS 2 mm', factor: 1 },
      { id: 'texturada', label: 'Melamina texturada', detail: 'Veta sincronizada o soft touch', factor: 1.25 },
      { id: 'mixta', label: 'Melamina + frentes laqueados', detail: 'Frentes lisos laqueados mate', factor: 1.5 },
    ],
    extras: [
      { id: 'herrajes', label: 'Herrajes con cierre suave', pct: 0.08 },
      { id: 'led', label: 'Iluminación LED', pct: 0.05 },
      { id: 'mesada', label: 'Mesada de piedra o cuarzo', pct: 0.22 },
    ],
  },
  comercial: {
    typologies: [
      { id: 'isla', label: 'Isla o stand de shopping', unit: 'm2', rate: 420, min: 4, max: 60, initial: 12, baseDays: 18 },
      { id: 'local', label: 'Local comercial', unit: 'm2', rate: 300, min: 10, max: 300, initial: 40, baseDays: 20 },
      { id: 'mostrador', label: 'Mostrador o recepción', unit: 'ml', rate: 650, min: 1, max: 15, initial: 3, baseDays: 12 },
      { id: 'oficina', label: 'Oficina', unit: 'm2', rate: 220, min: 10, max: 400, initial: 50, baseDays: 18 },
    ],
    finishes: [
      { id: 'estandar', label: 'Melamina alto tránsito', detail: 'Placa 18 mm, canto ABS 2 mm', factor: 1 },
      { id: 'texturada', label: 'Melamina premium', detail: 'Texturas y colores de diseño', factor: 1.25 },
      { id: 'mixta', label: 'Melamina + metal y vidrio', detail: 'Perfilería, vidrio templado', factor: 1.55 },
    ],
    extras: [
      { id: 'led', label: 'Iluminación LED', pct: 0.06 },
      { id: 'cerraduras', label: 'Cerraduras y seguridad', pct: 0.05 },
      { id: 'nocturno', label: 'Montaje nocturno', pct: 0.08 },
    ],
  },
};

export const UNIT_LABEL: Record<Unit, string> = { ml: 'metros lineales', m2: 'm²' };
export const UNIT_SHORT: Record<Unit, string> = { ml: 'm', m2: 'm²' };
