import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'sala/consulta', pathMatch: 'full' },
  // { path: 'sala/cadastro', component: CadastroComponent },
  // { path: 'sala/consulta', component: ConsultaComponent },
  { path: '**', redirectTo: 'sala/consulta' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}