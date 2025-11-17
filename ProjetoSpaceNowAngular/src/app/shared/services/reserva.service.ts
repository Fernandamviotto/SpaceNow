import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface Reserva {
  id: number;
  sala: string;
  tipo: string;
  solicitante: string;
  dataInicio: string;
  dataFim: string;
  status: "Pendente" | "Aprovada" | "Negada" | "Cancelada";
}

@Injectable({
  providedIn: "root",
})
export class ReservaService {
  private apiUrl = environment.apiBaseUrl + "/reservas"; // ajuste para sua URL real

  constructor(private http: HttpClient) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getReservaPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  criarReserva(reserva: Omit<Reserva, "id" | "status">): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  atualizarReserva(id: number, reserva: Partial<Reserva>): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  deletarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  aprovarReserva(id: number): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.apiUrl}/${id}`, {
      status: "Aprovada",
    });
  }

  negarReserva(id: number): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.apiUrl}/${id}`, {
      status: "Negada",
    });
  }

  cancelarReserva(id: number): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.apiUrl}/${id}`, {
      status: "Cancelada",
    });
  }
}