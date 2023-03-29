import { Recipient } from './recipient';


describe('Recipient entity tests', () => {
  it('Should create a valid recipient', () => {
    expect(() => {
      new Recipient({ name: 'John Doe', email: 'email@email.com' });
    }).not.toThrow();
  });
  it('Should not create a recipient given invalid data', () => {
    expect(() => {
      new Recipient({ name: 'a'.repeat(65), email: 'email@email.com' });
    }).toThrow();
    expect(() => {
      new Recipient({ name: 'a'.repeat(3), email: 'email@email.com' });
    }).toThrow();
    expect(() => {
      new Recipient({ name: "John Doe", email: 'a' });
    }).toThrow();
  });
});
