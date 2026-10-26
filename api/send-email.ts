// Vercel Serverless Function: /api/send-email
// Dispatches verified transactional confirmation emails for The Wealth Code attendees.

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, phone, seatNumber, ticketCode } = req.body || {};

  if (!fullName || !email) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  const seatFormatted = `#${String(seatNumber).padStart(4, '0')}`;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SENDER_EMAIL || 'The Wealth Code <events@visionaryleadershipdevelopment.com>';

  // If no API key is configured in Vercel environment variables yet,
  // return success so the frontend continues seamlessly in preview mode.
  if (!apiKey) {
    return res.status(200).json({
      delivered: false,
      message: 'Preview mode: Add RESEND_API_KEY in Vercel environment variables to send real emails to inboxes.',
      preview: { to: email, seat: seatFormatted, ticketCode }
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        reply_to: process.env.REPLY_TO_EMAIL || 'no-reply@visionaryleadershipdevelopment.com',
        subject: `Reservation Confirmed: Your Seat at The Wealth Code (${seatFormatted})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 4px;">
            <div style="text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px;">
              <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #64748b; margin: 0;">Visionary Leadership Development</p>
              <h1 style="font-size: 26px; font-weight: bold; margin: 8px 0; color: #0b132b;">THE WEALTH CODE</h1>
              <p style="font-size: 14px; color: #475569; margin: 0;">Minnesota Executive Event · Saturday, November 21, 2026</p>
            </div>

            <p style="font-size: 15px; line-height: 1.6;">Dear <strong>${fullName}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.6;">Your spot for <strong>The Wealth Code</strong> has been officially reserved. Because this forum is strictly limited to 1,000 attendees, your seat has been cataloged under Tier 1 allocation.</p>

            <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 4px; margin: 20px 0;">
              <table style="width: 100%; font-size: 14px; line-height: 1.8;">
                <tr><td style="color: #64748b;">Assigned Seat:</td><td><strong style="color: #0b132b;">${seatFormatted} of 1,000</strong></td></tr>
                <tr><td style="color: #64748b;">Pass Code:</td><td><strong style="color: #0284c7;">${ticketCode}</strong></td></tr>
                <tr><td style="color: #64748b;">Date:</td><td>Saturday, November 21, 2026</td></tr>
                <tr><td style="color: #64748b;">Location:</td><td>Minneapolis, Minnesota</td></tr>
                <tr><td style="color: #64748b;">Registered Phone:</td><td>${phone || 'On file'}</td></tr>
              </table>
            </div>

            <h3 style="font-size: 15px; color: #0b132b; margin-top: 24px;">Next Steps — Stay Tuned:</h3>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              We will be releasing the official keynote speaker line-up, venue arrival procedures, and the executive workbook in the coming weeks directly to this email address.
            </p>

            <p style="font-size: 12px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              For inquiries or adjustments, contact <a href="mailto:events@visionaryleadershipdevelopment.com" style="color: #0284c7;">events@visionaryleadershipdevelopment.com</a> or visit <a href="https://visionaryleadershipdevelopment.com/minnesota-event" style="color: #0284c7;">visionaryleadershipdevelopment.com/minnesota-event</a>.
            </p>
          </div>
        `,
      }),
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Email dispatch failed' });
  }
}
