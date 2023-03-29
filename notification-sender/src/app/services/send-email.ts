import { EmailProvider } from '../providers/email-provider';

export class SendEmail {
  constructor(private readonly emailProvider: EmailProvider) { }
  run(title: string, content: string) {
    this.emailProvider.sendEmail(title, content);
  }
}
