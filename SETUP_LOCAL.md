# 🚀 Setup Local - SpaceNow

Este guia explica como configurar e executar o projeto SpaceNow localmente, com o frontend Angular comunicando com o backend C# usando autenticação Supabase.

## 📋 Pré-requisitos

- **Node.js** >= 18.x
- **NPM** >= 9.x  
- **Angular CLI** >= 17.x
- **.NET SDK** >= 8.0

## 🔧 Configuração

### 1️⃣ Frontend (Angular)

#### Instalar Dependências

```bash
cd ProjetoSpaceNowAngular
npm install
```

#### Configuração de Ambiente

O arquivo `src/environments/environment.ts` já está configurado com:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5003/api',
  supabase: {
    url: 'https://ohxdolbdxxtbifrlglko.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
};
```

#### Executar Frontend

```bash
npm start
# ou
ng serve
```

O aplicativo estará disponível em: **http://localhost:4200**

### 2️⃣ Backend (C# .NET)

#### Instalar Dependências

```bash
cd ProjetoSpaceNow/ProjetoSpaceNow.Api
dotnet restore
```

#### Configuração de Ambiente

O arquivo `.env` já contém as configurações necessárias:

```
JWT__KEY=mv5rYNn8W6MkdIA/KefBXr1qIf6CxGzhbzXXtMq2WR259MEX/N+NTE2+aPVt0RIrdY8dE/yqKTfJD820FcAEZw==
SUPABASE__URL=https://ohxdolbdxxtbifrlglko.supabase.co/
SUPABASE__KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Executar Backend

```bash
dotnet build
dotnet run
```

O backend estará disponível em: **http://localhost:5003**
- Swagger UI: **http://localhost:5003** (em modo development)

## 🔐 Autenticação Supabase

### Como Funciona

1. **Login no Frontend:**
   - O usuário insere email e senha na tela de login
   - O `AuthService` usa `@supabase/supabase-js` para autenticar via Supabase
   - O token JWT é armazenado em `localStorage` como `ps_auth_token`

2. **Requisições Autenticadas:**
   - O `authInterceptor` automaticamente adiciona o header `Authorization: Bearer <token>` em todas as requisições HTTP
   - O backend valida o token JWT nas rotas protegidas

3. **Proteção de Rotas:**
   - O `AuthGuard` verifica se o usuário está autenticado antes de permitir acesso às rotas protegidas
   - Se não autenticado, redireciona para `/login`

### Criar Novo Usuário

Na tela de login, você pode:
1. Clicar em "Criar Conta" (se disponível na UI)
2. Ou usar o método `signup()` do `AuthService`

```typescript
// Exemplo de código
await authService.signup('usuario@example.com', 'senha123');
```

## 🛠 Estrutura de Autenticação

### Frontend

- **`AuthService`** (`src/app/services/auth.service.ts`)
  - `login(email, password)`: Autentica usuário
  - `signup(email, password)`: Registra novo usuário
  - `logout()`: Faz logout
  - `getToken()`: Retorna token JWT
  - `isAuthenticated()`: Verifica se usuário está autenticado

- **`authInterceptor`** (`src/app/interceptors/auth.interceptor.ts`)
  - Intercepta todas as requisições HTTP
  - Adiciona automaticamente `Authorization: Bearer <token>`

- **`AuthGuard`** (`src/app/guards/auth.guard.ts`)
  - Protege rotas que requerem autenticação

### Backend

- **`AuthController`** (`Controllers/AuthController.cs`)
  - `POST /auth/login`: Endpoint de login
  
- **`SupabaseAuthService`** (`Services/SupabaseAuthService.cs`)
  - Integração com Supabase Auth API
  
- **JWT Configuration** (`Program.cs`)
  - Validação de tokens JWT
  - Proteção de rotas com `[Authorize]`

## 🧪 Testando a Integração

### 1. Iniciar Backend

```bash
cd ProjetoSpaceNow/ProjetoSpaceNow.Api
dotnet run
```

### 2. Iniciar Frontend

Em outro terminal:

```bash
cd ProjetoSpaceNowAngular
npm start
```

### 3. Acessar Aplicação

1. Abra **http://localhost:4200**
2. Faça login ou crie uma conta
3. Após login bem-sucedido, você será redirecionado para `/home`
4. As requisições para o backend incluirão automaticamente o token de autenticação

### 4. Verificar Headers

Você pode abrir o **DevTools do navegador** (F12) > **Network** para verificar que as requisições incluem:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Endpoints da API

### Autenticação
- `POST /auth/login` - Login com email/senha

### Home
- `GET /api/home/{usuarioId}` - Buscar dados da home (protegido)

## ⚠️ Troubleshooting

### Erro de CORS
Se encontrar erros de CORS, verifique se o backend está configurado para aceitar requisições do frontend:

```csharp
// No Program.cs, adicione se necessário:
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});

app.UseCors("AllowAngular");
```

### Token Expirado
Se o token expirar, faça logout e login novamente.

### Porta já em uso
Se a porta 4200 ou 5003 já estiver em uso, você pode alterar:

**Frontend:**
```bash
ng serve --port 4201
```

**Backend:** Altere no `launchSettings.json` ou use:
```bash
dotnet run --urls "http://localhost:5004"
```

## 📚 Recursos Adicionais

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentação Angular HttpClient](https://angular.io/guide/http)
- [Documentação .NET Authentication](https://learn.microsoft.com/aspnet/core/security/authentication/)
