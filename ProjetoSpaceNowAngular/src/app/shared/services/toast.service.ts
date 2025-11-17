import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: string[] = [];
  show(msg: string, ttl = 3000) {
    this.toasts.push(msg);
    setTimeout(() => this.toasts.shift(), ttl);
  }
}
