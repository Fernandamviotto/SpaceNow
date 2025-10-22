import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultaComponent } from './components/sala/consulta/consulta.component';
import { CadastroComponent } from './components/sala/cadastro/cadastro.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'salas/consulta', component: ConsultaComponent, canActivate: [AuthGuard] },
  { path: 'salas/cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'salas', redirectTo: '/salas/consulta', pathMatch: 'full' },
];
