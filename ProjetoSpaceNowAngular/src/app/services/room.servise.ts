import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sala } from '../Models/sala.dto';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private apiUrl = `${environment.apiUrl}/salas`;

  constructor(private http: HttpClient) {}

  // Buscar todas as salas
  getAll(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }

  // Buscar sala por ID
  getById(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  // Criar nova sala
  create(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(this.apiUrl, sala);
  }

  // Atualizar sala existente
  update(sala: Sala): Observable<Sala> {
    return this.http.put<Sala>(`${this.apiUrl}/${sala.id}`, sala);
  }

  // Deletar sala
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar salas disponíveis
  getAvailable(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/disponivel`);
  }

  // Buscar salas por capacidade mínima
  getByCapacity(minCapacity: number): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/capacidade/${minCapacity}`);
  }
}