import { Reservation } from '../types';

export function getConfirmationEmail(reservation: Reservation) {
  const dateFormatted = 'Saturday, November 21, 2026';
  const location = 'Minneapolis Convention Center & Executive Hall, Minnesota';
  const seatFormatted = `#${reservation.seatNumber.toString().padStart(4, '0')}`;

  return {
    subject: `Reservation Confirmed: Your Seat at The Wealth Code (${seatFormatted})`,
    from: 'Visionary Leadership Development <reservations@visionaryleadershipdevelopment.com>',
    to: `${reservation.fullName} <${reservation.email}>`,
    replyTo: 'no-reply@visionaryleadershipdevelopment.com',
    date: 'Just now (Instant confirmation)',
    previewText: `Your reservation for The Wealth Code in Minnesota is confirmed. Seat ${seatFormatted} secured.`,
    bodyHtml: `
Dear ${reservation.fullName},

Your executive seat for THE WEALTH CODE has been successfully reserved.

EVENT DETAILS:
• Date: ${dateFormatted}
• Location: ${location}
• Reservation Code: ${reservation.ticketCode}
• Assigned Seat: ${seatFormatted} of 1,000 Total Seats
• Registered Phone: ${reservation.phone}

NEXT STEPS & STAY TUNED:
You have officially secured one of only 1,000 available seats for this exclusive gathering. We will be releasing private briefing dossiers, keynote speaker announcements, and arrival protocols in the coming weeks.

Please stay tuned to this email address for:
1. Executive Workbook & Pre-event Curriculum.
2. Direct VIP check-in QR code pass.
3. Private networking breakfast schedule.

If you require any special executive accommodation or need to adjust your contact details, please reply directly to this email or visit:
https://visionaryleadershipdevelopment.com/minnesota-event

Warm regards,
Visionary Leadership Development Team
Executive Events Committee
    `.trim(),
  };
}
