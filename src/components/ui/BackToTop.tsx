import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ChapeIso } from '../brand/ChapeIso';

/**
 * Botón "Volver arriba" con el isotipo de Chape.
 * Aparece después de bajar un poco; un anillo amarillo muestra el avance de la página
 * y al pasar el mouse el cajón del isotipo se abre.
 */
export function BackToTop() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const { scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          onClick={toTop}
          onPointerEnter={() => setHoverKey((k) => k + 1)}
          aria-label="Volver arriba"
          title="Volver arriba"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.25rem)] right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-line bg-surface shadow-lg transition-colors hover:border-corte"
        >
          {/* Anillo de progreso de lectura */}
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <m.circle cx="28" cy="28" r="26" fill="none" stroke="var(--corte)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: ring }} />
          </svg>
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
            <ChapeIso size={26} animated={hoverKey > 0} replayKey={String(hoverKey)} />
          </span>
          {/* Flechita que aparece arriba del isotipo al pasar el mouse */}
          <span aria-hidden="true" className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-b-[6px] border-x-transparent border-b-corte opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
