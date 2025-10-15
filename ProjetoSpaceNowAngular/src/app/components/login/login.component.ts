import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    this.error = "";
    this.isLoading = true;

    const token = await this.authService.login(this.email, this.password);
    this.isLoading = false;

    if (!token) {
      this.error = "Email ou senha inválidos";
      return;
    }

    this.router.navigate(["/home"]);
  }

  async onSignup() {
    this.error = "";
    this.isLoading = true;

    const success = await this.authService.signup(this.email, this.password);
    this.isLoading = false;

    if (!success) {
      this.error = "Não foi possível criar a conta";
      return;
    }

    this.error = "Conta criada com sucesso! Faça login agora.";
  }
}
