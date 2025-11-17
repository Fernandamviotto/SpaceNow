import { Component, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
import { AuthService } from "./shared/services/auth.service";
import { ToastService } from "./shared/services/toast.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  mostrarHeader = true;
  mostrarSubmenuReservas = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    public toast: ToastService
  ) {
    // Esconde o header na tela de login
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.mostrarHeader = !event.urlAfterRedirects.includes("/login");
      });
  }

  // Alterna visibilidade do submenu de Reservas
  toggleSubmenuReservas() {
    this.mostrarSubmenuReservas = !this.mostrarSubmenuReservas;
  }

  // Fecha submenu ao clicar fora
  @HostListener("document:click", ["$event"])
  fecharSubmenuAoClicarFora(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clicouNoMenu =
      target.closest(".submenu-container") ||
      target.classList.contains("submenu-item");

    if (!clicouNoMenu) {
      this.mostrarSubmenuReservas = false;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
    this.toast.show("Você saiu com sucesso");
  }
}
