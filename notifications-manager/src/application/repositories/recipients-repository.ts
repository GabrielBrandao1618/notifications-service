import { Recipient } from "../entities/recipient";

export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>;
  abstract delete(recipientId: string): Promise<void>;
  abstract findById(recipientId: string): Promise<Recipient | undefined>;
}
