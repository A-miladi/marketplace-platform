interface UserMessage {
  id: number;
  full_name: string;
  avatar: string;
}

export type Message = {
  id: number;
  text: string;
  sender_id: number;
  created_at: string;
  read_at: boolean | null;
};

export type Chat = {
  id: string;
  user: UserMessage;
  messages: Message[];
  created_at: string;
};

export interface NewMessageRequest {
  text: string;
  chat_user_id: number;
}

export interface ReadMessageRequest {
  messages_ids: number | null[];
}
