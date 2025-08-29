import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  senha = '';
  erro: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dados: LoginRequest = { email: this.email, senha: this.senha };

    this.authService.login(dados).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => (this.erro = 'Usuário ou senha inválidos'),
    });
  }
}
