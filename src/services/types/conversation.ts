export type Message = {
  message: string;
  from: string;
  to: string;
  createdAt: Date;
};

export interface Conversation {
  matchId: string;
  messages: Message[];
}
