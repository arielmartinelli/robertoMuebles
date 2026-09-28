import { useId, useMemo, useState } from 'react';
import { Minus, Plus, Send } from 'lucide-react';
import { useMode, type Mode } from '../context/mode';
import { CONTENT } from '../content/modes';
import { PRICING, UNIT_LABEL, UNIT_SHORT } from '../config/pricing';
import { USD_TO_ARS } from '../config/site';
import { openWhatsApp } from '../lib/whatsapp';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';
import { m } from 'framer-motion';

type Currency = 'ARS' | 'USD';

const fmtARS = (n: number) =>
  n >= 1e6
    ? `$ ${(n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 })} M`
    : `$ ${Math.round(n / 1000).toLocaleString('es-AR')} mil`;
const fmtUSD = (n: number) => `US$ ${Math.round(n).toLocaleString('es-AR')}`;

export function LiveEstimator() {
  const { mode } = useMode();
  // La clave reinicia las opciones con las del nuevo rubro al cambiar de modo.
  return <Estimator key={mode} mode={mode} />;
}

function Estimator({ mode }: { mode: Mode }) {
  const cfg = PRICING[mode];
  const uid = useId();

  const [typeId, setTypeId] = useState(cfg.typologies[0].id);
  const [amount, setAmount] = useState(cfg.typologies[0].initial);
  const [finishId, setFinishId] = useState(cfg.finishes[0].id);
  const [extras, setExtras] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>('ARS');

  const type = cfg.typologies.find((t) => t.id === typeId) ?? cfg.typologies[0];
  const finish = cfg.finishes.find((f) => f.id === finishId) ?? cfg.finishes[0];

  const selectType = (id: string) => {
    const t = cfg.typologies.find((x) => x.id === id);
    if (!t) return;
    setTypeId(id);
    setAmount(t.initial);
  };

  const clamp = (n: number) => Math.min(type.max, Math.max(type.min, Math.round(n)));

  const result = useMemo(() => {
    const extraPct = cfg.extras.filter((e) => extras.includes(e.id)).reduce((a, e) => a + e.pct, 0);
    const base = type.rate * amount * finish.factor * (1 + extraPct);
    const min = base * 0.9;
    const max = base * 1.1;
    const days = Math.round(type.baseDays + amount * (type.unit === 'ml' ? 1.2 : 0.15));
    return { min, max, daysMin: days, daysMax: days + 5 };
  }, [cfg, type, amount, finish, extras]);

  const range =
    currency === 'ARS'
      ? `${fmtARS(result.min * USD_TO_ARS)} – ${fmtARS(result.max * USD_TO_ARS)}`
      : `${fmtUSD(result.min)} – ${fmtUSD(result.max)}`;

  const send = () => {
    const chosen = cfg.extras.filter((e) => extras.includes(e.id)).map((e) => e.label);
    openWhatsApp(
      [
        'Hola Chape, hice un cálculo en la web:',
        `• Rubro: ${CONTENT[mode].label}`,
        `• Mueble / obra: ${type.label}`,
        `• Medida: ${amount} ${UNIT_LABEL[type.unit]}`,
        `• Terminación: ${finish.label}`,
        chosen.length ? `• Extras: ${chosen.join(', ')}` : '',
        `• Rango estimado: ${range}`,
        '¿Podemos coordinar una visita para medir?',
      ]
        .filter(Boolean)
        .join('\n'),
    );
  };

  const optionClass = (active: boolean) =>
    `rounded-md border px-3 py-2.5 text-left transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] sm:px-4 sm:py-3 ${
      active ? 'border-ink bg-ink text-bg' : 'border-line bg-bg hover:border-ink/50'
    }`;

  return (
    <section id="presupuesto" aria-labelledby="presupuesto-title" className="plan-grid border-b border-line py-14 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHeader
          id="presupuesto-title"
          eyebrow={`Presupuestador en vivo · ${CONTENT[mode].label}`}
          title="Calculá tu presupuesto"
          intro={CONTENT[mode].estimator.intro}
        />

        <Reveal kind="block" className="grid overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-[1.5fr_1fr]">
          {/* Opciones */}
          <div className="flex flex-col gap-7 p-4 sm:p-6 md:gap-9 md:p-10">
            <fieldset>
              <legend className="eyebrow mb-3 text-muted">1 · Qué necesitás</legend>
              <div className="grid grid-cols-2 gap-2">
                {cfg.typologies.map((t) => (
                  <button key={t.id} type="button" aria-pressed={t.id === type.id} onClick={() => selectType(t.id)} className={optionClass(t.id === type.id)}>
                    <span className="block text-[0.88rem] font-medium leading-snug sm:text-base">{t.label}</span>
                    <span className={`mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.06em] sm:text-[0.7rem] ${t.id === type.id ? 'opacity-75' : 'text-muted'}`}>
                      Por {UNIT_LABEL[t.unit]}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label htmlFor={`${uid}-amount`} className="eyebrow text-muted">
                  2 · Medida ({UNIT_LABEL[type.unit]})
                </label>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => setAmount((a) => clamp(a - 1))} aria-label="Restar uno" className="grid h-10 w-10 place-items-center rounded border border-line hover:border-ink">
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    id={`${uid}-amount-num`}
                    type="number"
                    inputMode="numeric"
                    min={type.min}
                    max={type.max}
                    value={amount}
                    onChange={(e) => setAmount(clamp(Number(e.target.value) || type.min))}
                    aria-label={`Medida en ${UNIT_LABEL[type.unit]}`}
                    className="h-10 w-20 rounded border border-line bg-bg text-center font-mono text-lg tabular-nums focus:border-accent focus:outline-none"
                  />
                  <button type="button" onClick={() => setAmount((a) => clamp(a + 1))} aria-label="Sumar uno" className="grid h-10 w-10 place-items-center rounded border border-line hover:border-ink">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <input
                id={`${uid}-amount`}
                type="range"
                min={type.min}
                max={type.max}
                step={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-[var(--corte)]"
              />
              <div className="mt-1 flex justify-between font-mono text-[0.7rem] tabular-nums text-muted">
                <span>{type.min} {UNIT_SHORT[type.unit]}</span>
                <span>{type.max} {UNIT_SHORT[type.unit]}</span>
              </div>
            </div>

            <fieldset>
              <legend className="eyebrow mb-3 text-muted">3 · Terminación</legend>
              <div className="grid grid-cols-3 gap-2">
                {cfg.finishes.map((f) => (
                  <button key={f.id} type="button" aria-pressed={f.id === finish.id} onClick={() => setFinishId(f.id)} className={optionClass(f.id === finish.id)}>
                    <span className="block text-[0.8rem] font-medium leading-snug sm:text-base">{f.label}</span>
                    <span className={`mt-0.5 hidden text-[0.82rem] sm:block ${f.id === finish.id ? 'opacity-75' : 'text-muted'}`}>{f.detail}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow mb-3 text-muted">4 · Extras</legend>
              <div className="flex flex-wrap gap-2">
                {cfg.extras.map((e) => {
                  const on = extras.includes(e.id);
                  return (
                    <label key={e.id} className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${on ? 'border-corte bg-corte text-grafito' : 'border-line hover:border-ink/50'}`}>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={() => setExtras((xs) => (on ? xs.filter((x) => x !== e.id) : [...xs, e.id]))}
                      />
                      {e.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Resultado */}
          <div className="flex flex-col justify-between gap-6 bg-grafito p-5 text-placa md:gap-8 md:p-10" aria-live="polite">
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow text-cemento">Rango estimado</span>
                <div role="group" aria-label="Moneda" className="inline-flex rounded-full border border-[#3a3b37] p-0.5">
                  {(['ARS', 'USD'] as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      aria-pressed={currency === cur}
                      onClick={() => setCurrency(cur)}
                      className={`rounded-full px-3 py-1 font-mono text-[0.7rem] ${currency === cur ? 'bg-corte text-grafito' : 'text-cemento hover:text-placa'}`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
              <m.p key={range} initial={{ opacity: 0.35, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="font-display mt-4 text-[clamp(1.4rem,2.5vw,2.1rem)] leading-tight tabular-nums md:mt-5">{range}</m.p>
              <dl className="mt-6 grid gap-3 border-t border-[#3a3b37] pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-cemento">Mueble / obra</dt>
                  <dd className="text-right">{type.label}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-cemento">Medida</dt>
                  <dd className="text-right tabular-nums">{amount} {UNIT_SHORT[type.unit]}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-cemento">Plazo de taller</dt>
                  <dd className="text-right tabular-nums">{result.daysMin} a {result.daysMax} días hábiles</dd>
                </div>
              </dl>
            </div>
            <div>
              <button type="button" onClick={send} className="btn btn-primary w-full">
                <Send className="h-4 w-4" aria-hidden="true" />
                Enviar por WhatsApp
              </button>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-cemento">
                Valores orientativos. El presupuesto final lo confirmamos después de medir y definir el diseño.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
