import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get notifications', () => {
  it('Should be able to get all recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.do({
      recipientId: 'aaaa',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'aaaa' }),
        expect.objectContaining({ recipientId: 'aaaa' }),
      ]),
    );
  });
});
