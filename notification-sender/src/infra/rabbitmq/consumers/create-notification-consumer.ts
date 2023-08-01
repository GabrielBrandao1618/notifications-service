import { Channel, ConsumeMessage } from 'amqplib';
import { Notification } from '../../../app/entities/notification';
import { SendNotificationProvider } from '../../../app/providers/send-notification-provider';

export class CreateNotificationConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly sendNotification: SendNotificationProvider,
  ) {}

  async consume(msg: ConsumeMessage | null) {
    if (msg) {
      const strMsg = msg.content.toString();
      const msgData = JSON.parse(strMsg).data;

      const notification = new Notification(msgData);
      this.sendNotification.send(notification);
      this.channel.ack(msg);
    }
  }
}
