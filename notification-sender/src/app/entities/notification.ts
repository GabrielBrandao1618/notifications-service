import { randomUUID } from 'node:crypto';

import { Replace } from '../../helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date;
  recipientEmail: string;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  static fromRawJson(raw: string) {
    const parsed: IParsedJsonNotification = JSON.parse(raw);
    return new Notification({
      ...parsed,
      createdAt: parsed.createdAt ? new Date(parsed.createdAt) : undefined,
      content: new Content(parsed.content),
    });
  }

  set content(content: Content) {
    this.props.content = content;
  }
  get content() {
    return this.props.content;
  }
  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }
  get recipientId() {
    return this.props.recipientId;
  }
  set category(category: string) {
    this.props.category = category;
  }
  get category() {
    return this.props.category;
  }
  public read() {
    this.props.readAt = new Date();
  }
  public unread() {
    this.props.readAt = null;
  }
  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get id() {
    return this._id;
  }

  get recipientEmail() {
    return this.props.recipientEmail;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  get canceledAt() {
    return this.props.canceledAt;
  }
}

export interface IParsedJsonNotification {
  content: string;
  category: string;
  recipientId: string;
  createdAt?: Date;
  readAt?: Date;
  canceledAt?: Date;
  recipientEmail: string;
}
