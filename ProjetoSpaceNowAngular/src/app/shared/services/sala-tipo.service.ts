import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaTipoModel } from '../models/sala-tipo.model';

@Injectable({ providedIn: 'root' })
export class SalaTipoService {
  private baseUrl = 'http://localhost:5000/api/sala-tipos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SalaTipoModel[]> {
    return this.http.get<SalaTipoModel[]>(this.baseUrl);
  }
}