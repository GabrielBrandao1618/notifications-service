import { describe, it, expect } from 'vitest';

import { IParsedJsonNotification, Notification } from './notification';

describe('Notification entity tests', () => {
  it('Should parse from JSON to notification correctly', async () => {
    const createdAt = new Date();
    const data: IParsedJsonNotification = {
      content: 'Content',
      category: 'news',
      recipientId: 'aaaa',
      createdAt: createdAt,
      recipientEmail: 'email@email.com',
    };
    const json = JSON.stringify(data);
    const notification = Notification.fromRawJson(json)
    expect(notification.category).toBe("news");
    expect(notification.recipientId).toBe("aaaa");
    expect(notification.createdAt).toEqual(createdAt);
  });
});
