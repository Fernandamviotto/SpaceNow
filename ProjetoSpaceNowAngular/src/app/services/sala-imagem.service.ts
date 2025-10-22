import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalaImagemService {
  delete(imageId: number): Observable<any> {
    return of({ result: true });
  }
}
