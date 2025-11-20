import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface TipoSala {
  id: number;
  nomeTipo: string;
}

@Injectable({ providedIn: "root" })
export class SalaTipoService {
  private apiUrl = `${environment.apiBaseUrl}/salas/tipos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoSala[]> {
    return this.http.get<TipoSala[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoSala> {
    return this.http.get<TipoSala>(`${this.apiUrl}/${id}`);
  }
}
