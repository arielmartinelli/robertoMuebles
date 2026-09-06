import { useEffect, useState } from 'react';
import { Interactive3DViewer } from './Interactive3DViewer';

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  prefix = '',
  suffix = '',
  duration = 1600
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Text content (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between text-left">
          <div>
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-primary tracking-tight leading-[1.08] mb-6">
              Mobiliario comercial, islas de shopping &amp; arquitectura a medida.
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-on-surface-variant font-normal leading-relaxed max-w-xl mb-8">
              Diseño, mecanizado CNC y montaje nocturno para centros comerciales y proyectos de autor. Soluciones de alto tránsito homologadas para <strong className="text-primary font-semibold">Dinosaurio Mall</strong> y grandes franquicias como <strong className="text-primary font-semibold">Jacinto Café</strong>.
            </p>

            {/* Action Buttons with hover states */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary text-xs uppercase font-mono tracking-widest px-7 py-3.5 rounded hover:bg-neutral-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs"
                href="#cotizador"
              >
                <span>Cotizar Proyecto</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>

              <a
                className="inline-flex items-center justify-center border border-outline-variant bg-white text-xs uppercase font-mono tracking-widest px-6 py-3.5 rounded hover:border-primary hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all text-primary"
                href="#obras"
              >
                Ver Obras Realizadas
              </a>
            </div>
          </div>
        </div>

        {/* 3D Shopping Mall Island Showcase (6 Cols) */}
        <div className="lg:col-span-6">
          <Interactive3DViewer initialFinish="paraiso_grafito" />
        </div>
      </div>

      {/* 4 Minimal Metric Cards with Animated Counters & Hover Effects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant border border-outline-variant rounded-lg overflow-hidden mt-14 text-center">
        {/* 01: Trabajos */}
        <div className="bg-[#faf9f6] p-6 flex flex-col items-center justify-center hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300 group cursor-default">
          <span className="font-mono text-[11px] text-accent-wood tracking-widest uppercase mb-1 font-semibold group-hover:text-primary transition-colors">
            Trabajos
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            <AnimatedCounter target={280} prefix="+" duration={1800} />
          </span>
          <span className="text-[11px] font-mono text-on-surface-variant mt-1">
            Obras entregadas
          </span>
        </div>

        {/* 02: Experiencia */}
        <div className="bg-[#faf9f6] p-6 flex flex-col items-center justify-center hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300 group cursor-default">
          <span className="font-mono text-[11px] text-accent-wood tracking-widest uppercase mb-1 font-semibold group-hover:text-primary transition-colors">
            Experiencia
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            <AnimatedCounter target={15} prefix="+" suffix=" años" duration={1500} />
          </span>
          <span className="text-[11px] font-mono text-on-surface-variant mt-1">
            Oficio &amp; taller propio
          </span>
        </div>

        {/* 03: Reputación */}
        <div className="bg-[#faf9f6] p-6 flex flex-col items-center justify-center hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300 group cursor-default">
          <span className="font-mono text-[11px] text-accent-wood tracking-widest uppercase mb-1 font-semibold group-hover:text-primary transition-colors">
            Reputación
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            <AnimatedCounter target={100} suffix="%" duration={1600} />
          </span>
          <span className="text-[11px] font-mono text-on-surface-variant mt-1">
            Shoppings aprobados
          </span>
        </div>

        {/* 04: Garantía */}
        <div className="bg-[#faf9f6] p-6 flex flex-col items-center justify-center hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300 group cursor-default">
          <span className="font-mono text-[11px] text-accent-wood tracking-widest uppercase mb-1 font-semibold group-hover:text-primary transition-colors">
            Garantía
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            <AnimatedCounter target={5} suffix=" años" duration={1400} />
          </span>
          <span className="text-[11px] font-mono text-on-surface-variant mt-1">
            Estructural &amp; herrajes
          </span>
        </div>
      </div>
    </section>
  );
};
