import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { useMode } from '../../context/mode';
import { ChapeIso } from '../brand/ChapeIso';

const DURATION = 1100; // ms, debe coincidir con las animaciones .mode-wipe* de index.css

/**
 * Transición al cambiar entre Residencial y Comercial.
 * Una placa del color del nuevo modo entra desde la izquierda con un canto amarillo,
 * muestra el isotipo y el nombre del modo, y sale por la derecha dejando ver la página ya cambiada.
 * Se dibuja en un portal (fuera de la página) y siempre se retira sola.
 */
export function ModeTransition() {
  const { mode } = useMode();
  const reduce = useReducedMotion();
  const [prev, setPrev] = useState(mode);
  const [run, setRun] = useState<null | { mode: string; id: number }>(null);

  // Detecta el cambio de modo durante el render (sin efectos en cascada).
  if (mode !== prev) {
    setPrev(mode);
    if (!reduce) setRun({ mode, id: (run?.id ?? 0) + 1 });
  }

  // Seguro: la placa se quita siempre al terminar, aunque el navegador no avise el fin de la animación.
  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(() => setRun(null), DURATION + 80);
    return () => window.clearTimeout(t);
  }, [run]);

  if (!run || typeof document === 'undefined') return null;

  const res = run.mode === 'residencial';
  return createPortal(
    <div key={run.id} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {/* Placa principal del color del nuevo modo */}
      <div className="mode-wipe-panel absolute inset-0 grid place-items-center bg-bg">
        <div className="mode-wipe-content flex flex-col items-center gap-4 px-6 text-center">
          <ChapeIso size={84} animated replayKey={String(run.id)} />
          <span className="font-display text-[clamp(1.8rem,6vw,3.4rem)] uppercase leading-none tracking-[0.04em] text-ink">
            {res ? 'Residencial' : 'Comercial'}
          </span>
          <span className="mode-wipe-line block h-[3px] w-24 origin-left bg-corte" />
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
            {res ? 'Muebles a medida para tu casa' : 'Equipamiento para tu comercio'}
          </span>
        </div>
        {/* Cantos amarillos en los bordes de la placa */}
        <span className="absolute inset-y-0 -right-2 w-2 bg-corte" />
        <span className="absolute inset-y-0 -left-2 w-2 bg-corte" />
      </div>
    </div>,
    document.body,
  );
}
