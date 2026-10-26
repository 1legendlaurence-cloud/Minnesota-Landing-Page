/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reservation } from './types';
import { INITIAL_RESERVATIONS } from './data/initialData';
import { TypographyReveal } from './components/TypographyReveal';
import { ReservationForm } from './components/ReservationForm';
import { ReservationModal } from './components/ReservationModal';
import venueImage from './assets/images/event_venue_minnesota_1793008779899.jpg';

export default function App() {
  // Splash to form state: Intro animated text appears once, then form replaces its position
  const [phase, setPhase] = useState<'splash' | 'form'>('splash');

  // Clean light mode enforcement (dark mode removed as requested)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('twc_reservations_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_RESERVATIONS;
  });

  const [latestReservation, setLatestReservation] = useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('twc_reservations_data', JSON.stringify(reservations));
    }
  }, [reservations]);

  const handleReserve = (data: { fullName: string; email: string; phone: string }) => {
    const seatNumber = reservations.length + 1;
    const padded = seatNumber.toString().padStart(4, '0');
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      seatNumber: seatNumber,
      ticketCode: `TWC-2026-${padded}`,
      registeredAt: new Date().toISOString(),
    };

    setReservations((prev) => [newReservation, ...prev]);
    setLatestReservation(newReservation);
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center bg-[#F8FAFC] text-slate-900 font-sans-clean select-none relative">
      {/* Subtle Background Architectural Backdrop with light tint scrim */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={venueImage}
          alt="Minneapolis Venue"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-10 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/95 via-[#F8FAFC]/90 to-[#F8FAFC]" />
      </div>

      {/* Main Container: Intro text appears once, then form replaces its position in the exact center */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6 flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {phase === 'splash' ? (
            <motion.div
              key="splash-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
              className="w-full flex flex-col items-center justify-center"
            >
              <TypographyReveal onComplete={() => setPhase('form')} />
            </motion.div>
          ) : (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              <ReservationForm onReserve={handleReserve} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pop-up Thank You Modal (with Download Ticket & Instant Confirmation Email) */}
      <ReservationModal
        reservation={latestReservation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
