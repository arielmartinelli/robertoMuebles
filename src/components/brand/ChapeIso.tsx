import { useEffect, useMemo, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { cajonFaces } from '../../lib/iso';

const TONE: Record<string, string> = {
  t: 'var(--iso-t)',
  l: 'var(--iso-l)',
  r: 'var(--iso-r)',
  a1: 'var(--iso-a1)',
  a2: 'var(--iso-a2)',
  a3: 'var(--iso-a3)',
};

type Props = {
  size?: number | string;
  className?: string;
  /** Si es true, el cajón se abre con animación al montar y cuando cambia `replayKey`. */
  animated?: boolean;
  replayKey?: string;
  title?: string;
};

/** Isotipo de Chape: tres módulos con el cajón central abierto. */
export function ChapeIso({ size = 40, className, animated = false, replayKey, title }: Props) {
  const reduce = useReducedMotion();
  const still = !animated || !!reduce;
  const [progress, setProgress] = useState(still ? 1 : 0);

  useEffect(() => {
    if (still) return;
    // Cerrado un instante y luego el cajón se abre (keyframes: 0 → 0 → 1).
    const controls = animate(0, [0, 0, 1], {
      duration: 1.15,
      times: [0, 0.22, 1],
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [still, replayKey]);

  const open = still ? 1 : progress;
  const faces = useMemo(() => cajonFaces(open), [open]);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {faces.map((f, i) => (
        <path key={i} d={f.d} fill={TONE[f.tone]} style={{ transition: 'fill .45s ease' }} />
      ))}
    </svg>
  );
}
