import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'comercial',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setSent(true);

    const text = `*Consulta desde la Web Roberto Muebles:*
------------------------------------
👤 *Nombre:* ${formData.name}
📱 *Teléfono:* ${formData.phone}
✉️ *Email:* ${formData.email}
🏢 *Tipo de Proyecto:* ${formData.projectType}
📝 *Mensaje:* ${formData.message}
------------------------------------`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5493510000000?text=${encoded}`, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-[#090a0f] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Workshop & Direct Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Hablemos de tu Próximo Proyecto
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Contacto Directo con <span className="text-gold-gradient">el Taller</span>
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Ya sea un local en Dinosaurio Mall, una isla para shopping o el amoblamiento de tu residencia en Córdoba, estamos a tu disposición para asesorarte y cotizar.
              </p>
            </div>

            {/* Direct Information Blocks */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Taller de Fabricación & Oficina</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Av. Monseñor Pablo Cabrera 3850, Córdoba Capital</div>
                  <div className="text-xs text-neutral-400 mt-0.5">A 5 minutos del Dino Mall Rodríguez del Busto</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Teléfono & WhatsApp Directo</div>
                  <div className="text-sm font-semibold text-white mt-0.5">+54 9 351 456-7890 / +54 9 351 600-1122</div>
                  <div className="text-xs text-emerald-400 mt-0.5">Atención rápida por WhatsApp comercial</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Correo Electrónico</div>
                  <div className="text-sm font-semibold text-white mt-0.5">presupuestos@robertomuebles.com.ar</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Envío de planos en DWG, PDF o renders</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase">Horarios de Taller</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Lunes a Viernes: 08:00 a 18:30 hs</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Guardias para montajes nocturnos en shoppings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Plan Submission Form (7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Envíanos los Detalles de tu Obra
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Te responderemos en el día con un análisis de viabilidad, tiempos de entrega y cotización formal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Nombre completo / Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Martín (Jacinto Café)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. +54 9 351 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Email de Contacto</label>
                  <input
                    type="email"
                    placeholder="nombre@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Categoría del Proyecto</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="isla_shopping">Isla para Shopping (Dinosaurio Mall, etc.)</option>
                    <option value="mostrador_comercial">Mostrador / Front Desk de Atención</option>
                    <option value="local_comercial">Equipamiento Completo de Local Comercial</option>
                    <option value="particular_cocina">Particular: Cocina a Medida</option>
                    <option value="particular_vestidor">Particular: Vestidor / Placard</option>
                    <option value="otro">Mobiliario Especial a Medida</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Mensaje y especificaciones</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Cuéntanos medidas estimadas, ubicación de la obra (ej. Dinosaurio Mall, Nueva Córdoba, Country...), materiales preferidos o si ya cuentas con planos..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-neutral-950 bg-gradient-to-r from-[#e6c99c] via-[#c5a880] to-[#b38b59] hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>Enviar Consulta y Coordinar Visita</span>
              </button>

              {sent && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>¡Mensaje preparado! Te redireccionamos a WhatsApp para confirmar el envío al taller.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
