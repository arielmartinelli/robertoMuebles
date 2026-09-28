import type { ReactNode } from 'react';
import { m, type Variants } from 'framer-motion';

/**
 * Animaciones de aparición al hacer scroll, pensadas como "módulos que se colocan":
 * cada bloque sube y se descubre de abajo hacia arriba, como una pieza que se encastra.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const block: Variants = {
  hidden: { opacity: 0, y: 36, clipPath: 'inset(0% 0% 100% 0%)' },
  show: (d: number = 0) => ({ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.75, ease: EASE, delay: d } }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: d } }),
};

type Kind = 'block' | 'fade';
const VARIANTS: Record<Kind, Variants> = { block, fade };

type Props = { children: ReactNode; className?: string; kind?: Kind; delay?: number; as?: 'div' | 'li' };

/**
 * Un bloque que aparece solo cuando entra en pantalla.
 * Se observa un contenedor externo sin recorte, así el recorte de la animación no impide detectarlo.
 */
export function Reveal({ children, className, kind = 'fade', delay = 0 }: Omit<Props, 'as'>) {
  return (
    <m.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: {} }}>
      <m.div className={className} variants={VARIANTS[kind]} custom={delay}>
        {children}
      </m.div>
    </m.div>
  );
}

/** Contenedor que hace aparecer a sus hijos uno detrás de otro (como módulos apilándose). */
export function RevealGroup({ children, className, stagger = 0.1, as = 'div' }: { children: ReactNode; className?: string; stagger?: number; as?: 'div' | 'ul' | 'ol' | 'dl' }) {
  const Comp = { div: m.div, ul: m.ul, ol: m.ol, dl: m.dl }[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

/** Hijo de RevealGroup. */
export function RevealItem({ children, className, kind = 'block', as = 'div' }: { children: ReactNode; className?: string; kind?: Kind; as?: 'div' | 'li' }) {
  const Comp = as === 'li' ? m.li : m.div;
  return (
    <Comp className={className} variants={VARIANTS[kind]}>
      {children}
    </Comp>
  );
}

/** Línea amarilla que se "mide" de izquierda a derecha, como una cinta métrica. */
export function MeasureLine({ className = '' }: { className?: string }) {
  return (
    <m.span
      aria-hidden="true"
      className={`block h-[3px] origin-left bg-corte ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
