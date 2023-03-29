import { SendEmail } from './src/app/services/send-email';
import { ElasticEmailProvider } from './src/infra/elastic-email/elastic-email-provider';
import { CreateNotificationConsumer } from './src/infra/rabbitmq/consumers/create-notification-consumer';
import { getRabbitMqConnection } from './src/infra/rabbitmq/rabbitmq-connection';

async function main() {
  const rabbitMqConnection = await getRabbitMqConnection();

  const notificationCreatedChannel = await rabbitMqConnection.createChannel();
  await notificationCreatedChannel.assertQueue("create-notification");
  const emailProvider = new ElasticEmailProvider();
  const sendNotificationProvider = new SendEmail(emailProvider);
  const createNotificationConsumer = new CreateNotificationConsumer(
    notificationCreatedChannel,
    sendNotificationProvider
  );
  notificationCreatedChannel.consume("create-notification", createNotificationConsumer.consume);
}
main();
