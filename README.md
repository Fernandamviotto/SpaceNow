# 🚀 Projeto SpaceNow

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Frontend](https://img.shields.io/badge/tecnologia-Angular-blue)
![Backend](https://img.shields.io/badge/tecnologia-.NET%208-blue)
![Banco](https://img.shields.io/badge/banco-Supabase-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Build](https://github.com/Fernandamviotto/SpaceNow/actions/workflows/build.yml/badge.svg)
---

## 📖 Descrição do Projeto
O **SpaceNow** é um sistema completo para **gerenciamento de reservas de salas**, controle de usuários e otimização do fluxo de trabalho da equipe.  
Inclui autenticação via **Supabase**, cadastro e gerenciamento de salas e reservas, relatórios, dashboards e integração com ferramentas externas.

---

## 🔗 Links Importantes
- **Protótipo (Figma / Canva / outro)**: [Acessar protótipo](LINK_DO_PROTOTIPO)
- **Lean Inception**: [Acessar Lean Inception](LINK_DO_LEAN_INCEPTION)
- **Documentação Completa**: na pasta [`documentacao`](Documentacao/)

---

## 🗂 Estrutura do Repositório
```text
ProjetoSpaceNow/
│
├─ Documentacao/             # Documentação
├─ ProjetoSpaceNow           # .NET 8 / C#      
├─ ProjetoSpaceNowAngular    # Angular

```

## ⚙ Funcionalidades Principais
| ID    | Funcionalidade           | Descrição                                                   |
|-------|--------------------------|-------------------------------------------------------------|
| RF01  | Autenticação             | Login e registro via Supabase Auth                          |
| RF02  | Cadastro de Salas        | Nome, capacidade e recursos das salas                       |
| RF03  | Listagem de Salas        | Visualizar todas as salas disponíveis                       |
| RF04  | Exclusão de Sala         | Remover salas do sistema                                    |
| RF05  | Reservas                 | Criar, aprovar, negar, cancelar e remanejar reservas        |
| RF06  | Relatórios e Dashboards  | Visualizar gráficos e gerar relatórios PDF/Excel            |
| RF07  | Controle de Usuários     | Permissões de Admin e Funcionário                           |
| RF08  | Integração com Supabase  | Autenticação, storage e sincronização                       |

---

## 🛠 Tecnologias Utilizadas
- **Frontend:** Angular  
- **Backend:** .NET 8 / C#  
- **Banco de Dados:** SQL Server / Supabase  
- **Autenticação:** Supabase Auth  
- **Ferramentas Auxiliares:** Docker, DBeaver, Git  

---

## 💻 Como Rodar o Projeto

### Backend
```bash
cd src/ProjetoSpaceNow
dotnet build
dotnet run
```

### Frontend
```bash
cd src/ProjetoSpaceNowAngular
npm install
ng serve
```
---

## 🤝 Contribuindo
- Faça um fork do repositório
- Crie sua branch de feature:
  git checkout -b minha-feature
- Commit suas alterações:
  git commit -m "Descrição da feature"
- Envie para o repositório remoto:
  git push origin minha-feature

---

## 📂 Documentação
Toda a documentação está na pasta documentacao, incluindo:
- Requisitos funcionais e não funcionais
- Diagramas (fluxogramas, organogramas, etc.)
- Detalhes de arquitetura
