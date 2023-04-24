import { SentMessageInfo, Transporter } from 'nodemailer';
import {
  EmailProvider,
  ISendEmailParams,
} from '../../app/providers/email-provider';

import { getNodemailerTransport } from './nodemailer-transport';

export class NodeMailerProvider implements EmailProvider {
  transport: Transporter<SentMessageInfo>;

  constructor() {
    this.transport = getNodemailerTransport();
  }
  async sendEmail({ content, from, subject, to }: ISendEmailParams) {
    await this.transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: content,
    });
  }
}
