import { Injectable } from '@nestjs/common';

import { Recipient } from '@application/entities/recipient';
import { RecipientsRepository } from '../repositories/recipients-repository';
import { RecipientNotFound } from './errors/recipient-not-found';

@Injectable()
export class FindRecipient {
  constructor(private readonly recipientsRepository: RecipientsRepository) { }

  async do(recipientId: string): Promise<Recipient> {
    const recipient = await this.recipientsRepository.findById(recipientId);
    if (!recipient) {
      throw new RecipientNotFound();
    }
    return recipient;
  }
}
