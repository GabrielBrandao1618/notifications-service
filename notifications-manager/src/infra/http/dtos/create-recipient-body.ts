import { IsString, Length, IsEmail } from "class-validator";

export class CreateRecipientBody {
  @IsString()
  @Length(4, 64)
  name: string;
  @IsString()
  @IsEmail()
  email: string;
}
