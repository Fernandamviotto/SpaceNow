import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenKey = 'spacenow_token';
  login(email: string, password: string): boolean {
    if (email) { localStorage.setItem(this.tokenKey, 'MOCK-JWT-TOKEN'); return true; }
    return false;
  }
  logout() { localStorage.removeItem(this.tokenKey); }
  isLoggedIn(): boolean { return !!localStorage.getItem(this.tokenKey); }
  getToken(): string | null { return localStorage.getItem(this.tokenKey); }
}
