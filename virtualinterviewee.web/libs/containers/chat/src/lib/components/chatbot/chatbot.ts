import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { catchError, finalize, of, tap } from 'rxjs';
import { QuestionApiService } from '../../services';

interface ChatMessage {
  role: 'user' | 'system';
  content: string;
}

@Component({
  selector: 'lib-chatbot',
  imports: [FormsModule, NzInputModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot {
  private readonly interviewApi = inject(QuestionApiService);

  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly draftQuestion = signal('');
  protected readonly isAsking = signal(false);

  askQuestion(): void {
    const question = this.draftQuestion().trim();
    if (!question || this.isAsking()) {
      return;
    }

    this.pushMessage('user', question);
    this.draftQuestion.set('');
    this.isAsking.set(true);

    this.interviewApi
      .question(question)
      .pipe(
        tap((response) => this.pushMessage('system', response.answer)),
        catchError(() => {
          this.pushMessage(
            'system',
            'Something went wrong answering that question.',
          );
          return of(null);
        }),
        finalize(() => this.isAsking.set(false)),
      )
      .subscribe();
  }

  private pushMessage(role: ChatMessage['role'], content: string): void {
    this.messages.update((current) => [...current, { role, content }]);
  }
}
