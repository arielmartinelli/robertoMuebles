import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ModeContext, isMode, type Mode } from './mode';

const KEY = 'chape-modo';

function initialMode(): Mode {
  if (typeof window === 'undefined') return 'residencial';
  const fromUrl = new URLSearchParams(window.location.search).get('modo');
  if (isMode(fromUrl)) return fromUrl;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (isMode(saved)) return saved;
  } catch {
    /* almacenamiento no disponible */
  }
  return 'residencial';
}

/** Guarda el modo (Residencial / Comercial), lo refleja en <html data-mode> y en la URL (?modo=). */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(initialMode);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try {
      window.localStorage.setItem(KEY, mode);
    } catch {
      /* ignorar */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('modo', mode);
    window.history.replaceState(null, '', url);
  }, [mode]);

  const setMode = useCallback((m: Mode) => setModeState(m), []);
  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}
