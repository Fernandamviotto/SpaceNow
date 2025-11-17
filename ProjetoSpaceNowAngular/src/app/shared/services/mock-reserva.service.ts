import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Reserva } from "./reserva.service";

@Injectable({
  providedIn: "root",
})
export class MockReservaService {
  private reservas: Reserva[] = [
    {
      id: 1,
      sala: "Sala 101",
      tipo: "Reunião",
      solicitante: "Fernanda Viotto",
      dataInicio: "2025-11-06T09:00:00",
      dataFim: "2025-11-06T10:00:00",
      status: "Aprovada",
    },
    {
      id: 2,
      sala: "Laboratório 202",
      tipo: "Aula",
      solicitante: "Carlos Silva",
      dataInicio: "2025-11-07T14:00:00",
      dataFim: "2025-11-07T16:00:00",
      status: "Pendente",
    },
  ];

  getReservas(): Observable<Reserva[]> {
    return of(this.reservas).pipe(delay(500));
  }

  getReservaPorId(id: number): Observable<Reserva> {
    const reserva = this.reservas.find((r) => r.id === id)!;
    return of(reserva).pipe(delay(300));
  }

  criarReserva(reserva: Omit<Reserva, "id" | "status">): Observable<Reserva> {
    const novaReserva: Reserva = {
      ...reserva,
      id: this.reservas.length + 1,
      status: "Pendente",
    };
    this.reservas.push(novaReserva);
    return of(novaReserva).pipe(delay(300));
  }

  atualizarReserva(id: number, reserva: Partial<Reserva>): Observable<Reserva> {
    const index = this.reservas.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.reservas[index] = { ...this.reservas[index], ...reserva };
    }
    return of(this.reservas[index]).pipe(delay(300));
  }

  deletarReserva(id: number): Observable<void> {
    this.reservas = this.reservas.filter((r) => r.id !== id);
    return of(void 0).pipe(delay(300));
  }

  aprovarReserva(id: number): Observable<Reserva> {
    return this.atualizarReserva(id, { status: "Aprovada" });
  }

  negarReserva(id: number): Observable<Reserva> {
    return this.atualizarReserva(id, { status: "Negada" });
  }

  cancelarReserva(id: number): Observable<Reserva> {
    return this.atualizarReserva(id, { status: "Cancelada" });
  }
}
