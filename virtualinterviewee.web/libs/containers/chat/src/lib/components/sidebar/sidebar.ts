import { Component, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { Conversation } from '../../models/chat.models';

@Component({
  selector: 'lib-sidebar',
  imports: [NzButtonModule, NzIconModule, NzTooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly $conversations = input.required<Conversation[]>();
  readonly $activeId = input<string | null>(null);
  readonly $collapsed = input(false);

  readonly newChat = output<void>();
  readonly selectConversation = output<string>();
  readonly deleteConversation = output<string>();
  readonly toggleCollapsed = output<void>();
}
