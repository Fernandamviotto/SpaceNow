import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AndarModel } from '../Models/andar.model';

@Injectable({ providedIn: 'root' })
export class AndarService {
  getAll(sala: any): Observable<any> {
    const sample: AndarModel[] = [
  { andarId: 1, apelido: '1º Andar', predio: { predioId: 1, nome: 'Prédio A', endereco: 'Rua A, 123', ids: [] }, ids: [] }
    ];
    return of({ result: sample });
  }
}
