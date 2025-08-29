import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  private apiUrl = 'https://localhost:5001/api/auth'; // ajuste conforme o endpoint da sua API

  constructor(private http: HttpClient) {}

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados).pipe(
      tap((res) => {
        // salva o token no localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  get usuarioLogado() {
    return localStorage.getItem('usuario')
      ? JSON.parse(localStorage.getItem('usuario')!)
      : null;
  }

  get token() {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.token;
  }
}
