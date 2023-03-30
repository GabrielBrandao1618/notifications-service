import { CreateRecipient } from "@application/use-cases/create-recipient";
import { Controller, Post, Body } from "@nestjs/common";
import { CreateRecipientBody } from "../dtos/create-recipient-body";

@Controller({ path: 'recipient' })
export class RecipientsController {
  constructor(private readonly createRecipient: CreateRecipient) { }
  @Post()
  async handleCreateRecipient(@Body() req: CreateRecipientBody) {
    const recipient = await this.createRecipient.do(req.name, req.email);
    return recipient;
  }
}
