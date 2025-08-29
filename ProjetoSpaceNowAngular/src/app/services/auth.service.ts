// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/auth';

  constructor(private http: HttpClient, private storage: StorageService) {}

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados).pipe(
      tap((res) => {
        this.storage.setItem('token', res.token);
        this.storage.setObject('usuario', res.usuario);
      })
    );
  }

  logout() {
    this.storage.removeItem('token');
    this.storage.removeItem('usuario');
  }

  get usuarioLogado() {
    return this.storage.getObject<any>('usuario');
  }

  get token(): string | null {
    return this.storage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.token;
  }
}
