import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(public readonly prismaService: PrismaService) {}
  @Get()
  async list() {
    return await this.prismaService.notification.findMany();
  }
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    return await this.prismaService.notification.create({
      data: {
        content,
        category,
        recipientId,
      },
    });
  }
}
