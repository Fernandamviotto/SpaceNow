# 🧪 Exemplo de Uso - Autenticação Supabase

Este arquivo demonstra como usar a autenticação Supabase no projeto SpaceNow.

## 📝 Exemplo de Login

```typescript
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exemplo',
  template: `
    <div>
      <h2>Login</h2>
      <input [(ngModel)]="email" placeholder="Email" />
      <input [(ngModel)]="password" type="password" placeholder="Senha" />
      <button (click)="fazerLogin()">Entrar</button>
    </div>
  `
})
export class ExemploComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async fazerLogin() {
    // AuthService retorna o token JWT do Supabase
    const token = await this.authService.login(this.email, this.password);
    
    if (token) {
      console.log('Login bem-sucedido! Token:', token);
      // Token é automaticamente salvo em localStorage
      // Redireciona para a home
      this.router.navigate(['/home']);
    } else {
      console.error('Falha no login');
    }
  }
}
```

## 🔐 Exemplo de Requisição Autenticada

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-dados',
  template: `<div>{{ dados | json }}</div>`
})
export class DadosComponent implements OnInit {
  dados: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // O authInterceptor automaticamente adiciona o header Authorization
    // Não é necessário adicionar manualmente!
    this.http.get(`${environment.apiUrl}/home/uuid-do-usuario`)
      .subscribe(response => {
        this.dados = response;
        console.log('Dados recebidos:', response);
      });
  }
}
```

**Nota:** O header `Authorization: Bearer <token>` é adicionado automaticamente pelo `authInterceptor`.

## 🛡️ Exemplo de Rota Protegida

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MinhaComponenteProtegido } from './components/meu-componente';

export const routes: Routes = [
  {
    path: 'protegido',
    component: MinhaComponenteProtegido,
    canActivate: [AuthGuard] // Apenas usuários autenticados podem acessar
  }
];
```

## 📤 Exemplo de Logout

```typescript
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `<button (click)="fazerLogout()">Sair</button>`
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async fazerLogout() {
    await this.authService.logout();
    console.log('Logout realizado');
    this.router.navigate(['/login']);
  }
}
```

## ✅ Verificar Autenticação

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-status',
  template: `
    <div>
      <p>Autenticado: {{ isAuth }}</p>
      <p>Token: {{ token }}</p>
    </div>
  `
})
export class StatusComponent implements OnInit {
  isAuth = false;
  token: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
    this.token = this.authService.getToken();
  }
}
```

## 🔧 Fluxo Completo de Autenticação

1. **Usuário faz login**
   ```typescript
   const token = await authService.login('user@example.com', 'senha123');
   ```

2. **Token é salvo automaticamente**
   ```typescript
   // AuthService salva o token em localStorage
   localStorage.setItem('ps_auth_token', token);
   ```

3. **Requisições incluem o token automaticamente**
   ```typescript
   // authInterceptor adiciona o header automaticamente
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Backend valida o token**
   ```csharp
   // Program.cs já está configurado para validar JWT
   [Authorize] // Atributo para proteger endpoints
   ```

## 🌐 Testando no Navegador

1. Abra o DevTools (F12)
2. Vá para a aba **Application** > **Local Storage**
3. Verifique se `ps_auth_token` está presente após o login
4. Vá para a aba **Network**
5. Faça uma requisição para o backend
6. Verifique o header `Authorization: Bearer <token>` nas requisições

## 🔍 Debug de Problemas

### Token não está sendo enviado?
```typescript
// Verifique se o token existe
console.log('Token:', authService.getToken());

// Verifique se está autenticado
console.log('Autenticado:', authService.isAuthenticated());
```

### Erro 401 Unauthorized?
- Verifique se o token não expirou
- Verifique se o backend está validando corretamente
- Tente fazer login novamente

### Interceptor não está funcionando?
- Verifique se `authInterceptor` está registrado em `app.config.ts`
- Verifique se você está usando `HttpClient` do Angular
- Não use `fetch()` ou outras bibliotecas HTTP

## 📚 Recursos

- **AuthService**: `/src/app/services/auth.service.ts`
- **authInterceptor**: `/src/app/interceptors/auth.interceptor.ts`
- **AuthGuard**: `/src/app/guards/auth.guard.ts`
- **Configuração**: `/src/environments/environment.ts`
