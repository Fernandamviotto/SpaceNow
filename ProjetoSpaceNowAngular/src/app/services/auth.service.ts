import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email?: string;
  userId?: string;
  accessToken?: string;
  expiresAt?: string | null;
}

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'ps_auth_token';
  private readonly userKey = 'ps_user_email';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const payload: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload)
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            localStorage.setItem(this.tokenKey, response.accessToken);
            if (response.email) localStorage.setItem(this.userKey, response.email);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): User | null {
    const email = this.getUserEmail();
    if (email) {
      // Extrair o nome do email (parte antes do @) ou usar um nome padrão
      const name = email.split('@')[0] || 'Usuário';
      return { name, email };
    }
    return null;
  }
}
