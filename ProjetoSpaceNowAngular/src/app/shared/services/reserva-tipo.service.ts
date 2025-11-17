import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ReservaTipoService {
  private urlApi = `${environment.apiBaseUrl}/reservas/tipos`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.urlApi}`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }
}
