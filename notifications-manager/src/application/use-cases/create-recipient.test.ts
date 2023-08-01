import { CreateRecipient } from './create-recipient';

import { InMemoryRecipientsRepository } from '../../../test/repositories/in-memory-recipients-repository';

describe("Create recipient tests", () => {
  it('Should be able to create a recipient', async () => {
    const recipientsRepository = new InMemoryRecipientsRepository();
    const createRecipient = new CreateRecipient(recipientsRepository);

    await createRecipient.do("John Doe", "email@email.com");
    expect(recipientsRepository.recipients).toHaveLength(1);
  });
});
