import { PencilRuler, Factory } from 'lucide-react';
import { useMode } from '../context/mode';
import { CONTENT } from '../content/modes';
import { SectionHeader } from './ui/SectionHeader';
import { Swap } from './ui/Swap';
import { RevealGroup, RevealItem } from './ui/Reveal';

const PILLARS = [
  { Icon: PencilRuler, title: 'Diseño', text: 'Medimos, dibujamos en 3D y elegimos con vos materiales, colores y herrajes. Ves el mueble antes de fabricarlo.' },
  { Icon: Factory, title: 'Fabricación', text: 'Cortamos, canteamos y armamos cada módulo en nuestro taller, con control de medidas en cada pieza.' },
];

export function About() {
  const { mode } = useMode();
  const p = CONTENT[mode].process;

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="border-b border-line py-14 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHeader
          id="nosotros-title"
          eyebrow="Nosotros · Estudio-taller"
          title={<>Diseñamos <span className="text-accent-ink">+</span> fabricamos</>}
          intro="Chape es un estudio-taller de Córdoba que trabaja con placas de melamina y en módulos. Hacemos las dos cosas: el diseño y la fabricación, sin intermediarios."
        />

        <RevealGroup className="grid grid-cols-2 gap-3 md:gap-4" stagger={0.15}>
          {PILLARS.map(({ Icon, title, text }) => (
            <RevealItem key={title} className="canto lift rounded-md border border-line bg-surface p-4 sm:p-7 md:p-9">
              <Icon className="h-5 w-5 text-accent-ink sm:h-6 sm:w-6" aria-hidden="true" />
              <h3 className="font-display mt-3 text-base uppercase sm:mt-5 sm:text-xl">{title}</h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted sm:text-base">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Swap id={`process-${mode}`} className="mt-12 md:mt-16">
          <h3 className="font-display text-[clamp(1.15rem,2.4vw,1.75rem)] uppercase">{p.title}</h3>
          <p className="mt-3 max-w-[64ch] text-[0.95rem] text-muted md:text-base">{p.intro}</p>
          <RevealGroup as="ol" stagger={0.12} className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line md:mt-8 lg:grid-cols-4">
            {p.steps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="canto group flex flex-col gap-2 bg-bg p-4 transition-colors duration-300 hover:bg-surface sm:gap-3 sm:p-6">
                <span className="font-display text-2xl text-cemento transition-colors duration-300 group-hover:text-accent-ink sm:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[0.85rem] uppercase sm:text-base">{s.title}</span>
                <span className="text-[0.82rem] leading-relaxed text-muted sm:text-[0.95rem]">{s.text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Swap>
      </div>
    </section>
  );
}
