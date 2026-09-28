import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { MeasureLine } from './Reveal';

type Props = { eyebrow: string; title: ReactNode; intro?: ReactNode; id?: string; aside?: ReactNode };

const EASE = [0.22, 1, 0.36, 1] as const;

export function SectionHeader({ eyebrow, title, intro, id, aside }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <MeasureLine className="w-8" />
          <p className="eyebrow text-accent-ink">{eyebrow}</p>
        </div>
        <m.div className="overflow-hidden pb-1" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          <m.h2
            id={id}
            className="font-display mt-3 text-[clamp(1.6rem,3.6vw,2.75rem)] leading-[1.02] uppercase"
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}
          >
            {title}
          </m.h2>
        </m.div>
        {intro && (
          <m.p
            className="mt-3 max-w-[60ch] text-[0.98rem] leading-relaxed text-muted md:mt-4 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            {intro}
          </m.p>
        )}
      </div>
      {aside}
    </div>
  );
}
