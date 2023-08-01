import { Recipient } from '@application/entities/recipient';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { InMemoryRecipientsRepository } from '@test/repositories/in-memory-recipients-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('Should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const recipientsRepository = new InMemoryRecipientsRepository();
    const sendNotification = new SendNotification(
      notificationsRepository,
      recipientsRepository,
    );

    recipientsRepository.recipients = [
      new Recipient(
        {
          email: 'email@email.com',
          name: 'John Doe',
        },
        'aaaa',
      ),
    ];

    const { notification } = await sendNotification.do({
      category: 'social',
      content: 'Some content here',
      recipientId: 'aaaa',
    });

    expect(notificationsRepository.notifications.length).toBeGreaterThan(0);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
