import { Recipient } from '@application/entities/recipient';
import { RecipientsRepository } from '@application/repositories/recipients-repository';
import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}
interface SendNotificationResponse {
  notification: Notification;
  recipient: Recipient;
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly recipientsRepository: RecipientsRepository,
  ) {}
  async do(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
      createdAt: new Date(),
    });

    const targetRecipient = await this.recipientsRepository.findById(
      recipientId,
    );

    if (!targetRecipient) {
      throw new Error('Recipient not found');
    }

    await this.notificationsRepository.create(notification);

    return {
      notification: notification,
      recipient: targetRecipient,
    };
  }
}
