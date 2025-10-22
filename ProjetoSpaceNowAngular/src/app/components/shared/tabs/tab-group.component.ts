import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class TabGroupComponent {
  @Output() selectedTabChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() selectedIndex: number = 0;
}
