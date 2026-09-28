/**
 * Datos de contacto y marca de Chape.
 * IMPORTANTE: reemplazar los valores marcados como PENDIENTE antes de publicar.
 */
export const SITE = {
  name: 'Chape',
  tagline: 'Diseño + Fabricación',
  city: 'Córdoba, Argentina',
  /** PENDIENTE: número real de WhatsApp en formato internacional sin "+" ni espacios. */
  whatsapp: '5493510000000',
  /** PENDIENTE: teléfono visible. */
  phoneLabel: '+54 9 351 000-0000',
  /** PENDIENTE: email real. */
  email: 'hola@chape.com.ar',
  /** PENDIENTE: confirmar dirección del taller. */
  address: 'Av. Monseñor Pablo Cabrera 3850, Córdoba Capital',
  hours: 'Lunes a viernes, 8:00 a 18:30',
  instagram: 'https://www.instagram.com/',
  /** Link para dejar reseña en Google (vacío = no se muestra el botón). */
  googleReviewUrl: '',
} as const;

/** Cotización de referencia usada por el presupuestador (ARS por USD). Actualizar periódicamente. */
export const USD_TO_ARS = 1350;
