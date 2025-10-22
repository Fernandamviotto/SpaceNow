import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PredioModel } from '../Models/predio.model';

@Injectable({ providedIn: 'root' })
export class PredioService {
  getAll(): Observable<any> {
  const sample: PredioModel[] = [{ predioId: 1, nome: 'Prédio A', apelido: 'A', endereco: 'Rua A, 123', ids: [] }];
    return of({ result: sample });
  }
}
