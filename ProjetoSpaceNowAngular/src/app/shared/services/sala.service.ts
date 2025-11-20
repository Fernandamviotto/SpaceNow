import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SalaModel } from "../models/sala.model";

@Injectable({
  providedIn: "root",
})
export class SalaService {
  private baseUrl = `${environment.apiBaseUrl}/sala`;
  id?: number;

  constructor(private http: HttpClient) {}

  /**
   * Consulta de salas com paginação e filtros.
   */
  getConsultaGrid(
    filter: any = {},
    pageNumber = 1,
    pageSize = 20,
    ativo = true
  ): Observable<any> {
    let params = new HttpParams()
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString())
      .set("ativo", ativo.toString());

    Object.keys(filter).forEach((key) => {
      if (
        filter[key] !== null &&
        filter[key] !== undefined &&
        filter[key] !== ""
      ) {
        params = params.set(key, filter[key]);
      }
    });

    return this.http.get<any>(`${this.baseUrl}/consulta`, { params });
  }

  /**
   * Busca uma sala por ID.
   */
  getById(id: number): Observable<SalaModel> {
    return this.http.get<SalaModel>(`${this.baseUrl}/${id}`);
  }

  atualizar(payload: {
    id: number;
    nome: string;
    capacidade: number;
    predioId: number;
    tipoDeSalaId: number;
    status: boolean;
  }) {
    return this.http.put(`/api/salas/${payload.id}`, payload);
  }

  criar(payload: {
    nome: string;
    capacidade: number;
    predioId: number;
    tipoDeSalaId: number;
    status: boolean;
  }) {
    return this.http.post(`/api/salas`, payload);
  }

  /**
   * Salva uma sala (mantido para compatibilidade com códigos antigos).
   */
  salvar(model: SalaModel): Observable<SalaModel> {
    return this.http.post<SalaModel>(`${this.baseUrl}`, model);
  }

  /**
   * Exclui (ou desativa) uma sala.
   */
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Retorna lista simplificada (para dropdowns e selects).
   */
  getSelectList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/select`);
  }
}
