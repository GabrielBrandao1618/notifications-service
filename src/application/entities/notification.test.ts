import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('Should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('New offer'),
      category: 'social',
      recipientId: 'aaaa',
      createdAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
