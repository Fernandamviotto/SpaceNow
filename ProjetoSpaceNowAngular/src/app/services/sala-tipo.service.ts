import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalaTipoModel } from '../Models/sala-tipo.model';

@Injectable({ providedIn: 'root' })
export class SalaTipoService {
  getAllTypesRooms(): Observable<any> {
  const sample: SalaTipoModel[] = [{ salaTipoId: 1, nomeTipo: 'Padrão', tiposSalaReservaConfiguracao: [], ids: [] }];
    return of({ result: sample });
  }
}
