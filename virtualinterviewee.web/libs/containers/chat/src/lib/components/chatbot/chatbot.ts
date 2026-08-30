import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'lib-chatbot',
  imports: [FormsModule, NzInputModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot {
  protected draft = '';
  protected isSending = false;
  protected messages: ChatMessage[] = [];

  protected readonly suggestions = [
    'Help me prepare for an interview',
    'Improve my answer to “Tell me about yourself”',
    'Give me a JavaScript coding question',
  ];

  protected useSuggestion(suggestion: string): void {
    this.draft = suggestion;
  }

  protected sendMessage(): void {
    const content = this.draft.trim();

    if (!content || this.isSending) {
      return;
    }

    this.messages = [...this.messages, { role: 'user', content }];
    this.draft = '';
    this.isSending = true;

    window.setTimeout(() => {
      this.messages = [
        ...this.messages,
        {
          role: 'assistant',
          content:
            'I can help with that. Tell me about the role you are preparing for, and we can practise a focused answer together.',
        },
      ];
      this.isSending = false;
    }, 10);
  }

  protected handleComposerKeydown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.sendMessage();
    }
  }
}
