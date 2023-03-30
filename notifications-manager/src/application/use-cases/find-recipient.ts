import { Recipient } from '@application/entities/recipient';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { RecipientNotFound } from './errors/recipient-not-found';

export class FindRecipient {
  constructor(private readonly recipientsRepository: RecipientsRepository) { }

  async do(recipientId: string): Promise<Recipient> {
    const recipient = await this.recipientsRepository.findById(recipientId);
    if(!recipient) {
      throw new RecipientNotFound();
    }
    return recipient;
  }
}
