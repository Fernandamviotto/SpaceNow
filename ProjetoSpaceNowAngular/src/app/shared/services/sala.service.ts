import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResponseModel } from '../models/pagination-response.model';
import { SalaModel } from '../models/sala.model';

@Injectable({ providedIn: 'root' })
export class SalaService {
  getAll() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:5000/api/salas';

  constructor(private http: HttpClient) {}

  getSalas(page = 1, itemsPerPage = 10, filters?: any): Observable<PaginationResponseModel<SalaModel>> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('itemsPerPage', String(itemsPerPage));

    if (filters) {
      if (filters.predios) params = params.set('predios', JSON.stringify(filters.predios));
      if (filters.andares) params = params.set('andares', JSON.stringify(filters.andares));
      if (filters.tiposDeSala) params = params.set('tiposDeSala', JSON.stringify(filters.tiposDeSala));
      if (filters.salas) params = params.set('salas', JSON.stringify(filters.salas));
      if (filters.ativas !== undefined) params = params.set('ativas', String(filters.ativas));
    }

    return this.http.get<PaginationResponseModel<SalaModel>>(this.baseUrl, { params });
  }

  getById(id: number) {
    return this.http.get<SalaModel>(`${this.baseUrl}/${id}`);
  }

  create(sala: SalaModel) {
    return this.http.post<SalaModel>(this.baseUrl, sala);
  }

  update(sala: SalaModel) {
    return this.http.put<void>(`${this.baseUrl}/${sala.salaId}`, sala);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  save(sala: SalaModel): Observable<any> {
    return this.http.post(this.baseUrl, sala);
  }
  subscribe(arg0: (res: any) => void) {
    
    throw new Error('Method not implemented.');
  }
}