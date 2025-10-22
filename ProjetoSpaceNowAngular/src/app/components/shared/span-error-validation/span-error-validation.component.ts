import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-span-error-validation',
  standalone: true,
  imports: [CommonModule],
  template: `<span *ngIf="showError" class="text-danger">{{ errorMessage }}</span>`,
})
export class SpanErrorValidationComponent {
  @Input() showError: boolean = false;
  @Input() errorMessage: string = '';
}
