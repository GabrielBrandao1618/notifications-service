import { EmailProvider } from "../../app/providers/email-provider";

export class ElasticEmailProvider implements EmailProvider {
  apiKey?: string;
  apiUrl: string;

  constructor() {
    this.apiKey = process.env.ELASTIC_EMAIL_API_KEY;
    if(!this.apiKey) {
      throw new Error("Elastic email api key undefined");
    }
    this.apiUrl = `https://api.elasticemail.com/v2/email/send?apikey=${this.apiKey}`
  }
  async sendEmail(content: string, to: string): Promise<void> {
    await fetch(`${this.apiUrl}&content=${content}&to=${to}`);
  }
}
