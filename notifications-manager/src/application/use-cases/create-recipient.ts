import { Recipient } from '@application/entities/recipient';
import { RecipientsRepository } from '../repositories/recipients-repository';

export class CreateRecipient {
  constructor(private readonly recipientsRepository: RecipientsRepository) { }

  async do(name: string, email: string) {
    const recipient = new Recipient({ name, email });
    await this.recipientsRepository.create(recipient);
    return recipient;
  }
}
