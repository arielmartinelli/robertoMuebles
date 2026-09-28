import { SITE } from '../config/site';
import { ChapeLogo } from './brand/ChapeLogo';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <ChapeLogo />
          <p className="mt-4 max-w-sm text-sm text-muted">
            Estudio-taller de muebles a medida en melamina. Diseñamos y fabricamos para casas y comercios en {SITE.city}.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm md:items-end">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg> Instagram
          </a>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">
            © {new Date().getFullYear()} Chape · Diseño + Fabricación
          </p>
        </div>
      </div>
    </footer>
  );
}
