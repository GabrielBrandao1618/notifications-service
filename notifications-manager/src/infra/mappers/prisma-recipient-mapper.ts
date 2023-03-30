import { Recipient as PrismaRecipient } from "@prisma/client";
import { Recipient } from "../../application/entities/recipient";

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient) {
    return new Recipient({
      name: raw.name,
      email: raw.email,
    }, raw.id);

  }
  static toPrisma(recipient: Recipient) {
    return {
      name: recipient.name,
      email: recipient.email,
      id: recipient.id,
    };

  }
}
