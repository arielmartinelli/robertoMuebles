import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';

export const LiveEstimator: React.FC = () => {
  const [typology, setTypology] = useState<'stand' | 'local' | 'autor'>('stand');
  const [surface, setSurface] = useState<number>(35);
  const [materialGrade, setMaterialGrade] = useState<'estandar' | 'premium' | 'lujo'>('premium');
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');

  const USD_TO_ARS = 1350;

  const calculation = useMemo(() => {
    // Base cost per m2
    const baseRates: Record<string, number> = {
      stand: 420, // Commercial shopping mall island: complete cabinetry, 360 finish, electrical, glass
      local: 340, // Retail store fitout
      autor: 390  // High-end bespoke residential
    };

    const gradeMultipliers: Record<string, number> = {
      estandar: 1.0,  // Melamina primera línea Egger/Faplac
      premium: 1.35,  // Enchapado Paraíso / Petiribí lustrado poliuretánico
      lujo: 1.70      // Roble macizo, mármol calacatta, herrajes Blum Movento
    };

    const baseCostUSD = baseRates[typology] * gradeMultipliers[materialGrade] * surface;
    const minUSD = Math.round(baseCostUSD * 0.92);
    const maxUSD = Math.round(baseCostUSD * 1.08);

    const minARS = minUSD * USD_TO_ARS;
    const maxARS = maxUSD * USD_TO_ARS;

    // Production lead times
    let daysMin = Math.round(12 + surface * 0.18);
    let daysMax = Math.round(daysMin + 5);

    let nightShifts = surface <= 30 ? '1 a 2 NOCHES EN MALL' : surface <= 80 ? '2 a 3 NOCHES EN MALL' : '4 a 6 NOCHES EN MALL';

    return {
      minUSD,
      maxUSD,
      minARS,
      maxARS,
      daysMin,
      daysMax,
      nightShifts
    };
  }, [typology, surface, materialGrade]);

  const typologyLabels: Record<string, string> = {
    stand: 'Isla / Stand de Shopping (Dino Mall u otro)',
    local: 'Local Comercial / Retail',
    autor: 'Autor / Residencial de Alta Gama'
  };

  const materialLabels: Record<string, string> = {
    estandar: 'Melamina 18mm con cantos ABS 2mm',
    premium: 'Enchapado en Paraíso / Petiribí con laca B-s1',
    lujo: 'Madera noble maciza, herrajes Blum y mármol'
  };

  const handleWhatsApp = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#915b36', '#111110', '#c49c6d']
    });

    const budgetText = currency === 'ARS'
      ? `$${Math.round(calculation.minARS / 1000).toLocaleString('es-AR')}k - $${Math.round(calculation.maxARS / 1000).toLocaleString('es-AR')}k ARS`
      : `US$ ${calculation.minUSD.toLocaleString()} - US$ ${calculation.maxUSD.toLocaleString()}`;

    const text = `*Consulta de Cotización — Roberto Muebles:*
-----------------------------------------------
📐 *Tipología:* ${typologyLabels[typology]}
📏 *Superficie:* ${surface} m²
🪵 *Acabado:* ${materialLabels[materialGrade]}
⏱️ *Plazo taller estimado:* ${calculation.daysMin} a ${calculation.daysMax} días hábiles
🌙 *Ventana montaje:* ${calculation.nightShifts}
💰 *Rango orientativo preliminar:* ${budgetText}
-----------------------------------------------
¿Podemos coordinar una reunión técnica o visita para revisar planos en Córdoba?`;

    const url = `https://wa.me/5493510000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 md:py-28 border-t border-outline-variant blueprint-grid bg-[#faf9f6]" id="cotizador">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main Architectural Blueprint Sheet Card with Depth Shadow */}
        <div className="bg-white rounded-2xl border border-outline-variant shadow-[0_24px_65px_-15px_rgba(17,17,16,0.08),0_12px_28px_-10px_rgba(17,17,16,0.04)] hover:shadow-[0_36px_90px_-18px_rgba(17,17,16,0.15),0_18px_40px_-10px_rgba(17,17,16,0.08)] hover:-translate-y-1.5 transition-all duration-500 max-w-4xl mx-auto overflow-hidden relative group">
          
          {/* Top Blueprint Coordinates Header Ruler Bar */}
          <div className="border-b border-outline-variant/80 bg-surface-container/50 px-6 py-2 flex items-center justify-between font-mono text-[9px] text-on-surface-variant select-none tracking-widest">
            <span className="font-bold text-accent-wood">⊕ SEC-01</span>
            <div className="flex items-center gap-3 sm:gap-6 text-on-surface-variant/70 font-semibold">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span className="hidden sm:inline">04</span>
              <span className="hidden sm:inline">05</span>
              <span>06</span>
              <span className="hidden sm:inline">07</span>
              <span>08</span>
              <span>09</span>
              <span className="hidden sm:inline">10</span>
              <span>11</span>
              <span>12</span>
            </div>
            <span className="font-bold text-accent-wood">⊕ 1:25</span>
          </div>

          {/* Left / Right Blueprint Coordinate Tick Overlay (Desktop) */}
          <div className="hidden lg:flex absolute left-3 top-24 bottom-24 flex-col justify-between font-mono text-[9px] text-on-surface-variant/40 pointer-events-none select-none">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
          </div>
          <div className="hidden lg:flex absolute right-3 top-24 bottom-24 flex-col justify-between font-mono text-[9px] text-on-surface-variant/40 pointer-events-none select-none">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span>D</span>
            <span>E</span>
          </div>

          {/* Clean Interior (No grid inside as requested) */}
          <div className="p-8 md:p-14">
            {/* Header */}
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="font-mono text-xs text-accent-wood uppercase tracking-widest">
                Calculador Técnico • Presupuesto Inmediato
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mt-1 mb-2">
                Cotización preliminar de proyecto
              </h2>
              <p className="text-sm text-on-surface-variant">
                Seleccione tipología, metraje y materialidad para estimar plazos de taller y rango de inversión.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8 text-left">
            {/* 1. Tipología */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-on-surface-variant mb-3">
                1. Tipología de Mobiliario
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTypology('stand')}
                  className={`py-3 px-4 rounded-lg border text-xs font-mono tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${
                    typology === 'stand'
                      ? 'border-primary bg-primary text-white font-medium shadow-xs'
                      : 'border-outline-variant bg-surface-container text-primary hover:border-primary/60 hover:bg-white'
                  }`}
                >
                  Isla / Stand Shopping
                </button>

                <button
                  type="button"
                  onClick={() => setTypology('local')}
                  className={`py-3 px-4 rounded-lg border text-xs font-mono tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${
                    typology === 'local'
                      ? 'border-primary bg-primary text-white font-medium shadow-xs'
                      : 'border-outline-variant bg-surface-container text-primary hover:border-primary/60 hover:bg-white'
                  }`}
                >
                  Local Comercial
                </button>

                <button
                  type="button"
                  onClick={() => setTypology('autor')}
                  className={`py-3 px-4 rounded-lg border text-xs font-mono tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${
                    typology === 'autor'
                      ? 'border-primary bg-primary text-white font-medium shadow-xs'
                      : 'border-outline-variant bg-surface-container text-primary hover:border-primary/60 hover:bg-white'
                  }`}
                >
                  Autor / Residencial
                </button>
              </div>
            </div>

            {/* 2. Superficie Slider & Manual Input (Metro a Metro) */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                  2. Superficie o Metraje
                </label>
                
                {/* Manual Input + Stepper for 1-by-1 meter adjustment */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSurface((prev) => Math.max(1, prev - 1))}
                    title="Restar 1 metro"
                    className="w-7 h-7 flex items-center justify-center rounded border border-outline-variant bg-surface-container hover:bg-white hover:border-primary text-xs font-mono font-bold text-primary transition-colors"
                  >
                    -
                  </button>

                  <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded border border-outline-variant focus-within:border-primary focus-within:bg-white focus-within:shadow-xs transition-all">
                    <input
                      type="number"
                      min="1"
                      max="300"
                      step="1"
                      value={surface || ''}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (isNaN(val) || val <= 0) {
                          setSurface(1);
                        } else {
                          setSurface(Math.min(val, 300));
                        }
                      }}
                      className="w-14 bg-transparent text-right font-mono text-sm font-bold text-primary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="font-mono text-xs text-on-surface-variant font-medium">m²</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSurface((prev) => Math.min(300, prev + 1))}
                    title="Sumar 1 metro"
                    className="w-7 h-7 flex items-center justify-center rounded border border-outline-variant bg-surface-container hover:bg-white hover:border-primary text-xs font-mono font-bold text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Slider meter by meter (step=1) */}
              <input
                className="w-full accent-primary h-2 bg-surface-container rounded cursor-pointer"
                max="180"
                min="1"
                step="1"
                type="range"
                value={surface}
                onChange={(e) => setSurface(parseInt(e.target.value) || 1)}
              />
              <div className="flex justify-between font-mono text-[10px] text-on-surface-variant mt-2">
                <span>1 m² (Detalle)</span>
                <span>35 m² (Isla estándar de shopping)</span>
                <span>180 m² (Local integral)</span>
              </div>
            </div>

            {/* 3. Acabado Material */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-on-surface-variant mb-3">
                3. Materialidad &amp; Nivel de Acabado
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'estandar', label: 'Melamina Faplac 18mm', desc: 'Cantos ABS 2mm a máquina' },
                  { id: 'premium', label: 'Enchapado Paraíso / Roble', desc: 'Lustre poliuretánico mate' },
                  { id: 'lujo', label: 'Maderas Nobles & Cuarzo', desc: 'Herrajes Blum + Mármol' },
                ].map((grade) => (
                  <button
                    key={grade.id}
                    type="button"
                    onClick={() => setMaterialGrade(grade.id as any)}
                    className={`p-3 rounded-lg border text-left font-mono transition-all ${
                      materialGrade === grade.id
                        ? 'border-primary bg-primary text-white shadow-xs'
                        : 'border-outline-variant bg-surface-container text-on-surface hover:border-primary/40'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-tight">{grade.label}</div>
                    <div className={`text-[10px] mt-1 ${materialGrade === grade.id ? 'text-neutral-300' : 'text-on-surface-variant'}`}>
                      {grade.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Result Card Swiss */}
            <div className="p-5 rounded-lg bg-surface-container/70 backdrop-blur-xs border border-outline-variant space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Plazo estimado de fabricación en taller:</span>
                  <strong className="text-base font-semibold text-primary">
                    {calculation.daysMin} a {calculation.daysMax} días hábiles
                  </strong>
                </div>
                <div className="sm:text-right">
                  <span className="text-on-surface-variant block text-[11px]">Ventana de montaje:</span>
                  <strong className="text-accent-wood font-semibold uppercase">
                    {calculation.nightShifts}
                  </strong>
                </div>
              </div>

              {/* Budget Range Line */}
              <div className="pt-3 border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-on-surface-variant text-[11px] block">Presupuesto orientativo estimado:</span>
                  <strong className="text-lg font-bold text-primary font-mono">
                    {currency === 'ARS' ? (
                      <>
                        ${Math.round(calculation.minARS / 1000).toLocaleString('es-AR')}k - ${Math.round(calculation.maxARS / 1000).toLocaleString('es-AR')}k ARS
                      </>
                    ) : (
                      <>
                        US$ {calculation.minUSD.toLocaleString()} - US$ {calculation.maxUSD.toLocaleString()}
                      </>
                    )}
                  </strong>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center gap-1 bg-white p-1 rounded border border-outline-variant self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setCurrency('ARS')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      currency === 'ARS' ? 'bg-primary text-white' : 'text-on-surface-variant'
                    }`}
                  >
                    ARS
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      currency === 'USD' ? 'bg-primary text-white' : 'text-on-surface-variant'
                    }`}
                  >
                    USD
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons with hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-mono uppercase tracking-wider py-4 rounded-lg hover:bg-neutral-800 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Cotizar por WhatsApp
              </button>

              <a
                className="flex items-center justify-center gap-2 border border-outline-variant bg-white text-primary text-xs font-mono uppercase tracking-wider py-4 rounded-lg hover:border-primary hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all"
                href="mailto:presupuestos@robertomuebles.com.ar?subject=Envío%20de%20Planos%20para%20Cotización%20Roberto%20Muebles"
              >
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                Enviar Planos (PDF/DWG)
              </a>
            </div>
          </div>
        </div>

          {/* Bottom Blueprint Title Block / Coordinates Strip */}
          <div className="border-t border-outline-variant/80 bg-surface-container/50 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] text-on-surface-variant gap-2 select-none tracking-wider">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary uppercase">HOJA DE PLANO Nº RM-01</span>
              <span className="text-outline-variant">|</span>
              <span>ESC: 1:50</span>
              <span className="text-outline-variant">|</span>
              <span>UNIDAD: MM / M²</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 text-on-surface-variant/70 font-semibold">
              <span>12</span><span>11</span><span className="hidden sm:inline">10</span><span>09</span><span>08</span><span className="hidden sm:inline">07</span><span>06</span><span className="hidden sm:inline">05</span><span>04</span><span>03</span><span>02</span><span>01</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
