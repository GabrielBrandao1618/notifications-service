import { Notification } from '../entities/notification';

import { EmailProvider } from '../providers/email-provider';
import { SendNotificationProvider } from '../providers/send-notification-provider';

export class SendEmail implements SendNotificationProvider {
  constructor(private readonly emailProvider: EmailProvider) { }
  async send(notification: Notification) {
    this.emailProvider.sendEmail(
      notification.content.value, notification.recipientEmail
    );
  }
}
