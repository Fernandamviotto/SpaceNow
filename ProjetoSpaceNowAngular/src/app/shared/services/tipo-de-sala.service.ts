import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class TipoDeSalaService {
  private urlApi = `${environment.apiBaseUrl}/tipos-de-sala`;

  constructor(private http: HttpClient) {}

  getAllTypesRooms(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/listar`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }
}
