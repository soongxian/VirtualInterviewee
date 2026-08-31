import {
  Component,
  computed,
  inject,
  input,
  SecurityContext,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { ChatMessage } from '../../models/chat.models';

marked.setOptions({ breaks: true, gfm: true });

@Component({
  selector: 'lib-message',
  imports: [NzAvatarModule, NzIconModule, NzTooltipModule],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  readonly $message = input.required<ChatMessage>();

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly $copied = signal(false);
  protected readonly $renderedContent = computed(
    () =>
      this.sanitizer.sanitize(
        SecurityContext.HTML,
        marked.parse(this.$message().content, { async: false }),
      ) ?? '',
  );

  async copyContent(): Promise<void> {
    await navigator.clipboard.writeText(this.$message().content);
    this.$copied.set(true);
    setTimeout(() => this.$copied.set(false), 1500);
  }
}
