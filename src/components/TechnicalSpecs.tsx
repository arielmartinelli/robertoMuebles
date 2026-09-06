export const TechnicalSpecs: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-t border-outline-variant bg-[#faf9f6]/75" id="diferenciales">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-left">
        <div className="max-w-xl mb-16">
          <span className="font-mono text-xs text-accent-wood uppercase tracking-widest">
            Ingeniería &amp; Taller • Córdoba
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
            Diferenciales técnicos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 01 Montaje Nocturno */}
          <div className="p-8 rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/50 group cursor-default">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[22px]">nightlight</span>
              </div>
              <span className="font-mono text-xs text-accent-wood font-semibold uppercase group-hover:text-primary transition-colors">
                01 / Shoppings
              </span>
              <h3 className="text-lg font-bold text-primary mt-2 mb-3 group-hover:text-accent-wood transition-colors">
                Montaje nocturno en malls
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Cuadrillas especializadas con seguros ART, cursos de seguridad e higiene y cumplimiento estricto del reglamento de Dino Mall y shoppings. Entrega limpia antes de la apertura al público.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant font-mono text-[11px] text-on-surface-variant">
              0 interrupción comercial
            </div>
          </div>

          {/* 02 Tecnología CNC */}
          <div className="p-8 rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/50 group cursor-default">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
              </div>
              <span className="font-mono text-xs text-accent-wood font-semibold uppercase group-hover:text-primary transition-colors">
                02 / Tecnología
              </span>
              <h3 className="text-lg font-bold text-primary mt-2 mb-3 group-hover:text-accent-wood transition-colors">
                Mecanizado CNC
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Corte computarizado y despiece digital CAD para encastres milimétricos, canalizaciones ocultas para cableado eléctrico y tolerancias mínimas de ±0.5 mm.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant font-mono text-[11px] text-on-surface-variant">
              Tolerancia ±0.5 mm
            </div>
          </div>

          {/* 03 Materialidad */}
          <div className="p-8 rounded-xl bg-white border border-outline-variant flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/50 group cursor-default">
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface-container group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[22px]">forest</span>
              </div>
              <span className="font-mono text-xs text-accent-wood font-semibold uppercase group-hover:text-primary transition-colors">
                03 / Materialidad
              </span>
              <h3 className="text-lg font-bold text-primary mt-2 mb-3 group-hover:text-accent-wood transition-colors">
                Materiales nobles &amp; ignífugos
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Maderas estacionadas de paraíso, roble y petiribí, zócalos de acero inoxidable AISI 304, herrajes alemanes Blum/Häfele y lacas poliuretánicas ignífugas B-s1 requeridas por bomberos.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant font-mono text-[11px] text-on-surface-variant">
              Certificación FSC &amp; Acabado B-s1
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
