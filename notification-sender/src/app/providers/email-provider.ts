export abstract class EmailProvider {
  abstract sendEmail(content: string, to: string): Promise<void>;
}
