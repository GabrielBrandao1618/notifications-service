import { Content } from './content';

describe('Notification content', () => {
  it('Should be able to create a notification content', () => {
    const content = new Content('Some content');

    expect(content).toBeTruthy();
  });
  it('Should not be able to create a notification content since there is less than 5 characters', () => {
    expect(() => new Content('So')).toThrow();
  });
  it('Should not be able to create a notification content since there is more than 240 characters', () => {
    expect(() => new Content('So'.repeat(121))).toThrow();
  });
});
