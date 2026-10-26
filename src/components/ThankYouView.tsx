import React from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { Reservation } from '../types';
import { downloadTicketImage } from '../utils/ticketGenerator';

interface ThankYouViewProps {
  reservation: Reservation;
  onReset: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ reservation, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
    >
      {/* Clean, simple Thank You card with thin tinted stroke, NO shadow box */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-300/80 rounded-sm p-6 sm:p-7 text-center transition-colors">
        <h2 className="font-klarissa text-4xl sm:text-5xl font-bold text-slate-900 tracking-wide uppercase mb-1.5 pt-2">
          Thank You
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mb-5 font-century">
          Your spot has been reserved for <strong className="text-slate-900">The Wealth Summit</strong>.
        </p>

        {/* Chronological Seat & Reservation Information */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-sm p-3.5 mb-5 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-century-bold text-slate-500">ASSIGNED SEAT</span>
            <span className="font-century-bold text-sm text-slate-900">
              #{reservation.seatNumber.toString().padStart(4, '0')} / 1,000
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-century-bold text-slate-500">ATTENDEE</span>
            <span className="font-semibold text-slate-900 truncate max-w-[200px]">
              {reservation.fullName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-century-bold text-slate-500">EMAIL</span>
            <span className="text-slate-800 font-century truncate max-w-[200px]">
              {reservation.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-century-bold text-slate-500">DATE</span>
            <span className="font-century text-slate-800">
              Saturday, November 21, 2026
            </span>
          </div>

          <div className="flex items-start justify-between pt-1 border-t border-slate-200/60">
            <span className="font-century-bold text-slate-500">VENUE</span>
            <span className="font-century text-slate-800 text-right max-w-[220px]">
              Minneapolis Marriott Northwest<br />
              <span className="text-[11px] text-slate-500">7025 Northland Dr N, Brooklyn Park, MN 55428</span>
            </span>
          </div>
        </div>

        {/* Simple Actions: Single-word Download button */}
        <div className="space-y-2">
          <button
            onClick={() => downloadTicketImage(reservation)}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          <button
            onClick={onReset}
            type="button"
            className="w-full py-1.5 text-xs font-century tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </motion.div>
  );
};
