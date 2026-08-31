export interface ChatMessage {
  id: string;
  role: 'user' | 'system';
  content: string;
  error?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}
