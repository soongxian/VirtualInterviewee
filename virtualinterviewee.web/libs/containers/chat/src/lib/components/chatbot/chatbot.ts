import {
  Component,
  ElementRef,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { catchError, finalize, of, tap } from 'rxjs';
import { Sidebar } from '../sidebar/sidebar';
import { Message } from '../message/message';
import { Composer } from '../composer/composer';
import { ConversationStore, QuestionApiService } from '../../services';

@Component({
  selector: 'lib-chatbot',
  imports: [NzAlertModule, NzIconModule, Sidebar, Message, Composer],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot {
  private readonly interviewApi = inject(QuestionApiService);
  protected readonly store = inject(ConversationStore);

  @ViewChild('scrollAnchor') private scrollAnchor?: ElementRef<HTMLElement>;

  protected readonly $sidebarCollapsed = signal(false);
  protected readonly $isAsking = signal(false);
  protected readonly $errorMessage = signal<string | null>(null);

  protected readonly $messages = computed(() => this.store.getActiveMessages());

  constructor() {
    afterNextRender({ write: () => this.scrollToBottom() });
  }

  newChat(): void {
    this.store.startNewConversation();
    this.$errorMessage.set(null);
  }

  selectConversation(id: string): void {
    this.store.selectConversation(id);
    this.$errorMessage.set(null);
  }

  deleteConversation(id: string): void {
    this.store.deleteConversation(id);
    this.$errorMessage.set(null);
  }

  askQuestion(question: string): void {
    this.$errorMessage.set(null);
    this.store.addUserMessage(question);
    this.$isAsking.set(true);
    this.scrollToBottom();

    this.interviewApi
      .question(question)
      .pipe(
        tap((response) => this.store.addMessage(response.answer)),
        catchError(() => {
          this.$errorMessage.set(
            'Something went wrong answering that question. Please try again.',
          );
          return of(null);
        }),
        finalize(() => {
          this.$isAsking.set(false);
          this.scrollToBottom();
        }),
      )
      .subscribe();
  }

  private scrollToBottom(): void {
    queueMicrotask(() =>
      this.scrollAnchor?.nativeElement.scrollIntoView?.({
        behavior: 'smooth',
      }),
    );
  }
}
