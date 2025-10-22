import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalaModel } from '../Models/sala.model';

@Injectable({ providedIn: 'root' })
export class SalaService {
  id: any = null;

  getConsultaGrid(filter: any, page: number, pageSize: number, ativas: boolean): Observable<any> {
    const sample: SalaModel[] = [];
    const pagination = { totalRows: 0, pageNumber: page };
    return of({ result: sample, pagination });
  }

  getRoomById(id: any, includeDetails = false): Observable<any> {
    const sample: SalaModel = new SalaModel();
    sample.salaId = id || 1;
    sample.apelido = 'Sala Exemplo';
    return of({ result: sample });
  }

  insert(sala: SalaModel): Observable<any> {
    return of({ result: sala });
  }

  update(id: number, sala: SalaModel): Observable<any> {
    return of({ result: sala });
  }

  alterarSalaAtiva(flag: boolean, salaId: number, alias: string, nome: string): Observable<any> {
    return of({ result: true });
  }
}
