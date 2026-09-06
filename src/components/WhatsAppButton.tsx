export const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href="https://wa.me/5493510000000?text=Hola%20Roberto%20Muebles,%20quiero%20hacer%20una%20consulta%20por%20un%20proyecto"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-mono tracking-wider uppercase border border-outline-variant hover:bg-neutral-800 transition-all shadow-sm hover:scale-105 active:scale-95"
        aria-label="Contacto Roberto Muebles"
      >
        <span className="material-symbols-outlined text-[15px]">chat</span>
        <span>Contacto</span>
      </a>
    </div>
  );
};
