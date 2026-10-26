import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Download, Copy, Check, MapPin } from 'lucide-react';
import { Reservation } from '../types';
import { downloadTicketImage } from '../utils/ticketGenerator';
import { getConfirmationEmail } from '../utils/emailTemplate';

interface ReservationModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  reservation,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'ticket' | 'email'>('ticket');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !reservation) return null;

  const emailData = getConfirmationEmail(reservation);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservation.ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadTicketImage(reservation);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop (Zero drop shadow, clean tinted scrim) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window with razor-thin tinted stroke (no shadow box) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white border border-slate-300 rounded-sm overflow-hidden z-10"
        >
          {/* Top Bar with 1-word button */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-century-bold text-[11px] text-slate-800">
                Reservation Confirmed
              </span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="px-2.5 py-1 text-xs font-medium border border-slate-300 text-slate-600 hover:text-slate-900 rounded-sm transition-colors"
            >
              Close
            </button>
          </div>

          {/* Modal Header Notice */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-century-bold text-slate-500">
                  The Wealth Code · Minnesota Event
                </p>
                <h3 className="font-klarissa text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                  Spot #{reservation.seatNumber.toString().padStart(4, '0')} Reserved
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Confirmation sent to{' '}
                  <span className="font-semibold text-slate-900 font-century">
                    {reservation.email}
                  </span>
                </p>
              </div>

              {/* Single-word button label 'Download' */}
              <div className="shrink-0">
                <button
                  onClick={handleDownload}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Bar - 1-word labels 'Ticket' and 'Email' */}
          <div className="flex border-b border-slate-200 px-5 pt-2 gap-4">
            <button
              onClick={() => setActiveTab('ticket')}
              type="button"
              className={`pb-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 ${
                activeTab === 'ticket'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Ticket
            </button>
            <button
              onClick={() => setActiveTab('email')}
              type="button"
              className={`pb-2 text-xs font-medium tracking-wide uppercase transition-colors border-b-2 ${
                activeTab === 'email'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Email
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
            {activeTab === 'ticket' ? (
              <div className="space-y-4">
                {/* On-screen Digital Pass Ticket View */}
                <div className="relative p-4 sm:p-5 rounded-sm border border-slate-300 bg-slate-50/70">
                  <div className="flex items-start justify-between pb-3.5 border-b border-slate-200">
                    <div>
                      <p className="text-[10px] font-century-bold text-slate-500">
                        Visionary Leadership Development
                      </p>
                      <h4 className="font-klarissa text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
                        THE WEALTH CODE
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-century">
                        Minnesota Event · 21 Nov 2026
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-century-bold text-slate-500">
                        Seat Assignment
                      </p>
                      <p className="font-century font-bold text-base sm:text-lg text-slate-900">
                        #{reservation.seatNumber.toString().padStart(4, '0')} / 1000
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3.5 text-xs">
                    <div>
                      <span className="block text-[10px] font-century-bold text-slate-500">
                        Attendee
                      </span>
                      <span className="font-semibold text-slate-900 truncate block">
                        {reservation.fullName}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-century-bold text-slate-500">
                        Phone
                      </span>
                      <span className="text-slate-800 font-century truncate block">
                        {reservation.phone}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-century-bold text-slate-500">
                        Pass Code
                      </span>
                      <div className="flex items-center gap-1.5 font-century font-bold text-slate-900">
                        <span>{reservation.ticketCode}</span>
                        <button
                          onClick={handleCopyCode}
                          type="button"
                          className="p-1 hover:text-slate-600 transition-colors"
                          title="Copy ticket code"
                        >
                          {copied ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-1.5 font-century">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Minneapolis, Minnesota</span>
                    </div>
                    <div>
                      1,000 Capacity
                    </div>
                  </div>
                </div>

                {/* Single-word action buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={handleCopyCode}
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-slate-300 hover:border-slate-400 text-slate-700 rounded-sm transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    type="button"
                    className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Instant Email View Tab */
              <div className="space-y-3 font-sans-clean">
                <div className="p-3 rounded-sm border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-700 font-century-bold">From:</span>
                    <span className="font-century">{emailData.from}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-700 font-century-bold">To:</span>
                    <span className="font-century">{emailData.to}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-700 font-century-bold">Subject:</span>
                    <span className="font-medium text-slate-900">{emailData.subject}</span>
                  </div>
                </div>

                <div className="p-4 rounded-sm border border-slate-200 bg-white text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans-clean">
                  {emailData.bodyHtml}
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={onClose}
                    type="button"
                    className="px-3 py-1 text-xs border border-slate-300 text-slate-700 hover:text-slate-900 rounded-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
