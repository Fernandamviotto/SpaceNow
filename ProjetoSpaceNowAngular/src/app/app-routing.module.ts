import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/home/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { MinhasReservasComponent } from "./components/reservas/minhas-reservas/minhas-reservas.component";
import { PainelReservasComponent } from "./components/reservas/painel-reservas/painel-reservas.component";
import { SalasFormComponent } from "./components/sala/cadastro/salas-form.component";
import { ReservaCriacaoComponent } from "./components/reservas/cadastrar-reservas/reserva-criacao.component";
import { SalasListComponent } from "./components/sala/consulta/salas-list.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  { path: "login", component: LoginComponent },

  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "salas",
    canActivate: [AuthGuard],
    children: [
      { path: "", component: SalasListComponent }, // Listagem padrão
      { path: "novo", component: SalasFormComponent }, // Formulário de criação
      { path: ":id/editar", component: SalasFormComponent }, // Edição
    ],
  },

  {
    path: "reservas",
    canActivate: [AuthGuard],
    children: [
      { path: "cadastrar", component: ReservaCriacaoComponent },
      { path: "minhas", component: MinhasReservasComponent },
      { path: "gestao", component: PainelReservasComponent },
    ],
  },

  { path: "**", redirectTo: "login" }, // rota fallback
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
