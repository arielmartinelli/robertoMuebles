import { useEffect, useMemo, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { useMode, type Mode } from '../context/mode';
import { CONTENT } from '../content/modes';
import { PROJECTS_DATA } from '../data/projectsData';
import type { Project, ProjectType } from '../types';
import { SectionHeader } from './ui/SectionHeader';
import { Swap } from './ui/Swap';
import { RevealGroup, RevealItem } from './ui/Reveal';
import { openWhatsApp } from '../lib/whatsapp';

const FILTERS: Record<Mode, { key: 'todos' | ProjectType; label: string }[]> = {
  residencial: [
    { key: 'todos', label: 'Todos' },
    { key: 'cocina', label: 'Cocinas' },
    { key: 'placard', label: 'Placares y vestidores' },
    { key: 'living', label: 'Living' },
  ],
  comercial: [
    { key: 'todos', label: 'Todos' },
    { key: 'isla', label: 'Islas de shopping' },
    { key: 'local', label: 'Locales' },
    { key: 'mostrador', label: 'Mostradores' },
  ],
};

const TYPE_LABEL: Record<ProjectType, string> = {
  cocina: 'Cocina',
  placard: 'Placard / guardado',
  living: 'Living',
  isla: 'Isla de shopping',
  local: 'Local comercial',
  mostrador: 'Mostrador',
};

export function Portfolio() {
  const { mode } = useMode();
  // La clave reinicia filtros y ficha abierta al cambiar de modo.
  return <PortfolioView key={mode} mode={mode} />;
}

function PortfolioView({ mode }: { mode: Mode }) {
  const [filter, setFilter] = useState<'todos' | ProjectType>('todos');
  const [selected, setSelected] = useState<Project | null>(null);

  const projects = useMemo(
    () => PROJECTS_DATA.filter((p) => p.segment === mode && (filter === 'todos' || p.type === filter)),
    [mode, filter],
  );

  const c = CONTENT[mode].projects;

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="border-b border-line bg-surface-2/40 py-14 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <Swap id={`proj-head-${mode}`}>
          <SectionHeader
            id="proyectos-title"
            eyebrow={`Proyectos realizados · ${CONTENT[mode].label}`}
            title={c.title}
            intro={c.intro}
          />
        </Swap>

        <div role="group" aria-label="Filtrar proyectos" className="-mx-5 mb-6 flex gap-2 md:mb-8 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {FILTERS[mode].map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-colors ${
                filter === f.key ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Swap id={`proj-${mode}-${filter}`}>
          {projects.length === 0 ? (
            <p className="rounded-md border border-dashed border-line p-10 text-center text-muted">Pronto vamos a sumar proyectos en esta categoría.</p>
          ) : (
            <RevealGroup as="ul" stagger={0.1} className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
              {projects.map((p) => (
                <RevealItem as="li" key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="canto lift group flex h-full w-full flex-col overflow-hidden rounded-md border border-line bg-surface text-left"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-surface-2 sm:aspect-[4/3]">
                      <img
                        src={p.image.replace('w=1200', 'w=800')}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span className="absolute left-2 top-2 rounded bg-grafito/85 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-placa sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem]">
                        {TYPE_LABEL[p.type]}
                      </span>
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-between bg-corte px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-grafito transition-transform duration-300 group-hover:translate-y-0 md:flex">
                        Ver ficha técnica <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-5">
                      <span className="line-clamp-1 font-mono text-[0.6rem] uppercase tracking-[0.06em] text-muted sm:text-[0.7rem]">{p.location}</span>
                      <span className="font-display text-[0.78rem] uppercase leading-snug sm:text-[1.02rem]">{p.title}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent-ink sm:pt-3 sm:text-[0.72rem] md:hidden">
                        Ver ficha <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Swap>
      </div>

      {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  const specs = [
    ['Medidas', project.specs.dimensions],
    ['Terminación', project.specs.finish],
    ['Herrajes', project.specs.hardware],
    ['Plazos', project.specs.timeframe],
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-line bg-bg text-ink sm:rounded-lg"
      >
        <div className="relative aspect-[16/8] shrink-0 bg-surface-2">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-grafito/85 text-placa"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-6 md:p-8">
          <p className="eyebrow text-accent-ink">{TYPE_LABEL[project.type]} · {project.location}</p>
          <h3 id="dlg-title" className="font-display mt-2 text-2xl uppercase leading-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.client}</p>
          <p className="mt-5 leading-relaxed">{project.description}</p>

          <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-bg p-4">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">{k}</dt>
                <dd className="mt-1 text-[0.95rem]">{v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Materiales">
            {project.materials.map((m) => (
              <li key={m} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{m}</li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => openWhatsApp(`Hola Chape, vi el proyecto "${project.title}" en la web y quiero algo similar.`)}
            className="btn btn-primary mt-7 w-full sm:w-auto"
          >
            Quiero algo similar
          </button>
        </div>
      </div>
    </div>
  );
}
