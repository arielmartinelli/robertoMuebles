import { ChapeIso } from './ChapeIso';

type Props = { compact?: boolean; className?: string };

/** Logo completo: isotipo + CHAPE + bajada. */
export function ChapeLogo({ compact = false, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <ChapeIso size={compact ? 30 : 38} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.25rem] tracking-[0.06em] text-ink">CHAPE</span>
        {!compact && (
          <span className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
            Diseño + Fabricación
          </span>
        )}
      </span>
    </span>
  );
}
