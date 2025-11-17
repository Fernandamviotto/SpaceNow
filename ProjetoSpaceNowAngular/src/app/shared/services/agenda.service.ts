import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SolicitacaoAgendaModel } from "../models/solicitacao-agenda.model";
import { environment } from "src/environments/environment";
import { UtilComponent } from "../componets/util.component";

@Injectable({
  providedIn: "root",
})
export class AgendaService {
  private urlApi = `${environment.apiBaseUrl}/agendas/`;
  util = UtilComponent;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<any> {
    const url = `${this.urlApi}${id}`;
    return this.http.get(url);
  }

  obterReservaPorId(id: number): Observable<SolicitacaoAgendaModel> {
    const url = `${this.urlApi}reservas/${id}`;
    return this.http.get<SolicitacaoAgendaModel>(url);
  }
}