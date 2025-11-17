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

  /**
   * Cria uma nova sala (com suporte a upload de imagem via FormData).
   */
  criar(model: SalaModel | FormData): Observable<SalaModel> {
    // Se for um objeto simples, converte em FormData automaticamente
    if (!(model instanceof FormData)) {
      const formData = new FormData();
      Object.entries(model).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });
      model = formData;
    }

    return this.http.post<SalaModel>(`${this.baseUrl}`, model);
  }

  /**
   * Atualiza uma sala existente (com suporte a upload de imagem via FormData).
   */
  atualizar(id: number, model: SalaModel | FormData): Observable<SalaModel> {
    if (!(model instanceof FormData)) {
      const formData = new FormData();
      Object.entries(model).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as any);
        }
      });
      model = formData;
    }

    return this.http.put<SalaModel>(`${this.baseUrl}/${id}`, model);
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