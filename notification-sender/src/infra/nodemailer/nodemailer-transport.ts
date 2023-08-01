import { createTransport, Transporter, type SentMessageInfo } from 'nodemailer';

let transport: Transporter<SentMessageInfo>;

export function getNodemailerTransport() {
  if (transport) {
    return transport;
  }
  if (
    !process.env.SENDER_EMAIL_ADDRESS ||
    !process.env.SENDER_EMAIL_PASSWORD ||
    !process.env.SENDER_EMAIL_HOST ||
    !process.env.SENDER_EMAIL_PORT
  ) {
    throw new Error('No email credentials were providen');
  }

  transport = createTransport({
    host: process.env.SENDER_EMAIL_HOST,
    port: Number(process.env.SENDER_EMAIL_PORT),
    auth: {
      user: process.env.SENDER_EMAIL_ADDRESS,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });
  return transport;
}
