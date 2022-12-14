import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CountRecipientNotificationRequest {
  recipientId: string;
}
interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(public notificationsRepository: NotificationsRepository) {}
  async do({
    recipientId,
  }: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );
    return {
      count: count,
    };
  }
}
