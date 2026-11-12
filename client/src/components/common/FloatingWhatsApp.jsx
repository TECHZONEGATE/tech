import React from 'react';

export function FloatingWhatsApp() {
  const phoneNumber = "918050941407";
  const defaultMessage = encodeURIComponent("Hi, I have a query .");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside 
      aria-label="Chat with TECHZONE Admissions on WhatsApp"
      className="fixed bottom-20 sm:bottom-24 right-5 sm:right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Tooltip on desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-navy-deep/95 text-white border border-navy-royal/50 text-xs font-semibold shadow-xl backdrop-blur-md opacity-90 hover:opacity-100 transition-all group-hover:translate-x-0"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2 animate-pulse" />
        <span>Chat with Admissions</span>
      </a>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with TECHZONE Admissions on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_25px_rgba(37,211,102,0.45)] group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp SVG Icon */}
        <svg 
          className="w-7 h-7 fill-current relative z-10 transition-transform group-hover:rotate-6" 
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.96.57 3.88 1.66 5.53L2 22l4.73-1.63a9.88 9.88 0 0 0 5.31 1.53h.01c5.46 0 9.91-4.45 9.91-9.91A9.87 9.87 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.39 1.3-1.93 1.39-.5.08-1.14.12-3.69-.93-3.26-1.34-5.35-4.66-5.51-4.88-.16-.22-1.31-1.74-1.31-3.32 0-1.58.83-2.36 1.12-2.68.29-.32.64-.4.85-.4.21 0 .43.002.61.01.2.01.47-.08.74.56.28.68.96 2.34 1.04 2.51.08.17.13.37.03.6-.1.22-.16.36-.31.54-.16.18-.33.4-.47.54-.16.16-.33.33-.14.65.19.32.84 1.38 1.81 2.24 1.25 1.11 2.3 1.45 2.63 1.61.32.16.51.14.7-.08.19-.22.82-.95 1.04-1.28.22-.32.44-.27.74-.16.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.13.08.78-.16 1.46z" />
        </svg>
      </a>
    </aside>
  );
}
