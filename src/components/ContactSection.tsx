import { useId, useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useMode } from '../context/mode';
import { CONTENT } from '../content/modes';
import { PRICING } from '../config/pricing';
import { SITE } from '../config/site';
import { openWhatsApp } from '../lib/whatsapp';
import { SectionHeader } from './ui/SectionHeader';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';

type Errors = Partial<Record<'name' | 'phone' | 'message', string>>;

export function ContactSection() {
  const { mode } = useMode();
  const uid = useId();
  const [form, setForm] = useState({ name: '', phone: '', email: '', kind: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const kinds = PRICING[mode].typologies.map((t) => t.label).concat('Otro');

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Ingresá tu nombre.';
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) e.phone = 'Ingresá un teléfono válido, con característica.';
    if (form.message.trim().length < 10) e.message = 'Contanos un poco más (al menos 10 caracteres).';
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    openWhatsApp(
      [
        'Hola Chape, les escribo desde la web:',
        `• Nombre: ${form.name.trim()}`,
        `• Teléfono: ${form.phone.trim()}`,
        form.email.trim() ? `• Email: ${form.email.trim()}` : '',
        `• Rubro: ${CONTENT[mode].label}`,
        `• Necesito: ${form.kind || kinds[0]}`,
        `• Mensaje: ${form.message.trim()}`,
      ]
        .filter(Boolean)
        .join('\n'),
    );
    setSent(true);
  };

  const set = (k: keyof typeof form) => (ev: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: ev.target.value }));

  const info = [
    { Icon: MapPin, label: 'Taller', value: SITE.address },
    { Icon: Phone, label: 'Teléfono y WhatsApp', value: SITE.phoneLabel },
    { Icon: Mail, label: 'Email', value: SITE.email },
    { Icon: Clock, label: 'Horario', value: SITE.hours },
  ];

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="py-14 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHeader id="contacto-title" eyebrow="Contacto" title="Hablemos de tu proyecto" intro={CONTENT[mode].contactIntro} />

        <div className="grid gap-6 md:gap-10 lg:grid-cols-[1fr_1.4fr]">
          <RevealGroup as="ul" stagger={0.08} className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-md border border-line bg-line lg:grid-cols-1">
            {info.map(({ Icon, label, value }) => (
              <RevealItem as="li" key={label} className="flex flex-col items-start gap-2 bg-bg p-4 sm:flex-row sm:gap-4 sm:p-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted sm:text-[0.68rem]">{label}</p>
                  <p className="mt-1 select-all break-words text-[0.85rem] sm:text-base">{value}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal kind="block"><form noValidate onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-line bg-surface p-4 sm:gap-5 sm:p-6 md:p-9">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <Field id={`${uid}-name`} label="Nombre *" error={errors.name}>
                <input id={`${uid}-name`} className="field" autoComplete="name" maxLength={80} value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
              </Field>
              <Field id={`${uid}-phone`} label="Teléfono / WhatsApp *" error={errors.phone}>
                <input id={`${uid}-phone`} className="field" type="tel" autoComplete="tel" inputMode="tel" maxLength={25} placeholder="351 000 0000" value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <Field id={`${uid}-email`} label="Email (opcional)">
                <input id={`${uid}-email`} className="field" type="email" autoComplete="email" maxLength={120} value={form.email} onChange={set('email')} />
              </Field>
              <Field id={`${uid}-kind`} label="¿Qué necesitás?">
                <select id={`${uid}-kind`} className="field" value={form.kind || kinds[0]} onChange={set('kind')}>
                  {kinds.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id={`${uid}-msg`} label="Mensaje *" error={errors.message}>
              <textarea id={`${uid}-msg`} className="field min-h-32 resize-y" maxLength={800} placeholder="Medidas aproximadas, barrio o shopping, materiales que te gustan…" value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${uid}-msg-err` : undefined} />
            </Field>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn btn-primary">
                <Send className="h-4 w-4" aria-hidden="true" />
                Enviar por WhatsApp
              </button>
              {sent && (
                <p role="status" className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                  Abrimos WhatsApp con tu mensaje listo para enviar.
                </p>
              )}
            </div>
          </form></Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-sm text-[#d0453a]">
          {error}
        </p>
      )}
    </div>
  );
}
