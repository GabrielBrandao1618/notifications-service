export interface ISendEmailParams {
  subject: string;
  content: string;
  from: string;
  to: string;
}

export abstract class EmailProvider {
  abstract sendEmail(params: ISendEmailParams): Promise<void>;
}
