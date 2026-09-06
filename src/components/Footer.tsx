export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-outline-variant bg-white py-16" id="contacto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-outline-variant">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-7 w-7 bg-primary text-white flex items-center justify-center font-mono font-bold text-xs rounded-sm">
                RM
              </div>
              <span className="font-bold text-sm tracking-[0.16em] uppercase text-primary">
                ROBERTO MUEBLES
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed mb-4">
              Ebanistería y carpintería arquitectónica especializada en centros comerciales, islas 360° y arquitectura de autor en Córdoba.
            </p>
            <span className="inline-block font-mono text-[11px] text-accent-wood">
              Tolerancia ±0.5 mm • Montajes nocturnos homologados
            </span>
          </div>

          {/* Location Col */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant block mb-3">
              Taller &amp; Oficina Técnica
            </span>
            <p className="text-sm text-primary leading-relaxed mb-2 font-mono">
              Av. Monseñor Pablo Cabrera 3850<br />
              X5008 Córdoba Capital, Argentina<br />
              <span className="text-xs text-on-surface-variant">(A 5 min de Dino Mall Rodríguez del Busto)</span>
            </p>
            <span className="font-mono text-[11px] text-on-surface-variant">
              31.3789° S, 64.2014° W
            </span>
          </div>

          {/* Direct Contact Col */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant block mb-3">
              Contacto Directo
            </span>
            <p className="text-sm text-primary mb-1 font-mono">
              <a className="hover:text-accent-wood transition-colors" href="mailto:presupuestos@robertomuebles.com.ar">
                presupuestos@robertomuebles.com.ar
              </a>
            </p>
            <p className="text-sm text-primary mb-3 font-mono">
              <a className="hover:text-accent-wood transition-colors" href="tel:+5493514567890">
                +54 9 351 456-7890
              </a>
            </p>
            <a
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-wood font-medium hover:underline"
              href="https://wa.me/5493510000000"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>WhatsApp directo con Jefe de Taller</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal / Navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-on-surface-variant gap-4">
          <p>© {new Date().getFullYear()} Roberto Muebles • Mobiliario a Medida Córdoba.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-primary transition-colors" href="#obras">
              Pliego Técnico
            </a>
            <a className="hover:text-primary transition-colors" href="#diferenciales">
              Normas de Shopping
            </a>
            <a className="hover:text-primary transition-colors" href="#cotizador">
              Cotizador en Vivo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
