import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PredioModel } from '../models/predio.model';

@Injectable({ providedIn: 'root' })
export class PredioService {
  private baseUrl = 'http://localhost:5000/api/predios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PredioModel[]> {
    return this.http.get<PredioModel[]>(this.baseUrl);
  }

  getById(id: number): Observable<PredioModel> {
    return this.http.get<PredioModel>(`${this.baseUrl}/${id}`);
  }
}