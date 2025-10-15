import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: string;
}

export interface Sala {
  id: string;
  nome: string;
  capacidade: number;
  recursos: string;
}

export interface Reserva {
  id: string;
  salaId: string;
  usuarioId: string;
  usuarioNome: string;
  nome: string;
  tipo: string;
  dataInicio: string; // ISO string
  dataFim: string;
}

export interface HomeDto {
  usuario: Usuario;
  salas: Sala[];
  reservas: Reserva[];
}

@Injectable({
  providedIn: "root",
})
export class HomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHome(
    usuarioId: string,
    data?: string,
    periodo?: string
  ): Observable<HomeDto> {
    const params: any = {};
    if (data) params.data = data;
    if (periodo) params.periodo = periodo;

    return this.http.get<HomeDto>(`${this.apiUrl}/index/${usuarioId}`, {
      params,
    });
  }
}
