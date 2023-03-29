import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}
type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(public notificationsRepository: NotificationsRepository) {}
  async do({
    notificationId,
  }: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();
    await this.notificationsRepository.save(notification);
  }
}
