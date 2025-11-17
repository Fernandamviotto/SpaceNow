import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

export interface Predio {
  id: number;
  nome: string;
  endereco: string;
}

@Injectable({
  providedIn: "root",
})
export class PredioService {
  getFloorsByBuilding(predioId: any) {
    throw new Error("Method not implemented.");
  }
  private urlApi = `${environment.apiBaseUrl}/predios`;

  constructor(private http: HttpClient) {}

  getPredioByResponsavel(responsavelId: number): Observable<Predio> {
    return this.http.get<Predio>(`${this.urlApi}/responsavel/${responsavelId}`);
  }

  getAll(): Observable<Predio[]> {
    return this.http.get<Predio[]>(this.urlApi);
  }
}
