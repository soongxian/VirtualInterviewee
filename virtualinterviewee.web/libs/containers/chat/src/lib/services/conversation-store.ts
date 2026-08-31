import { Injectable, signal } from '@angular/core';
import { Conversation, ChatMessage } from '../models/chat.models';

const MAX_TITLE_LENGTH = 48;

@Injectable({ providedIn: 'root' })
export class ConversationStore {
  private readonly $conversationsWritable = signal<Conversation[]>([]);
  private readonly $activeIdWritable = signal<string | null>(null);

  readonly $conversations = this.$conversationsWritable.asReadonly();
  readonly $activeId = this.$activeIdWritable.asReadonly();

  startNewConversation(): void {
    this.$activeIdWritable.set(null);
  }

  selectConversation(id: string): void {
    this.$activeIdWritable.set(id);
  }

  deleteConversation(id: string): void {
    this.$conversationsWritable.update((current) =>
      current.filter((c) => c.id !== id),
    );
    if (this.$activeIdWritable() === id) {
      this.$activeIdWritable.set(null);
    }
  }

  getActiveMessages(): ChatMessage[] {
    const id = this.$activeIdWritable();
    return (
      this.$conversationsWritable().find((c) => c.id === id)?.messages ?? []
    );
  }

  addUserMessage(content: string): void {
    const id =
      this.$activeIdWritable() ??
      (() => {
        const newId = crypto.randomUUID();
        const conversation: Conversation = {
          id: newId,
          title: content.slice(0, MAX_TITLE_LENGTH),
          messages: [],
          createdAt: Date.now(),
        };
        this.$conversationsWritable.update((current) => [
          conversation,
          ...current,
        ]);
        this.$activeIdWritable.set(newId);
        return newId;
      })();

    this.appendMessage(id, {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    });
  }

  addMessage(content: string, error = false): void {
    const id = this.$activeIdWritable();
    if (!id) {
      return;
    }
    this.appendMessage(id, {
      id: crypto.randomUUID(),
      role: 'system',
      content,
      error,
    });
  }

  private appendMessage(conversationId: string, message: ChatMessage): void {
    this.$conversationsWritable.update((current) =>
      current.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, message] }
          : c,
      ),
    );
  }
}
