import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeService, Sala, Reserva, Usuario } from "../../services/home.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  username: string = "";
  dataAtual: Date = new Date();
  periodo: string = "manha";

  horarios = ["07:00", "08:00", "09:00", "10:00", "11:00"];
  salas: Sala[] = [];
  reservas: Reserva[] = [];
  usuario: Usuario | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    const usuarioId = "uuid-do-usuario-logado"; // substituir dinamicamente
    this.homeService.getHome(usuarioId).subscribe((data) => {
      this.usuario = data.usuario;
      this.username = data.usuario.nome;
      this.salas = data.salas;
      this.reservas = data.reservas;
    });
  }

  prevDay() {
    this.dataAtual = new Date(
      this.dataAtual.setDate(this.dataAtual.getDate() - 1)
    );
  }

  nextDay() {
    this.dataAtual = new Date(
      this.dataAtual.setDate(this.dataAtual.getDate() + 1)
    );
  }

  setPeriodo(periodo: string) {
    this.periodo = periodo;
  }

  temReserva(sala: Sala, hora: string) {
    return this.reservas.some(
      (r) => r.salaId === sala.id && r.dataInicio.includes(hora)
    );
  }

  getTipoReserva(sala: Sala, hora: string) {
    const reserva = this.reservas.find(
      (r) => r.salaId === sala.id && r.dataInicio.includes(hora)
    );
    return reserva ? reserva.tipo : "";
  }

  getNomeReserva(sala: Sala, hora: string) {
    const reserva = this.reservas.find(
      (r) => r.salaId === sala.id && r.dataInicio.includes(hora)
    );
    return reserva ? reserva.nome : "";
  }
}
