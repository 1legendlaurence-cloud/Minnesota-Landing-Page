import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X } from 'lucide-react';

export const ContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+1 (612) 919 3554';
  const cleanPhone = '16129193554';
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Wealth%20Summit%20in%20Minnesota.`;
  const telUrl = `tel:+${cleanPhone}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans-clean select-none">
      {/* Pop-up Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-14 right-0 w-72 bg-white border border-slate-300 rounded-sm p-4 text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200">
              <span className="font-century-bold text-xs text-slate-800">
                Contact Coordinator
              </span>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Demo text */}
            <p className="text-xs text-slate-600 mb-3 leading-relaxed font-century">
              Have questions or want to learn more about the Wealth Summit? Connect directly with our event coordinator.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-sm p-2.5 mb-3 text-center">
              <span className="text-[10px] font-century-bold text-slate-500 block mb-0.5">
                DIRECT LINE
              </span>
              <span className="font-century-bold text-sm text-slate-900">
                {phoneNumber}
              </span>
            </div>

            {/* Action Buttons: WhatsApp & Call */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={telUrl}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-colors text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Call Circle Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="w-12 h-12 rounded-full bg-slate-900 text-white border border-slate-700/60 hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        title="Contact coordinator on WhatsApp or Call"
        aria-label="Contact Coordinator"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Phone className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
