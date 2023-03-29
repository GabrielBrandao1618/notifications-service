import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotification,
    private readonly getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.do({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.do({
      notificationId: id,
    });
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.do({
      notificationId: id,
    });
  }
  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{
    count: number;
  }> {
    const { count } = await this.countRecipientNotifications.do({
      recipientId: recipientId,
    });
    return {
      count,
    };
  }
  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.do({
      recipientId: recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.do({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
