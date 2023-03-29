import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('Should be able to count all recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'aaaa',
      }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'aaaa',
      }),
    );
    await notificationsRepository.create(
      makeNotification({
        recipientId: 'bbbb',
      }),
    );

    const { count } = await countRecipientNotifications.do({
      recipientId: 'aaaa',
    });

    expect(count).toBe(2);
  });
});
