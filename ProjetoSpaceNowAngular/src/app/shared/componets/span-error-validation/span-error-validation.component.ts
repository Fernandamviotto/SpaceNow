import { Component, Input } from "@angular/core";

@Component({
  selector: "app-span-error-validation",
  template: `
    <span *ngIf="showError" class="text-danger small">
      {{ message }}
    </span>
  `,
  styles: [
    `
      .text-danger {
        color: #dc3545;
        font-size: 0.8rem;
      }
    `,
  ],
})
export class SpanErrorValidationComponent {
  @Input() showError: boolean = false;
  @Input() message: string = "";
}
