import { Notification } from '../entities/notification';

export abstract class SendNotificationProvider {
  abstract send(notification: Notification): Promise<void>;
}
