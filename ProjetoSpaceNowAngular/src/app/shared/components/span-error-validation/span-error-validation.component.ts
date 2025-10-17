import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-span-error-validation',
  standalone: true,
  imports: [CommonModule],
  template: `<span *ngIf="showError" class="error-message">{{ errorMessage }}</span>`,
  styles: [`.error-message{ color:#dc3545; font-size:0.875rem;}`]
})
export class SpanErrorValidationComponent {
  @Input() showError: boolean = false;
  @Input() errorMessage: string = '';
}
