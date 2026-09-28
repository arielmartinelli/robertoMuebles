import { useRef, type KeyboardEvent } from 'react';
import { Home, Store } from 'lucide-react';
import { MODES, useMode, type Mode } from '../context/mode';

const META: Record<Mode, { label: string; Icon: typeof Home }> = {
  residencial: { label: 'Residencial', Icon: Home },
  comercial: { label: 'Comercial', Icon: Store },
};

type Props = { size?: 'sm' | 'lg'; className?: string };

/** Switch Residencial / Comercial: cambia contenidos, proyectos, presupuestador y colores del sitio. */
export function ModeSwitch({ size = 'sm', className = '' }: Props) {
  const { mode, setMode } = useMode();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const index = MODES.indexOf(mode);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const next = MODES[(index + 1) % MODES.length];
    setMode(next);
    refs.current[MODES.indexOf(next)]?.focus();
  };

  const lg = size === 'lg';

  return (
    <div
      role="radiogroup"
      aria-label="Tipo de proyecto"
      onKeyDown={onKey}
      className={`relative inline-grid grid-cols-2 rounded-full border border-line bg-surface p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-corte transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {MODES.map((m, i) => {
        const { label, Icon } = META[m];
        const active = m === mode;
        return (
          <button
            key={m}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setMode(m)}
            className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-full font-mono uppercase tracking-[0.1em] transition-colors duration-300 ${
              lg ? 'min-h-12 px-6 text-[0.8rem]' : 'min-h-9 px-3.5 text-[0.68rem]'
            } ${active ? 'text-grafito' : 'text-muted hover:text-ink'}`}
          >
            <Icon className={lg ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
