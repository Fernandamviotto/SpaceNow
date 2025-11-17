import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { ToastService } from "../../shared/services/toast.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email: string = "demo@spacenow.local";
  password: string = "";
  error: string = "";
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  async onSubmit() {
    this.error = "";
    this.isLoading = true;

    try {
      const loggedIn = await this.authService.login(this.email, this.password);

      if (loggedIn) {
        this.toast.show("Login efetuado com sucesso");
        this.router.navigate(["/dashboard"]);
      } else {
        this.error = "Email ou senha inválidos";
        this.toast.show("Credenciais inválidas");
      }
    } catch (err) {
      console.error(err);
      this.error = "Erro inesperado ao tentar fazer login";
    } finally {
      this.isLoading = false;
    }
  }
}
