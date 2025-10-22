import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppComponentService {
  async getPersonalInfo(): Promise<any> {
    return Promise.resolve({ login: 'usuario', fullName: 'Usuário Exemplo' });
  }
}
