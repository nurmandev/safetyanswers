import nodemailer from "nodemailer";
import { config } from "../config";
import { logger } from "../utils/logger";
import { passwordResetTemplate } from "../emails/templates/passwordReset";
import {
  bookingSubmittedTemplate,
  bookingApprovedTemplate,
  bookingRejectedTemplate,
  bookingCancelledTemplate,
  bookingRescheduledTemplate,
  bookingCompletedTemplate,
  adminNewBookingTemplate,
  bookingReminderTemplate,
} from "../emails/templates/booking";
import {
  purchaseConfirmationTemplate,
  adminPurchaseAlertTemplate,
} from "../emails/templates/purchase";

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

async function sendMail(to: string, subject: string, html: string) {
  if (config.isDev) {
    logger.info(`[DEV EMAIL] To: ${to} | Subject: ${subject}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"safetyanswers" <${config.smtp.from}>`,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Failed to send email to ${to}`, { error });
  }
}

export const EmailService = {
  async sendPasswordResetEmail(email: string, token: string) {
    const url = `${config.frontendUrl}/reset-password?token=${token}`;
    await sendMail(email, "Reset your password", passwordResetTemplate(url));
  },

  async sendBookingSubmitted(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
    date: string;
    time: string;
  }) {
    await sendMail(
      data.email,
      `Booking Confirmation - ${data.bookingId}`,
      bookingSubmittedTemplate(data)
    );
  },

  async sendBookingApproved(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
    date: string;
    time: string;
    consultant?: string;
    meetingType?: string;
    meetingLink?: string;
  }) {
    await sendMail(
      data.email,
      `Booking Approved - ${data.bookingId}`,
      bookingApprovedTemplate(data)
    );
  },

  async sendBookingRejected(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
    reason?: string;
  }) {
    await sendMail(
      data.email,
      `Booking Update - ${data.bookingId}`,
      bookingRejectedTemplate(data)
    );
  },

  async sendBookingCancelled(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
    reason?: string;
  }) {
    await sendMail(
      data.email,
      `Booking Cancelled - ${data.bookingId}`,
      bookingCancelledTemplate(data)
    );
  },

  async sendBookingRescheduled(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
    newDate: string;
    newTime: string;
  }) {
    await sendMail(
      data.email,
      `Booking Rescheduled - ${data.bookingId}`,
      bookingRescheduledTemplate(data)
    );
  },

  async sendBookingCompleted(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
  }) {
    await sendMail(
      data.email,
      `Booking Completed - ${data.bookingId}`,
      bookingCompletedTemplate(data)
    );
  },

  async sendAdminNewBooking(data: {
    email: string;
    bookingId: string;
    name: string;
    service: string;
    date: string;
  }) {
    await sendMail(
      data.email,
      `New Booking Request - ${data.bookingId}`,
      adminNewBookingTemplate(data)
    );
  },

  async sendPurchaseConfirmation(data: {
    email: string;
    name: string;
    articleTitle: string;
    amount: string;
    invoiceNumber: string;
  }) {
    await sendMail(data.email, `Purchase Confirmed - ${data.articleTitle}`, purchaseConfirmationTemplate(data));
  },

  async sendAdminPurchaseAlert(data: {
    email: string;
    name: string;
    articleTitle: string;
    amount: string;
  }) {
    await sendMail(data.email, `New Purchase: ${data.articleTitle}`, adminPurchaseAlertTemplate(data));
  },

  async sendBookingReminder(data: {
    email: string;
    name: string;
    bookingId: string;
    service: string;
    date: string;
    time: string;
    meetingType?: string;
    meetingLink?: string;
  }) {
    await sendMail(
      data.email,
      `Booking Reminder - ${data.bookingId}`,
      bookingReminderTemplate(data)
    );
  },
};
