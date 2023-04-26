import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

import { SendEmail } from './src/app/services/send-email';
import { NodeMailerProvider } from './src/infra/nodemailer/nodemailer-provider';
import { CreateNotificationConsumer } from './src/infra/rabbitmq/consumers/create-notification-consumer';
import { getRabbitMqConnection } from './src/infra/rabbitmq/rabbitmq-connection';

async function main() {
  const rabbitMqConnection = await getRabbitMqConnection();

  const notificationCreatedChannel = await rabbitMqConnection.createChannel();
  await notificationCreatedChannel.assertQueue('create-notification');
  const emailProvider = new NodeMailerProvider();
  const sendNotificationProvider = new SendEmail(emailProvider);
  const createNotificationConsumer = new CreateNotificationConsumer(
    notificationCreatedChannel,
    sendNotificationProvider,
  );
  await notificationCreatedChannel.consume('create-notification', (msg) =>
    createNotificationConsumer.consume(msg),
  );
  console.log(
    'Notification sender is running and listening to create-notification messages',
  );
}
main();
