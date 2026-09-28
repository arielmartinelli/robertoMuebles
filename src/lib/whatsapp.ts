import { SITE } from '../config/site';

/** Arma un link seguro de WhatsApp con el texto codificado. */
export function whatsappUrl(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text.slice(0, 1500))}`;
}

export function openWhatsApp(text: string): void {
  window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
}
