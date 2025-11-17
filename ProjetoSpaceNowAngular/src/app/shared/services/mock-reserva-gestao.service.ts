import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { AgendaStatus } from "../enum/agenda-status.enum";

export interface MockSala {
  id: number;
  apelido: string;
}

export interface MockAgendaStatus {
  id: AgendaStatus;
  nome: string;
}

export interface MockReservaItem {
  id: number;
  agendaId: number;
  reserva: {
    apelido: string;
    dataInicioReserva: string;
    dataFimReserva: string;
  };
  nomeCadastro: string;
  agendaStatus: MockAgendaStatus;
  agendaStatusId: AgendaStatus;
  data: string;
  horaInicio: string;
  horaFim: string;
  quantidadePessoas: number;
  sala?: MockSala;
  editavel: boolean;
}

@Injectable({
  providedIn: "root",
})
export class MockReservaGestaoService {
  private reservas: MockReservaItem[] = [
    {
      id: 1,
      agendaId: 1,
      reserva: {
        apelido: "Reunião de Planejamento",
        dataInicioReserva: "2025-11-06T09:00:00",
        dataFimReserva: "2025-11-06T10:30:00",
      },
      nomeCadastro: "Ana Souza",
      agendaStatus: { id: AgendaStatus.RESERVADA, nome: "Reservada" },
      agendaStatusId: AgendaStatus.RESERVADA,
      data: "2025-11-06",
      horaInicio: "09:00",
      horaFim: "10:30",
      quantidadePessoas: 8,
      sala: { id: 101, apelido: "Sala 101" },
      editavel: true,
    },
    {
      id: 2,
      agendaId: 2,
      reserva: {
        apelido: "Evento Domazzi",
        dataInicioReserva: "2025-11-07T14:00:00",
        dataFimReserva: "2025-11-07T18:00:00",
      },
      nomeCadastro: "Carlos Lima",
      agendaStatus: {
        id: AgendaStatus.PENDENTE_APROVACAO,
        nome: "Pendente Aprovação",
      },
      agendaStatusId: AgendaStatus.PENDENTE_APROVACAO,
      data: "2025-11-07",
      horaInicio: "14:00",
      horaFim: "18:00",
      quantidadePessoas: 40,
      sala: { id: 102, apelido: "Auditório Azul" },
      editavel: true,
    },
    {
      id: 3,
      agendaId: 3,
      reserva: {
        apelido: "Aula de Engenharia de Software",
        dataInicioReserva: "2025-11-08T08:00:00",
        dataFimReserva: "2025-11-08T12:00:00",
      },
      nomeCadastro: "Prof. Júlia",
      agendaStatus: { id: AgendaStatus.CANCELADA, nome: "Cancelada" },
      agendaStatusId: AgendaStatus.CANCELADA,
      data: "2025-11-08",
      horaInicio: "08:00",
      horaFim: "12:00",
      quantidadePessoas: 25,
      sala: { id: 203, apelido: "Sala 204" },
      editavel: false,
    },
    {
      id: 4,
      agendaId: 4,
      reserva: {
        apelido: "Reunião de Resultados",
        dataInicioReserva: "2025-11-09T15:00:00",
        dataFimReserva: "2025-11-09T17:00:00",
      },
      nomeCadastro: "Equipe Financeira",
      agendaStatus: { id: AgendaStatus.PENDENTE_SALA, nome: "Pendente Sala" },
      agendaStatusId: AgendaStatus.PENDENTE_SALA,
      data: "2025-11-09",
      horaInicio: "15:00",
      horaFim: "17:00",
      quantidadePessoas: 12,
      sala: undefined,
      editavel: true,
    },
    {
      id: 5,
      agendaId: 5,
      reserva: {
        apelido: "Apresentação Final",
        dataInicioReserva: "2025-11-10T09:00:00",
        dataFimReserva: "2025-11-10T11:00:00",
      },
      nomeCadastro: "Mariana Lopes",
      agendaStatus: { id: AgendaStatus.NEGADA, nome: "Negada" },
      agendaStatusId: AgendaStatus.NEGADA,
      data: "2025-11-10",
      horaInicio: "09:00",
      horaFim: "11:00",
      quantidadePessoas: 15,
      sala: { id: 205, apelido: "Sala 305" },
      editavel: false,
    },
  ];

  constructor() {}

  /** Retorna todas as reservas mockadas */
  getReservas(): Observable<MockReservaItem[]> {
    return of(this.reservas).pipe(delay(300));
  }

  /** Aprova uma reserva */
  aprovarReserva(id: number): Observable<MockReservaItem | null> {
    const reserva = this.findById(id);
    if (reserva) {
      reserva.agendaStatus = { id: AgendaStatus.RESERVADA, nome: "Reservada" };
      reserva.agendaStatusId = AgendaStatus.RESERVADA;
    }
    return of(reserva ?? null).pipe(delay(300));
  }

  /** Nega uma reserva */
  negarReserva(id: number): Observable<MockReservaItem | null> {
    const reserva = this.findById(id);
    if (reserva) {
      reserva.agendaStatus = { id: AgendaStatus.NEGADA, nome: "Negada" };
      reserva.agendaStatusId = AgendaStatus.NEGADA;
    }
    return of(reserva ?? null).pipe(delay(300));
  }

  /** Cancela uma reserva */
  cancelarReserva(id: number): Observable<MockReservaItem | null> {
    const reserva = this.findById(id);
    if (reserva) {
      reserva.agendaStatus = { id: AgendaStatus.CANCELADA, nome: "Cancelada" };
      reserva.agendaStatusId = AgendaStatus.CANCELADA;
    }
    return of(reserva ?? null).pipe(delay(300));
  }

  /** Busca por ID */
  getById(id: number): Observable<MockReservaItem | null> {
    return of(this.findById(id) ?? null).pipe(delay(200));
  }

  /** Atualiza reserva */
  updateReserva(
    reservaAtualizada: MockReservaItem
  ): Observable<MockReservaItem> {
    const index = this.reservas.findIndex((r) => r.id === reservaAtualizada.id);
    if (index >= 0) {
      this.reservas[index] = { ...this.reservas[index], ...reservaAtualizada };
    }
    return of(this.reservas[index]).pipe(delay(300));
  }

  private findById(id: number): MockReservaItem | undefined {
    return this.reservas.find((r) => r.id === id);
  }
}
