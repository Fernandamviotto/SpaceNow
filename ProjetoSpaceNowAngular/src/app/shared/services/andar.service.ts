import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AndarModel } from '../models/andar.model';

@Injectable({ providedIn: 'root' })
export class AndarService {
  private baseUrl = 'http://localhost:5000/api/andares';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AndarModel[]> {
    return this.http.get<AndarModel[]>(this.baseUrl);
  }

  getByPredio(predioId: number): Observable<AndarModel[]> {
    return this.http.get<AndarModel[]>(`${this.baseUrl}/predio/${predioId}`);
  }
}