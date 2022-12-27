export type Message = {
  message: string;
  from: string;
  to: string;
  createdAt: Date;
};

export type Unread = {
  userId: string;
  messages: string[];
};

export interface Conversation {
  matchId: string;
  messages: Message[];
  unread: Unread[];
}
