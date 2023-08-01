import { FindRecipient } from '../../application/use-cases/find-recipient';

import { InMemoryRecipientsRepository } from '../../../test/repositories/in-memory-recipients-repository';
import { Recipient } from '@application/entities/recipient';

describe("Find recipient test", () => {
  it('Should be able to find a existing recipient', async () => {
    const recipientsRepository = new InMemoryRecipientsRepository();
    const findRecipient = new FindRecipient(recipientsRepository);

    const existingRecipient = new Recipient({name: "John Doe", email: "email@email.com"});
    recipientsRepository.recipients = [existingRecipient];

    await expect(findRecipient.do(existingRecipient.id)).resolves.not.toThrow();
    await expect(findRecipient.do('aaaa')).rejects.toThrow();
  });
});
