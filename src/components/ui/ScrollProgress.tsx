import { m, useScroll, useSpring } from 'framer-motion';

/** Barra fina amarilla arriba de todo que muestra cuánto de la página se leyó. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-corte shadow-[0_0_10px_rgba(242,183,5,0.6)]"
      style={{ scaleX }}
    />
  );
}
