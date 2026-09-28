import { createContext, useContext } from 'react';

export type Mode = 'residencial' | 'comercial';
export const MODES: Mode[] = ['residencial', 'comercial'];
export const isMode = (v: unknown): v is Mode => v === 'residencial' || v === 'comercial';

export type ModeCtx = { mode: Mode; setMode: (m: Mode) => void };
export const ModeContext = createContext<ModeCtx | null>(null);

export function useMode(): ModeCtx {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode debe usarse dentro de <ModeProvider>');
  return ctx;
}
