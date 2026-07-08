export function verifyEmailTemplate(url: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
      <div style="background: #7c3aed; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">safetyanswers</h1>
      </div>
      <div style="padding: 32px 24px; background: #ffffff; border: 1px solid #e2e8f0;">
        <h2 style="margin: 0 0 16px; font-size: 18px; color: #0f172a;">Verify Your Email</h2>
        <p style="color: #475569; line-height: 1.6; font-size: 14px;">
          Thank you for creating an account. Please click the button below to verify your email address.
        </p>
        <div style="text-align: center; margin: 28px 0;">
          <a href="${url}" style="background: #7c3aed; color: white; padding: 12px 32px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Verify Email</a>
        </div>
        <p style="color: #475569; font-size: 12px; line-height: 1.6;">
          If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${url}" style="color: #7c3aed;">${url}</a>
        </p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
          This link expires in 24 hours.
        </p>
      </div>
      <div style="padding: 16px 24px; text-align: center; color: #94a3b8; font-size: 11px;">
        &copy; ${new Date().getFullYear()} safetyanswers. All rights reserved.
      </div>
    </div>
  `;
}
