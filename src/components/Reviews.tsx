import { Star, MessageSquareQuote } from 'lucide-react';
import { useMode } from '../context/mode';
import { REVIEWS } from '../data/reviews';
import { SITE } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';
import { SectionHeader } from './ui/SectionHeader';
import { RevealGroup, RevealItem } from './ui/Reveal';

/** Reseñas de clientes. Si todavía no hay reseñas cargadas, muestra una invitación. */
export function Reviews() {
  const { mode } = useMode();
  const list = REVIEWS.filter((r) => r.segment === mode);
  const shown = list.length ? list : REVIEWS;

  if (!REVIEWS.length) {
    return (
      <section aria-label="Reseñas" className="border-b border-line py-10 md:py-14">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-4">
            <MessageSquareQuote className="h-7 w-7 shrink-0 text-accent-ink" aria-hidden="true" />
            <p className="text-lg">¿Ya trabajaste con Chape? Tu opinión ayuda a otros clientes a decidir.</p>
          </div>
          <a
            href={SITE.googleReviewUrl || whatsappUrl('Hola Chape, quiero dejarles una reseña sobre mi mueble.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Dejar una reseña
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="resenas" aria-labelledby="resenas-title" className="border-b border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHeader id="resenas-title" eyebrow="Reseñas" title="Lo que dicen nuestros clientes" />
        <RevealGroup as="ul" stagger={0.1} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {shown.slice(0, 6).map((r) => (
            <RevealItem as="li" key={r.name + r.project} className="canto lift flex flex-col gap-3 rounded-md border border-line bg-surface p-4 md:gap-4 md:p-6">
              <div className="flex gap-0.5 text-corte" aria-label={`${r.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < r.rating ? 'currentColor' : 'none'} aria-hidden="true" />
                ))}
              </div>
              <blockquote className="leading-relaxed">“{r.text}”</blockquote>
              <p className="mt-auto font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                {r.name} · {r.project}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
