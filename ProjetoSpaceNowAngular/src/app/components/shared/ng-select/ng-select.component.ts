import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-select',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="ng-select-stub"><ng-content></ng-content></div>`,
})
export class NgSelectStubComponent {
  @Input() items: any;
  @Input() multiple: boolean = false;
  @Input() placeholder?: string;
  @Input() bindLabel?: string;
  @Input() bindValue?: string;
  @Input() groupBy?: string;
  @Input() class?: string;

  @Input('ngModel') ngModel: any;
  @Output('ngModelChange') ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
}
