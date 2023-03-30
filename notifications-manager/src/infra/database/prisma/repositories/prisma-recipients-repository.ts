import { Injectable } from "@nestjs/common";

import { Recipient } from "@application/entities/recipient";
import { RecipientsRepository } from "../../../../application/repositories/recipients-repository";
import { PrismaService } from "../prisma.service";

import { PrismaRecipientMapper } from "@infra/mappers/prisma-recipient-mapper";

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(private readonly prismaService: PrismaService) { }
  async create(recipient: Recipient): Promise<void> {
    await this.prismaService.recipient.create({
      data: PrismaRecipientMapper.toPrisma(recipient),
    });
  }
  async findById(recipientId: string): Promise<Recipient | undefined> {
    const foundRawRecipient = await this.prismaService.recipient.findUnique({
      where: {
        id: recipientId,
      },
    });

    if (!foundRawRecipient) {
      return undefined;
    }
    return PrismaRecipientMapper.toDomain(foundRawRecipient);
  }
  async delete(recipientId: string): Promise<void> {
    await this.prismaService.recipient.delete({
      where: {
        id: recipientId,
      },
    });
  }

}
