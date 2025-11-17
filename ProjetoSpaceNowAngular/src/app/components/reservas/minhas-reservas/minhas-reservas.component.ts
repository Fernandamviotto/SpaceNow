import { Component, OnInit } from "@angular/core";
import { MockService } from "../../../shared/services/mock.service";

@Component({
  selector: "app-minhas-reservas",
  templateUrl: "./minhas-reservas.component.html",
  styleUrls: ["./minhas-reservas.component.css"],
})
export class MinhasReservasComponent implements OnInit {
  reservas: any[] = [];
  todasReservas: any[] = [];

  selectedStatus: string = "todas";
  qtdReservada = 0;
  qtdCancelada = 0;
  qtdPendente = 0;
  qtdTotal = 0;

  constructor(private mock: MockService) {}

  async ngOnInit() {
    await this.mock.init();
    this.todasReservas = this.mock.getReservations();
    this.filtrarReservas("todas");
    this.atualizarContadores();
  }

  onChangeStatus(event: any) {
    const status = event.target.getAttribute("value");
    this.selectedStatus = status;
    this.filtrarReservas(status);
  }

  filtrarReservas(status: string) {
    if (status === "todas") {
      this.reservas = this.todasReservas;
    } else {
      this.reservas = this.todasReservas.filter(
        (r) => (r.status || "reservada") === status
      );
    }
  }

  atualizarContadores() {
    this.qtdReservada = this.todasReservas.filter(
      (r) => (r.status || "reservada") === "reservada"
    ).length;
    this.qtdCancelada = this.todasReservas.filter(
      (r) => r.status === "cancelada"
    ).length;
    this.qtdPendente = this.todasReservas.filter(
      (r) => r.status === "pendente"
    ).length;
    this.qtdTotal = this.todasReservas.length;
  }

  abrirDetalhes(item: any) {
    alert(
      `Detalhes da reserva:\n\nTítulo: ${item.title}\nSala: ${item.roomId}\nInício: ${item.start}\nFim: ${item.end}`
    );
  }
}
