import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-outline-variant">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <a className="flex items-center gap-3.5 group" href="#">
          <div className="h-9 w-9 bg-primary text-white flex items-center justify-center rounded-sm font-mono font-bold text-sm">
            RM
          </div>
          <div className="flex flex-col tracking-tight text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[15px] tracking-[0.16em] uppercase text-primary">
                ROBERTO MUEBLES
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.2 bg-surface-container border border-outline-variant text-accent-wood rounded">
                CÓRDOBA
              </span>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
              Mobiliario a Medida &amp; Arquitectura Comercial
            </span>
          </div>
        </a>

        {/* Desktop Navigation with refined hover */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-[13px] font-medium tracking-wide">
          <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-1.5 rounded transition-all duration-200" href="#obras">
            Obras
          </a>
          <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-1.5 rounded transition-all duration-200" href="#diferenciales">
            Capacidad Técnica
          </a>
          <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-1.5 rounded transition-all duration-200" href="#cotizador">
            Cotizador
          </a>
          <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-1.5 rounded transition-all duration-200" href="#empresas">
            Empresas &amp; Referencias
          </a>
          <a className="text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-1.5 rounded transition-all duration-200" href="#contacto">
            Contacto
          </a>
        </nav>

        {/* Action Button with hover */}
        <div className="flex items-center gap-4">
          <a
            className="hidden sm:inline-flex items-center justify-center text-[12px] uppercase font-mono tracking-[0.14em] bg-primary text-on-primary px-5 py-2.5 rounded hover:bg-neutral-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs"
            href="#cotizador"
          >
            Cotizar
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-primary hover:bg-surface-container border border-outline-variant"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-outline-variant px-6 py-5 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-primary hover:text-accent-wood"
              href="#obras"
            >
              Obras Realizadas
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-primary hover:text-accent-wood"
              href="#diferenciales"
            >
              Capacidad Técnica & CNC
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-primary hover:text-accent-wood"
              href="#empresas"
            >
              Empresas & Contactos
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-primary hover:text-accent-wood"
              href="#contacto"
            >
              Taller & Contacto
            </a>
          </nav>

          <div className="pt-3 border-t border-outline-variant">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center text-[12px] uppercase font-mono tracking-[0.14em] bg-primary text-on-primary py-3 rounded text-center shadow-xs"
              href="#cotizador"
            >
              Iniciar Cotización
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
