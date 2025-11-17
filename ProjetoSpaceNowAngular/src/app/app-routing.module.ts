import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { MinhasReservasComponent } from "./reservas/minhas-reservas/minhas-reservas.component";
import { PainelReservasComponent } from "./reservas/painel-reservas/painel-reservas.component";
import { SalasFormComponent } from "./salas/salas-form/salas-form.component";
import { ReservaCriacaoComponent } from "./reservas/cadastrar-reservas/reserva-criacao.component";
import { SalasListComponent } from "./salas/salas-list/salas-list.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },

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

  { path: "**", redirectTo: "dashboard" }, // rota fallback
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
