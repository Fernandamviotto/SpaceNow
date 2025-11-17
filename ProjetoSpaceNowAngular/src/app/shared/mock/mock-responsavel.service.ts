import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MockResponsavelService {
  listar(): Observable<any[]> {
    const responsaveis = [
      { id: 1, nome: "Maria Silva" },
      { id: 2, nome: "João Santos" },
      { id: 3, nome: "Débora Rosada" },
    ];
    return of(responsaveis);
  }
}
