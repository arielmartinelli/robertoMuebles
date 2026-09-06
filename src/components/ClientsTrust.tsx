interface ClientReference {
  company: string;
  category: string;
  projectNote: string;
  contactName: string;
  role: string;
  phone: string;
  email: string;
}

export const ClientsTrust: React.FC = () => {
  const references: ClientReference[] = [
    {
      company: 'Jacinto Café & Restó',
      category: 'GASTRONOMÍA DE ESPECIALIDAD',
      projectNote: 'Mostradores curvos, barras baristas e islas comerciales en Dinosaurio Mall (R. del Busto y Alto Verde).',
      contactName: 'Arq. Martín Benítez',
      role: 'Coordinador de Arquitectura Comercial',
      phone: '+54 351 472-8800',
      email: 'arquitectura@jacintocafe.com.ar'
    },
    {
      company: 'Dinosaurio Mall (Locatarios)',
      category: 'SHOPPING CENTER • CÓRDOBA',
      projectNote: 'Mobiliario homologado con pliego de intendencia: cota 1.20m, zócalos de acero y montajes nocturnos.',
      contactName: 'Depto. de Obras & Locatarios',
      role: 'Intendencia de Shopping Dino Mall',
      phone: '+54 351 526-1500',
      email: 'locatarios@dinomall.com.ar'
    },
    {
      company: 'iZone Technology & Retail',
      category: 'ISLAS COMERCIALES 360°',
      projectNote: 'Islas de exhibición tecnológica en Córdoba Shopping con vitrinas templadas y sistemas antirrobo.',
      contactName: 'Lic. Gonzalo Rossi',
      role: 'Gerente de Retail & Expansión',
      phone: '+54 351 688-4422',
      email: 'expansion@izonestore.com.ar'
    },
    {
      company: 'Sartori Concept Store',
      category: 'RETAIL INDUMENTARIA & BOUTIQUE',
      projectNote: 'Equipamiento en Paseo del Jockey: percheros empotrados en oro mate y mostradores monolíticos.',
      contactName: 'Paula Sartori',
      role: 'Directora Creativa',
      phone: '+54 351 310-9944',
      email: 'contacto@sartoriconcept.com'
    }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-outline-variant bg-[#faf9f6]/75" id="empresas">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="font-mono text-xs text-accent-wood uppercase tracking-widest">
              Acreditación Institucional • Contactos Directos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
              Empresas y referencias comprobables
            </h2>
          </div>
          <p className="text-sm font-mono text-on-surface-variant max-w-md">
            Información de contacto directa para verificar calidad y cumplimiento en plazos de obra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {references.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-xl bg-white border border-outline-variant flex flex-col justify-between space-y-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/50 group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-accent-wood font-semibold">{item.category}</span>
                  <span className="text-on-surface-variant uppercase">Referencia Activa</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.company}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {item.projectNote}
                </p>
              </div>

              {/* Contact Card Inside */}
              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant font-mono text-xs space-y-1.5">
                <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Responsable de Validación:
                </div>
                <div className="font-semibold text-primary text-sm">
                  {item.contactName} <span className="text-xs font-normal text-on-surface-variant">({item.role})</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                  <a href={`tel:${item.phone}`} className="text-primary hover:text-accent-wood">
                    Tel: {item.phone}
                  </a>
                  <span className="text-outline">•</span>
                  <a href={`mailto:${item.email}`} className="text-primary hover:text-accent-wood">
                    {item.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
