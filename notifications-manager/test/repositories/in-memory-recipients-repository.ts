import { Recipient } from '@application/entities/recipient';
import { RecipientsRepository } from '../../src/application/repositories/recipients-repository';

export class InMemoryRecipientsRepository implements RecipientsRepository {
  recipients: Recipient[] = [];
  async create(recipient: Recipient): Promise<void> {
    this.recipients.push(recipient);
  }
  async delete(recipientId: string): Promise<void> {
    this.recipients = this.recipients.filter(recipient => recipient.id !== recipientId);
  }
  async findById(recipientId: string): Promise<Recipient | undefined> {
    return this.recipients.find(recipient => recipient.id === recipientId);
  }
}
