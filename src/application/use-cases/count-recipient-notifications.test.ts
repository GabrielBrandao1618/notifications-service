import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('Should be able to count all recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    const notification1 = new Notification({
      category: 'social',
      content: new Content('Some content'),
      recipientId: 'aaaa',
    });
    const notification2 = new Notification({
      category: 'social',
      content: new Content('Some other content'),
      recipientId: 'aaaa',
    });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);

    const { count } = await countRecipientNotifications.do({
      recipientId: 'aaaa',
    });

    expect(count).toBe(2);
  });
});
