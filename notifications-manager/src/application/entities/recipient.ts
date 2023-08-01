import { validateEmail } from "@application/utils/validate-email";
import { randomUUID } from "node:crypto";

interface IRecipientProps {
  email: string;
  name: string;
}

export class Recipient {
  _id: string;
  _props: IRecipientProps;
  constructor(props: IRecipientProps, id?: string) {
    if(props.name.length > 64) {
      throw new Error("User name must have at maximum 64 characters");
    }
    if(props.name.length < 4) {
      throw new Error("User name must have at least 4 characters");
    }
    if(!validateEmail(props.email)) {
      throw new Error("Invalid email");
    }
    this._id = id?? randomUUID();
    this._props = props;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._props.name;
  }
  get email() {
    return this._props.email;
  }
}
