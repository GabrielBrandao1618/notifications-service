import { Controller, Post, Body } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.do({
      content,
      category,
      recipientId,
    });

    return {
      notification,
    };
  }
}
