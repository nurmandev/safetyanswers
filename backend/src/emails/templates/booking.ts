export function bookingSubmittedTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
  date: string;
  time: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#7c3aed;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Confirmed</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">Your consultation booking has been successfully submitted. Here are your booking details:</p>
          
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Booking ID</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.bookingId}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Service</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.service}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Date</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Time</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.time}</td>
              </tr>
            </table>
          </div>

          <p style="color:#334155;font-size:16px;line-height:1.6;">Our team will review your request and get back to you within 24 hours. You will receive another notification once your booking is approved.</p>
          
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/account/bookings" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">View My Bookings</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function bookingApprovedTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
  date: string;
  time: string;
  consultant?: string;
  meetingType?: string;
  meetingLink?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#16a34a;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Approved</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">Great news! Your consultation booking has been approved.</p>
          
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Booking ID</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.bookingId}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Service</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.service}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Date</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Time</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.time}</td>
              </tr>
              ${data.consultant ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Consultant</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.consultant}</td></tr>` : ""}
              ${data.meetingType ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Meeting Type</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.meetingType}</td></tr>` : ""}
            </table>
          </div>

          ${data.meetingLink ? `
          <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:16px;margin:24px 0;text-align:center;">
            <p style="color:#1e40af;font-size:14px;margin:0 0 8px 0;font-weight:bold;">Join Meeting Link</p>
            <a href="${data.meetingLink}" style="color:#2563eb;font-size:14px;">${data.meetingLink}</a>
          </div>
          ` : ""}

          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/account/bookings" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">View Booking Details</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function bookingRejectedTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
  reason?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#dc2626;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Update</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">We regret to inform you that your booking <strong>#${data.bookingId}</strong> for <strong>${data.service}</strong> could not be approved at this time.</p>
          ${data.reason ? `<p style="color:#334155;font-size:16px;line-height:1.6;"><strong>Reason:</strong> ${data.reason}</p>` : ""}
          <p style="color:#334155;font-size:16px;line-height:1.6;">You can try booking again with a different time slot or contact our support team for assistance.</p>
          
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/book" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">Book Again</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function bookingCancelledTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
  reason?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#f59e0b;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Cancelled</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">Your booking <strong>#${data.bookingId}</strong> for <strong>${data.service}</strong> has been cancelled.</p>
          ${data.reason ? `<p style="color:#334155;font-size:16px;line-height:1.6;"><strong>Reason:</strong> ${data.reason}</p>` : ""}
          <p style="color:#334155;font-size:16px;line-height:1.6;">If this was a mistake, you can always book a new consultation.</p>
          
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/book" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">Book New Consultation</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function bookingRescheduledTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
  newDate: string;
  newTime: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#8b5cf6;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Rescheduled</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">Your booking <strong>#${data.bookingId}</strong> has been rescheduled.</p>
          
          <div style="background:#f5f3ff;border:1px solid #ddd6fe;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">New Date</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.newDate}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">New Time</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.newTime}</td>
              </tr>
            </table>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/account/bookings" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">View Booking Details</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function bookingCompletedTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#059669;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Completed</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">Your consultation for <strong>${data.service}</strong> (Booking #${data.bookingId}) has been marked as completed.</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">We hope the session was valuable. If you have any feedback or need further assistance, please don't hesitate to reach out.</p>
          
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/account/bookings" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">View My Bookings</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function adminNewBookingTemplate(data: {
  bookingId: string;
  name: string;
  email: string;
  service: string;
  date: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#7c3aed;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">New Booking Request</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">A new booking has been submitted and requires your review.</p>
          
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Booking ID</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.bookingId}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Client</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.name} (${data.email})</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Service</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.service}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Preferred Date</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.date}</td>
              </tr>
            </table>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/admin" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">Review Booking</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function bookingReminderTemplate(data: {
  name: string;
  bookingId: string;
  service: string;
  date: string;
  time: string;
  meetingType?: string;
  meetingLink?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#0ea5e9;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Booking Reminder</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">This is a friendly reminder about your upcoming consultation.</p>
          
          <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Service</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.service}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Date</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Time</td>
                <td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.time}</td>
              </tr>
              ${data.meetingType ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Type</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.meetingType}</td></tr>` : ""}
            </table>
          </div>

          ${data.meetingLink ? `
          <div style="text-align:center;margin:24px 0;">
            <a href="${data.meetingLink}" style="background:#0ea5e9;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">Join Meeting</a>
          </div>
          ` : ""}

          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/account/bookings" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">View Booking Details</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
