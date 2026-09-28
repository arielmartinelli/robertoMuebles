import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ChapeLogo } from './brand/ChapeLogo';
import { ModeSwitch } from './ModeSwitch';
import { REVIEWS } from '../data/reviews';

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#presupuesto', label: 'Presupuesto' },
  ...(REVIEWS.length ? [{ href: '#resenas', label: 'Reseñas' }] : []),
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/92 backdrop-blur-md' : 'border-transparent bg-bg/0'
      }`}
    >
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-corte focus:px-3 focus:py-2 focus:text-grafito">
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-4 px-5 md:px-10">
        <a href="#inicio" aria-label="Chape, ir al inicio" className="shrink-0">
          <span className="hidden sm:block"><ChapeLogo /></span>
          <span className="sm:hidden"><ChapeLogo compact /></span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded px-3 py-2 text-[0.92rem] text-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block"><ModeSwitch /></div>
          <a href="#presupuesto" className="btn btn-primary hidden xl:inline-flex">
            Pedir presupuesto
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid h-11 w-11 place-items-center rounded border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-movil" className="border-t border-line bg-bg px-5 pb-6 pt-4 lg:hidden">
          <div className="mb-5 md:hidden"><ModeSwitch className="w-full" /></div>
          <nav aria-label="Menú móvil" className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-lg text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#presupuesto" onClick={() => setOpen(false)} className="btn btn-primary mt-5 w-full">
            Pedir presupuesto
          </a>
        </div>
      )}
    </header>
  );
}
