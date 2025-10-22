import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatDialog {
  open(component: any, config?: any) {
    return { afterClosed: () => ({ subscribe: (cb: any) => cb(true) }) };
  }
}
