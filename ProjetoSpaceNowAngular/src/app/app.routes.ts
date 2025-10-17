import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { GestaoSalasComponent } from './shared/componets/gestao-salas/gestao-salas.component';
import { ConsultaComponent } from './shared/componets/consulta.component/consulta.component.component';
import { CadastroComponent } from './shared/componets/cadastro.component/cadastro.component.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: 'salas', 
    component: GestaoSalasComponent,
    children: [
      { path: '', redirectTo: 'consulta', pathMatch: 'full' },
      { path: 'consulta', component: ConsultaComponent },
      { path: 'cadastro', component: CadastroComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
