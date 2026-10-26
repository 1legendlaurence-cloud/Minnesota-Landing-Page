import { Reservation } from '../types';

export function downloadTicketImage(reservation: Reservation) {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 620;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background - Clean executive navy & slate
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0F172A');
  gradient.addColorStop(0.5, '#1E293B');
  gradient.addColorStop(1, '#0F172A');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Very thin tinted hairline stroke border (no drop shadows)
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Secondary inner hairline accent
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Perforation divider line for ticket stub
  const stubX = 860;
  ctx.setLineDash([6, 8]);
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.2)';
  ctx.beginPath();
  ctx.moveTo(stubX, 42);
  ctx.lineTo(stubX, height - 42);
  ctx.stroke();
  ctx.setLineDash([]);

  // Perforation notch cutouts
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.arc(stubX, 42, 12, 0, Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(stubX, height - 42, 12, Math.PI, 0);
  ctx.fill();

  // Organization Header
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 13px "Century Gothic", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('VISIONARY LEADERSHIP DEVELOPMENT', 70, 95);

  // Event Domain / Series (NO mono fonts)
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '700 12px "Century Gothic", sans-serif';
  ctx.fillText('MINNESOTA EVENT · 21 NOVEMBER 2026', 70, 125);

  // Main Event Title — The Wealth Code in Klarissa Font
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 50px "Klarissa", Georgia, serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('THE WEALTH CODE', 70, 195);

  // Date and Location Badges
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 16px "Century Gothic", sans-serif';
  ctx.fillText('SATURDAY, NOVEMBER 21, 2026', 70, 240);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Minneapolis · Minnesota (1000 Total Seats)', 70, 270);

  // Divider Line
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.15)';
  ctx.beginPath();
  ctx.moveTo(70, 310);
  ctx.lineTo(stubX - 50, 310);
  ctx.stroke();

  // Attendee Info Section
  // Full Name
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 12px "Century Gothic", sans-serif';
  ctx.fillText('RESERVED ATTENDEE', 70, 355);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 26px "Century Gothic", sans-serif';
  ctx.fillText(reservation.fullName.toUpperCase(), 70, 395);

  // Email
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 12px "Century Gothic", sans-serif';
  ctx.fillText('EMAIL', 70, 445);

  ctx.fillStyle = '#F1F5F9';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(reservation.email, 70, 475);

  // Phone
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 12px "Century Gothic", sans-serif';
  ctx.fillText('PHONE', 420, 445);

  ctx.fillStyle = '#F1F5F9';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(reservation.phone, 420, 475);

  // Seat Badge
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 12px "Century Gothic", sans-serif';
  ctx.fillText('ASSIGNED SEAT', 630, 445);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 18px "Century Gothic", sans-serif';
  ctx.fillText(`TIER 1 · #${reservation.seatNumber.toString().padStart(4, '0')}`, 630, 475);

  // Bottom Notice
  ctx.fillStyle = '#64748B';
  ctx.font = '11px "Century Gothic", sans-serif';
  ctx.fillText('Strictly non-transferable · 1000 Seat Maximum Protocol · Minneapolis, MN', 70, 545);

  // STUB SECTION (Right side)
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 12px "Century Gothic", sans-serif';
  ctx.fillText('STUB / ADMIT ONE', stubX + 40, 95);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 22px "Klarissa", Georgia, serif';
  ctx.fillText('THE WEALTH CODE', stubX + 40, 135);

  // Stub Seat
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 11px "Century Gothic", sans-serif';
  ctx.fillText('SEAT NO.', stubX + 40, 190);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px "Century Gothic", sans-serif';
  ctx.fillText(`#${reservation.seatNumber.toString().padStart(4, '0')}`, stubX + 40, 225);

  // Stub Ticket Code
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 11px "Century Gothic", sans-serif';
  ctx.fillText('PASS CODE', stubX + 40, 275);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 16px "Century Gothic", sans-serif';
  ctx.fillText(reservation.ticketCode, stubX + 40, 302);

  // Barcode Lines on Stub
  const barcodeY = 360;
  const barcodeHeight = 65;
  ctx.fillStyle = '#E2E8F0';
  const barPattern = [3, 1, 4, 2, 1, 5, 2, 2, 4, 1, 2, 4, 3, 1, 5, 2, 1, 3, 4, 2, 1, 3, 5, 2, 4, 1, 2, 3];
  let currX = stubX + 40;
  for (let i = 0; i < barPattern.length; i++) {
    const barWidth = barPattern[i];
    ctx.fillRect(currX, barcodeY, barWidth, barcodeHeight);
    currX += barWidth + ((i % 2 === 0) ? 4 : 2);
    if (currX > width - 60) break;
  }

  // QR Label
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 10px "Century Gothic", sans-serif';
  ctx.fillText('MINNESOTA EVENT PASS', stubX + 40, 460);

  // Convert to downloadable file
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `the-wealth-code-ticket-${reservation.seatNumber}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
