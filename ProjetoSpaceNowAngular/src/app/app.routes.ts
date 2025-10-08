import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CadastroSalaComponent } from './components/sala/sala.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sala', component: CadastroSalaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
