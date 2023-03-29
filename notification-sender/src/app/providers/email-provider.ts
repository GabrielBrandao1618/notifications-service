export abstract class EmailProvider {
  abstract sendEmail(title: string, content: string): Promise<void>;
}
