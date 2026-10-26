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
import { ThankYouView } from './components/ThankYouView';
import { ContactWidget } from './components/ContactWidget';
import venueImage from './assets/images/event_venue_minnesota_1793008779899.jpg';

export default function App() {
  // Splash to form to thank-you state
  const [phase, setPhase] = useState<'splash' | 'form' | 'thankyou'>('splash');

  // Clean light mode enforcement
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Ensure browser address bar always reflects /minnesota-event
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      window.history.replaceState(null, '', '/minnesota-event');
    }
  }, []);

  // Reservations state: starts strictly chronologically from Seat 1
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('twc_reservations_chronological_v3');
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('twc_reservations_chronological_v3', JSON.stringify(reservations));
    }
  }, [reservations]);

  const handleReserve = (data: { fullName: string; email: string; phone: string }) => {
    // Strictly chronological: 1st person gets 1, 2nd gets 2, etc.
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

    setReservations((prev) => [...prev, newReservation]);
    setLatestReservation(newReservation);
    setPhase('thankyou');

    // Dispatch real email via /api/send-email
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReservation),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('[Email Dispatch Status]:', result);
      })
      .catch((err) => {
        console.error('[Email Dispatch Request Error]:', err);
      });
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

      {/* Main Container: Splash -> Form -> Simple Thank You Page (in place, zero scroll) */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6 flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {phase === 'splash' && (
            <motion.div
              key="splash-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
              className="w-full flex flex-col items-center justify-center"
            >
              <TypographyReveal onComplete={() => setPhase('form')} />
            </motion.div>
          )}

          {phase === 'form' && (
            <motion.div
              key="registration-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="w-full flex flex-col items-center justify-center"
            >
              <ReservationForm onReserve={handleReserve} />
            </motion.div>
          )}

          {phase === 'thankyou' && latestReservation && (
            <motion.div
              key="thank-you-page"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="w-full flex flex-col items-center justify-center"
            >
              <ThankYouView
                reservation={latestReservation}
                onReset={() => setPhase('form')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Call / WhatsApp Circle Widget */}
      <ContactWidget />
    </div>
  );
}
