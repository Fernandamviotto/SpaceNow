import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MockTipoSalaService {
  listar(): Observable<any[]> {
    const tipos = [
      { id: 1, descricao: "Laboratório" },
      { id: 2, descricao: "Sala de Aula" },
      { id: 3, descricao: "Auditório" },
    ];
    return of(tipos);
  }
}
