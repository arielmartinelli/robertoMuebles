import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion, m } from 'framer-motion';

/**
 * Dato destacado con efecto creciente:
 * - si tiene número ("+15 años", "+280"), cuenta desde 0 al entrar en pantalla;
 * - si es texto ("Taller", "Nocturno"), las letras suben una por una como bloques.
 */
export function StatValue({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const isNumber = !!match;

  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!isNumber || !inView || reduce) return;
    const controls = animate(0, target, {
      duration: target > 50 ? 1.8 : 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, isNumber]);

  if (match) {
    const [, prefix, , suffix] = match;
    return (
      <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`} aria-label={value}>
        <span aria-hidden="true">
          {prefix}
          {reduce || !inView ? (reduce ? target : 0) : n}
          {suffix}
        </span>
      </span>
    );
  }

  // Texto: letras que suben escalonadas, como módulos apilándose.
  return (
    <span ref={ref} className={`inline-flex overflow-hidden ${className}`} aria-label={value}>
      {value.split('').map((ch, i) => (
        <m.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={reduce ? false : { y: '110%' }}
          animate={inView || reduce ? { y: '0%' } : undefined}
          transition={{ delay: 0.05 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === ' ' ? ' ' : ch}
        </m.span>
      ))}
    </span>
  );
}
