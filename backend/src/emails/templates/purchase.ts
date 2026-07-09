export function purchaseConfirmationTemplate(data: {
  name: string;
  articleTitle: string;
  amount: string;
  invoiceNumber: string;
  receiptUrl?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#7c3aed;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">Purchase Confirmed</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">Dear ${data.name},</p>
          <p style="color:#334155;font-size:16px;line-height:1.6;">Thank you! Your purchase was successful. You now have lifetime access to the premium article.</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Article</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.articleTitle}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Amount</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.amount}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Invoice</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.invoiceNumber}</td></tr>
            </table>
          </div>
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/account/purchased" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">Read Article</a>
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

export function adminPurchaseAlertTemplate(data: {
  name: string;
  articleTitle: string;
  amount: string;
  email: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#059669;padding:32px;text-align:center;">
          <h1 style="color:#ffffff;font-size:24px;margin:0;">New Purchase</h1>
        </div>
        <div style="padding:32px;">
          <p style="color:#334155;font-size:16px;line-height:1.6;">A new premium article purchase has been made.</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Customer</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.name} (${data.email})</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Article</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.articleTitle}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:14px;font-weight:bold;">Amount</td><td style="padding:8px 0;color:#1e293b;font-size:14px;">${data.amount}</td></tr>
            </table>
          </div>
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/premium" style="background:#7c3aed;color:#ffffff;padding:12px 32px;text-decoration:none;font-weight:bold;font-size:14px;">View Purchases</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:24px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated message.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
