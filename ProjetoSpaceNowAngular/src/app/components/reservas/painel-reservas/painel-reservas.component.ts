import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AgendaStatus } from "../../../shared/enum/agenda-status.enum";

@Component({
  selector: "app-painel-reservas",
  templateUrl: "./painel-reservas.component.html",
  styleUrls: ["./painel-reservas.component.css"],
})
export class PainelReservasComponent implements OnInit {
  reservas: any[] = [];
  todasReservas: any[] = [];

  selectedStatus: number = 0; // Todas
  agendaStatus = AgendaStatus;

  // Contadores
  qtdReservada = 0;
  qtdCancelada = 0;
  qtdPendenteSala = 0;
  qtdPendenteAprovacao = 0;
  qtdNegada = 0;
  qtdTotal = 0;
  quantidadeHistorico = 5;

  constructor(private router: Router, private dialog: MatDialog) {}

  async ngOnInit() {
    // Simulando carregamento de dados
    await this.carregarReservas();
    this.filtrarReservas(this.selectedStatus);
    this.atualizarContadores();
  }

  async carregarReservas() {
    // Simulação de dados - substitua pela sua lógica real
    this.todasReservas = [
      {
        id: 1,
        agendaId: 1,
        title: "Reunião de Planejamento",
        reserva: {
          apelido: "Reunião de Planejamento",
          dataInicioReserva: "2024-01-01",
          dataFimReserva: "2024-01-01",
        },
        nomeCadastro: "João Silva",
        agendaStatus: { id: AgendaStatus.RESERVADA, nome: "Reservada" },
        data: "2024-01-15",
        horaInicio: "09:00",
        horaFim: "10:00",
        quantidadePessoas: 8,
        sala: { apelido: "Sala A1" },
        status: "Reservada",
        editavel: true,
      },
      // Adicione mais dados de exemplo conforme necessário
    ];
  }

  onChangeStatus(event: any) {
    const status = parseInt(event.target.getAttribute("value"));
    this.selectedStatus = status;
    this.filtrarReservas(status);
  }

  filtrarReservas(status: number) {
    if (status === 0) {
      this.reservas = this.todasReservas;
    } else if (status === -1) {
      // Lógica para histórico - ajuste conforme necessário
      this.reservas = this.todasReservas.filter(
        (r) =>
          r.agendaStatus?.id === AgendaStatus.CANCELADA ||
          r.agendaStatus?.id === AgendaStatus.NEGADA
      );
    } else {
      this.reservas = this.todasReservas.filter(
        (r) => r.agendaStatus?.id === status
      );
    }
  }

  atualizarContadores() {
    this.qtdReservada = this.todasReservas.filter(
      (r) => r.agendaStatus?.id === AgendaStatus.RESERVADA
    ).length;

    this.qtdCancelada = this.todasReservas.filter(
      (r) => r.agendaStatus?.id === AgendaStatus.CANCELADA
    ).length;

    this.qtdPendenteSala = this.todasReservas.filter(
      (r) => r.agendaStatus?.id === AgendaStatus.PENDENTE_SALA
    ).length;

    this.qtdPendenteAprovacao = this.todasReservas.filter(
      (r) => r.agendaStatus?.id === AgendaStatus.PENDENTE_APROVACAO
    ).length;

    this.qtdNegada = this.todasReservas.filter(
      (r) => r.agendaStatus?.id === AgendaStatus.NEGADA
    ).length;

    this.qtdTotal = this.todasReservas.length;
  }

  getReserveDetail(item: any) {
    // Implemente a lógica para abrir modal de detalhes
    console.log("Detalhes da reserva:", item);
    alert(
      `Detalhes da reserva:\n\nTítulo: ${
        item.reserva?.apelido || item.title
      }\nSolicitante: ${item.nomeCadastro}\nStatus: ${item.agendaStatus?.nome}`
    );
  }

  edit(id: number) {
    this.router.navigate(["/reserva/agenda/" + id]);
  }

  checkIsRecorrence(item: any, acao: string) {
    // Implemente a lógica para verificar recorrência
    console.log(`Ação: ${acao} para item:`, item);

    // Simulação - chama a ação diretamente
    switch (acao) {
      case "cancelar":
        this.cancelarReserva(item.agendaId || item.id);
        break;
      case "remanejar":
        this.remanejarReserva(item.agendaId || item.id);
        break;
      case "aprovar":
        this.aprovarReserva(item.agendaId || item.id);
        break;
      case "negar":
        this.negarReserva(item.agendaId || item.id);
        break;
    }
  }

  cancelarReserva(id: number) {
    // Implemente a lógica de cancelamento
    console.log("Cancelando reserva:", id);
    alert(`Reserva ${id} cancelada com sucesso!`);
  }

  remanejarReserva(id: number) {
    // Implemente a lógica de remanejamento
    console.log("Remanejando reserva:", id);
    alert(`Reserva ${id} remanejada com sucesso!`);
  }

  aprovarReserva(id: number) {
    // Implemente a lógica de aprovação
    console.log("Aprovando reserva:", id);
    alert(`Reserva ${id} aprovada com sucesso!`);
  }

  negarReserva(id: number) {
    // Implemente a lógica de negação
    console.log("Negando reserva:", id);
    alert(`Reserva ${id} negada com sucesso!`);
  }

  isHidden(acao: string, item: any): boolean {
    if (!item || !item.editavel) return false;

    const statusId = item.agendaStatus?.id;

    switch (acao) {
      case "editar":
        return (
          statusId === AgendaStatus.PENDENTE_APROVACAO ||
          statusId === AgendaStatus.PENDENTE_SALA
        );
      case "cancelar":
        return (
          statusId === AgendaStatus.RESERVADA ||
          statusId === AgendaStatus.PENDENTE_APROVACAO ||
          statusId === AgendaStatus.PENDENTE_SALA
        );
      case "remanejar":
        return statusId === AgendaStatus.RESERVADA;
      case "aprovar":
        return statusId === AgendaStatus.PENDENTE_APROVACAO;
      case "negar":
        return statusId === AgendaStatus.PENDENTE_APROVACAO;
      default:
        return false;
    }
  }
}
