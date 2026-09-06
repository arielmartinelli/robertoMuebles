import { useState } from 'react';
import type { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { X, Check } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'todos', label: 'Todas las Obras' },
    { key: 'islas', label: 'Islas de Shopping' },
    { key: 'comercial', label: 'Locales & Gastronomía' },
    { key: 'mostradores', label: 'Mostradores & Recepción' },
    { key: 'particular', label: 'Residencial / Autor' },
  ];

  const filteredProjects = activeCategory === 'todos'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section className="border-t border-outline-variant bg-surface-container-low/70 py-20 md:py-28" id="obras">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 text-left">
          <div>
            <span className="font-mono text-xs text-accent-wood uppercase tracking-widest">
              Portfolio Selecto • Millwork &amp; Retail
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mt-1">
              Obras destacadas
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded transition-all border ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Swiss Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-xl border border-outline-variant overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer shadow-xs"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-[300px] sm:h-[340px]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={project.image}
                  alt={project.title}
                />
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded">
                  {project.client}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-primary px-2.5 py-1 text-[10px] font-mono rounded border border-outline-variant">
                  {project.location}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant mb-2">
                    <span className="uppercase">{project.specs.finish.split(' ')[0]} • CÓRDOBA</span>
                    <span className="text-accent-wood font-semibold uppercase">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent-wood transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Specs 3 columns */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-outline-variant font-mono text-[11px] text-on-surface-variant">
                  <div>
                    <strong className="block text-primary truncate">{project.materials[0] || 'Paraíso'}</strong>
                    Material
                  </div>
                  <div>
                    <strong className="block text-primary truncate">{project.specs.timeframe.split('|')[0] || '14 días'}</strong>
                    Taller
                  </div>
                  <div>
                    <strong className="block text-primary truncate">Blum / Häfele</strong>
                    Herrajes
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Technical Sheet Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl rounded-xl bg-white border border-outline-variant shadow-xl overflow-hidden max-h-[90vh] flex flex-col text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-outline-variant bg-surface-container">
              <div>
                <span className="text-[11px] font-mono text-accent-wood uppercase tracking-wider block">
                  Pliego Técnico • {selectedProject.client}
                </span>
                <h3 className="text-lg font-bold text-primary">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="relative rounded-lg overflow-hidden h-64 border border-outline-variant">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant block mb-1">
                  Memoria Descriptiva &amp; Cumplimiento Mall
                </span>
                <p className="text-sm text-on-surface leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Dimensiones</span>
                  <strong className="text-primary mt-0.5 block">{selectedProject.specs.dimensions}</strong>
                </div>
                <div className="p-3 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Acabado &amp; Ignífugo</span>
                  <strong className="text-primary mt-0.5 block">{selectedProject.specs.finish}</strong>
                </div>
                <div className="p-3 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Herrajes Técnicos</span>
                  <strong className="text-primary mt-0.5 block">{selectedProject.specs.hardware}</strong>
                </div>
                <div className="p-3 rounded bg-surface-container border border-outline-variant">
                  <span className="text-on-surface-variant block text-[10px] uppercase">Tiempos de Ejecución</span>
                  <strong className="text-primary mt-0.5 block">{selectedProject.specs.timeframe}</strong>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant block mb-2">
                  Materiales Homologados
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.materials.map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono bg-surface-container text-primary border border-outline-variant"
                    >
                      <Check className="w-3 h-3 text-accent-wood" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t border-outline-variant bg-surface-container flex items-center justify-between gap-4">
              <a
                href={`https://wa.me/5493510000000?text=Hola%20Roberto%20Muebles,%20quiero%20cotizar%20un%20proyecto%20similar%20a:%20${encodeURIComponent(selectedProject.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded hover:bg-neutral-800 transition-colors"
              >
                Cotizar Proyecto Similar
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono text-on-surface-variant hover:text-primary"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
