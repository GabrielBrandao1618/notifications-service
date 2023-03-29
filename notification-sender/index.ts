import { Notification } from './src/app/entities/notification';
import { getRabbitMqConnection } from './src/infra/rabbitmq/rabbitmq-connection';

async function main() {
  const rabbitMqConnection = await getRabbitMqConnection();

  const notificationCreatedChannel = await rabbitMqConnection.createChannel();
  await notificationCreatedChannel.assertQueue("create-notification");
  notificationCreatedChannel.consume("create-notification", (msg) => {
    if(msg) {
      const msgRawContent = msg.content.toString();
      const parsedMsg = Notification.fromRawJson(msgRawContent);
      console.log(parsedMsg);
      notificationCreatedChannel.ack(msg);
    }
  });
}
main();
