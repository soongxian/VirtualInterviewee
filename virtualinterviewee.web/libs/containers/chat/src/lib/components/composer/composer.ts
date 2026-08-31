import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'lib-composer',
  imports: [
    FormsModule,
    TextFieldModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
  ],
  templateUrl: './composer.html',
  styleUrl: './composer.scss',
})
export class Composer {
  readonly $disabled = input(false);
  readonly send = output<string>();

  protected readonly $draft = signal('');

  onSend(): void {
    const value = this.$draft().trim();
    if (!value || this.$disabled()) {
      return;
    }
    this.send.emit(value);
    this.$draft.set('');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
