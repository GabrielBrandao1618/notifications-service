import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CreateRecipient } from '@application/use-cases/create-recipient';
import { RecipientsController } from './controllers/recipients.controller';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'create-notification-service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'create-notification',
        },
      },
    ]),
  ],
  controllers: [NotificationsController, RecipientsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CreateRecipient,
    {
      provide: 'create-notification-service',
      useValue: ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'create-notification',
        },
      }),
    },
  ],
})
export class HttpModule {}
