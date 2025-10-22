import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RecursoModel } from '../Models/recurso.model';

@Injectable({ providedIn: 'root' })
export class RecursoService {
  getAll(): Observable<any> {
    const sample: RecursoModel[] = [{ recursoId: 1, nomeRecurso: 'Projetor' }];
    return of({ result: sample });
  }
}
