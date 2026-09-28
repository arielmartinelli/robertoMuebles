import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMode } from '../context/mode';
import { CONTENT } from '../content/modes';
import { ChapeIso3D } from './brand/ChapeIso3D';
import { ModeSwitch } from './ModeSwitch';
import { Swap } from './ui/Swap';
import { RevealGroup, RevealItem } from './ui/Reveal';
import { StatValue } from './ui/StatValue';

export function Hero() {
  const { mode } = useMode();
  const c = CONTENT[mode];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useDesktop();
  const still = reduce || !desktop;

  // Parallax suave del isotipo mientras se hace scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const isoY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 90]);
  
  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title" className="plan-grid relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-10 pt-24 md:px-10 md:pt-36 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-20">
        <div>
          <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-3 text-muted">¿Qué querés equipar?</p>
            <ModeSwitch size="lg" className="w-full sm:w-auto" />
          </m.div>

          <Swap id={`hero-${mode}`} className="mt-8 md:mt-9">
            <p className="eyebrow text-accent-ink">{c.hero.eyebrow}</p>
            <h1 id="hero-title" className="font-display mt-3 text-[clamp(1.85rem,4.1vw,3.6rem)] leading-[1.02] uppercase md:mt-4">
              {c.hero.title}{' '}
              <span className="underline decoration-corte decoration-[0.14em] underline-offset-[0.12em] [text-decoration-skip-ink:none]">
                {c.hero.highlight}
              </span>
            </h1>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-muted md:mt-6 md:text-lg">{c.hero.text}</p>
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 md:mt-8">
              <a href="#presupuesto" className="btn btn-primary px-3 text-[0.7rem] sm:px-[1.4rem] sm:text-[0.78rem]">
                {c.hero.primary}
                <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
              </a>
              <a href="#proyectos" className="btn btn-ghost px-3 text-[0.7rem] sm:px-[1.4rem] sm:text-[0.78rem]">
                {c.hero.secondary}
              </a>
            </div>
          </Swap>
        </div>

        {/* Isotipo protagonista: el cajón se abre al cargar y al cambiar de modo */}
        <m.div
          style={{ y: isoY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mx-2 w-[calc(100%+1rem)] sm:mx-auto sm:w-full sm:max-w-[420px] lg:max-w-[480px]"
        >
          {/* Isotipo 3D: se gira arrastrando, el hover resalta cada módulo y el click guarda o saca el cajón. */}
          <ChapeIso3D replayKey={mode} />
        </m.div>
      </div>

      {/* Datos clave con efecto creciente */}
      <div className="border-t border-line">
        <RevealGroup key={mode} as="dl" stagger={0.12} className="mx-auto grid max-w-[1320px] grid-cols-2 md:grid-cols-4">
          {c.stats.map((s, i) => (
            <RevealItem
              key={s.label}
              className={`group relative flex flex-col gap-1 px-5 py-5 md:px-10 md:py-7 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
            >
              <dt className="order-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted md:text-[0.72rem]">{s.label}</dt>
              <dd className="font-display order-1 text-[1.35rem] uppercase sm:text-2xl md:text-3xl">
                <StatValue value={s.value} />
              </dd>
              <span aria-hidden="true" className="absolute bottom-0 left-5 right-5 h-[3px] origin-left scale-x-0 bg-corte transition-transform duration-500 group-hover:scale-x-100 md:left-10 md:right-10" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {c.trust && (
        <div className="border-t border-line">
          <RevealGroup className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-5 md:px-10" stagger={0.08}>
            <RevealItem kind="fade"><span className="eyebrow text-accent-ink">{c.trust.label}</span></RevealItem>
            {c.trust.items.map((t) => (
              <RevealItem key={t} kind="fade">
                <span className="font-display text-xs uppercase tracking-[0.06em] text-muted sm:text-sm">{t}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}
    </section>
  );
}

/** true en pantallas de escritorio (el parallax solo se usa ahí). */
function useDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desktop;
}
