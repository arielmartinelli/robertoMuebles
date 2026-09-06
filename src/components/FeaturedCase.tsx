import { useState } from 'react';

export const FeaturedCase: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<'busto' | 'alto-verde'>('busto');

  const branches = {
    busto: {
      tag: 'DINO MALL — SEDE RODRÍGUEZ DEL BUSTO',
      typology: 'BARRA & MOSTRADOR DE ATENCIÓN',
      title: 'Mostrador principal curvilíneo & barra barista',
      description: 'Ingeniería y montaje para alto tránsito (más de 800 pedidos diarios). Estructura antitorsión revestida en varillado petiribí macizo, mesada en granito negro profundo antiderrame e iluminación LED rasante con fuentes disimuladas.',
      specs: [
        { label: 'Enchapado', value: 'Petiribí Macizo' },
        { label: 'Montaje Mall', value: '2 Turnos Noche' },
        { label: 'Certificación', value: 'Laca B-s1 Ignífuga' },
      ],
      testimonial: {
        quote: 'Roberto Muebles interpretó con rigor milimétrico las exigencias del pliego técnico de Dinosaurio Mall. La barra soporta uso comercial continuo sin desgaste.',
        author: 'Gerencia Operativa • Jacinto Café & Restó',
        referencePhone: '+54 351 472-8800'
      },
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop'
    },
    'alto-verde': {
      tag: 'DINO MALL — SEDE ALTO VERDE (PASILLO CENTRAL)',
      typology: 'ISLA COMERCIAL 360° SHOPPING',
      title: 'Isla comercial 360° con vitrinas templadas',
      description: 'Kiosco comercial autoportante para pasillo de shopping. Respeta la cota visual máxima de 1.20m reglamentada por la intendencia de Dino Mall. Vitrinas con cristal templado de 10mm y zócalo perimetral en acero inoxidable AISI 304 antichoques.',
      specs: [
        { label: 'Estructura', value: 'Nogal & Acero 304' },
        { label: 'Instalación', value: '72h Turno Noche' },
        { label: 'Seguridad', value: 'Cristal 10mm Templado' },
      ],
      testimonial: {
        quote: 'En pasillos de shopping no hay margen de error. El plano aprobado por intendencia coincidió exactamente con la realidad y abrimos en fecha sin observaciones.',
        author: 'Responsable de Expansión • Jacinto',
        referencePhone: '+54 351 526-1500'
      },
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop'
    }
  };

  const current = branches[selectedBranch];

  return (
    <section id="casos-shoppings" className="border-t border-outline-variant bg-[#faf9f6] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs text-accent-wood uppercase tracking-widest">
              Caso de Éxito Homologado
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
              Dinosaurio Mall &amp; Jacinto Café
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedBranch('busto')}
              className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all border ${
                selectedBranch === 'busto'
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-on-surface border-outline-variant hover:border-primary/40'
              }`}
            >
              Sede R. del Busto
            </button>
            <button
              onClick={() => setSelectedBranch('alto-verde')}
              className={`px-4 py-2 rounded text-xs font-mono tracking-wider uppercase transition-all border ${
                selectedBranch === 'alto-verde'
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-on-surface border-outline-variant hover:border-primary/40'
              }`}
            >
              Sede Alto Verde (Isla 360°)
            </button>
          </div>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs">
          {/* Image (6 Cols) */}
          <div className="lg:col-span-6 relative overflow-hidden min-h-[360px] lg:min-h-[460px]">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded">
              {current.tag}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded border border-outline-variant flex items-center justify-between text-xs font-mono">
              <span className="text-primary font-semibold">{current.typology}</span>
              <span className="text-accent-wood">Homologación Mall</span>
            </div>
          </div>

          {/* Technical and Narrative Content (6 Cols) */}
          <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between text-left space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant mb-2">
                <span>CÓRDOBA CAPITAL</span>
                <span className="text-accent-wood font-semibold">RETAIL GASTRONÓMICO</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-4">
                {current.title}
              </h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Specs 3 columns */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-outline-variant font-mono text-xs">
                {current.specs.map((item, idx) => (
                  <div key={idx}>
                    <strong className="block text-primary text-sm font-semibold">{item.value}</strong>
                    <span className="text-on-surface-variant text-[11px]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote Minimal */}
            <div className="p-5 rounded-lg bg-surface-container border border-outline-variant text-left space-y-2">
              <p className="text-xs italic text-on-surface-variant leading-relaxed">
                "{current.testimonial.quote}"
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="text-primary font-semibold">{current.testimonial.author}</span>
                <a
                  href={`tel:${current.testimonial.referencePhone}`}
                  className="text-accent-wood hover:underline"
                >
                  Verificar: {current.testimonial.referencePhone}
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#cotizador"
                className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary text-xs uppercase font-mono tracking-widest px-6 py-3 rounded hover:bg-neutral-800 transition-colors"
              >
                <span>Cotizar Proyecto Similar</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>

              <a
                href="https://wa.me/5493510000000?text=Hola%20Roberto%20Muebles,%20quiero%20cotizar%20un%20proyecto%20similar%20al%20de%20Jacinto%20en%20Dino%20Mall"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs font-mono text-on-surface-variant hover:text-primary transition-colors border border-outline-variant px-4 py-3 rounded bg-white"
              >
                WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
