import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecursoService {
  private baseUrl = 'http://localhost:5000/api/recursos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ recursoId: number; nomeRecurso: string }[]> {
    return this.http.get<{ recursoId: number; nomeRecurso: string }[]>(this.baseUrl);
  }
}