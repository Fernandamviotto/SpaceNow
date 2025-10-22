import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagination-controls',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="pagination-controls"><button (click)="change(-1)">Anterior</button><button (click)="change(1)">Próximo</button></div>`,
})
export class PaginationControlsComponent {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() previousLabel?: string;
  @Input() nextLabel?: string;

  change(delta: number) {
    this.pageChange.emit(delta);
  }
}
