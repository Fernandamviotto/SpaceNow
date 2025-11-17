import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardSalasService {
  adicionarReserva(novaReserva: { id: number; nomeSala: any; salaId: any; inicio: any; fim: any; corPredio: any; }) {
    throw new Error("Method not implemented.");
  }
  atualizarReserva(arg0: { id: any; nomeSala: any; salaId: any; inicio: any; fim: any; corPredio: any; }) {
    throw new Error("Method not implemented.");
  }
  excluirReserva(id: any) {
    throw new Error("Method not implemented.");
  }
  // Dados mock (armazenamento simples em memória)
  private mockReservas: any[] = [
    {
      id: 1,
      salaId: 1,
      salaNome: "Sala 101",
      inicio: new Date().toISOString().split("T")[0] + "T08:00:00",
      fim: new Date().toISOString().split("T")[0] + "T09:30:00",
      corPredio: "#FF7A7A",
    },
    {
      id: 2,
      salaId: 2,
      salaNome: "Sala 202",
      inicio: new Date().toISOString().split("T")[0] + "T14:00:00",
      fim: new Date().toISOString().split("T")[0] + "T15:00:00",
      corPredio: "#7ABFFF",
    },
    // reserva para outro dia (amanhã) para teste de filtragem
    {
      id: 3,
      salaId: 1,
      salaNome: "Sala 101",
      inicio:
        new Date(Date.now() + 24 * 3600 * 1000).toISOString().split("T")[0] +
        "T10:00:00",
      fim:
        new Date(Date.now() + 24 * 3600 * 1000).toISOString().split("T")[0] +
        "T11:00:00",
      corPredio: "#FF7A7A",
    },
  ];

  constructor() {}

  // Reservas mockadas — aceita data opcional e retorna apenas reservas que intersectam o dia
  getReservas(date?: Date): Observable<any[]> {
    if (!date) {
      return of(this.mockReservas.slice());
    }
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const filtered = this.mockReservas.filter((r) => {
      const inicio = new Date(r.inicio);
      const fim = new Date(r.fim);
      return inicio <= dayEnd && fim >= dayStart;
    });
    return of(filtered);
  }

  // Adiciona uma reserva no mock (simula escrita no backend)
  addReserva(reserva: any): void {
    // atribui id se não existir
    if (!reserva.id) {
      reserva.id = this.mockReservas.length
        ? Math.max(...this.mockReservas.map((r) => r.id)) + 1
        : 1;
    }
    this.mockReservas.push(reserva);
  }

  // Atualiza uma reserva existente no mock
  updateReserva(reserva: any): void {
    const idx = this.mockReservas.findIndex((r) => r.id === reserva.id);
    if (idx >= 0) {
      this.mockReservas[idx] = { ...this.mockReservas[idx], ...reserva };
    }
  }

  // Remove uma reserva do mock
  deleteReserva(id: number): void {
    const idx = this.mockReservas.findIndex((r) => r.id === id);
    if (idx >= 0) {
      this.mockReservas.splice(idx, 1);
    }
  }

  getSalas(): Observable<any[]> {
    return of([
      {
        id: 1,
        nome: "Sala 101",
        capacidade: 40,
        predioId: 1,
        andar: "1º Andar",
        tipo: "Sala de Aula",
      },
      {
        id: 2,
        nome: "Sala 202",
        capacidade: 60,
        predioId: 2,
        andar: "2º Andar",
        tipo: "Laboratório",
      },
      {
        id: 3,
        nome: "Sala 305",
        capacidade: 20,
        predioId: 1,
        andar: "3º Andar",
        tipo: "Reunião",
      },
    ]);
  }

  getPredios(): Observable<any[]> {
    return of([
      { id: 1, nome: "Prédio A", cor: "#FF7A7A", endereco: "Av. Paulista 100" },
      {
        id: 2,
        nome: "Prédio B",
        cor: "#7ABFFF",
        endereco: "Rua Verbo Divino 250",
      },
      {
        id: 3,
        nome: "Prédio C",
        cor: "#9BFF7A",
        endereco: "Av. Faria Lima 900",
      },
    ]);
  }

  // Retorna prédios mock (síncrono) — usado pelo componente
  getPrediosMock(): any[] {
    return [
      { id: 1, nome: "Prédio A", cor: "#FF7A7A", endereco: "Av. Paulista 100" },
      {
        id: 2,
        nome: "Prédio B",
        cor: "#7ABFFF",
        endereco: "Rua Verbo Divino 250",
      },
      {
        id: 3,
        nome: "Prédio C",
        cor: "#9BFF7A",
        endereco: "Av. Faria Lima 900",
      },
    ];
  }

  getHorariosPorSala(data: Date): Observable<any[]> {
    // mock simples por enquanto
    return of([
      {
        salaId: 1,
        horario: "08:00 - 10:00",
        reservado: true,
        titulo: "Reunião Engenharia",
      },
      { salaId: 1, horario: "10:00 - 12:00", reservado: false },
      {
        salaId: 2,
        horario: "14:00 - 16:00",
        reservado: true,
        titulo: "Aula - Cálculo I",
      },
    ]);
  }
}
