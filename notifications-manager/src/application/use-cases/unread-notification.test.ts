import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.do({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeFalsy();
  });

  it('Shoul not be able to unread a non-existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() =>
      unreadNotification.do({
        notificationId: 'llll',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
