import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../lib/whatsapp';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl('Hola Chape, quiero hacer una consulta.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
