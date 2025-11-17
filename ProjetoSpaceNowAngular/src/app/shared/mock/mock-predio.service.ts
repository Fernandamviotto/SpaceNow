import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MockPredioService {
  listar(): Observable<any[]> {
    const predios = [
      { id: 1, nome: "Prédio Central" },
      { id: 2, nome: "Bloco A" },
      { id: 3, nome: "Bloco B" },
    ];
    return of(predios);
  }
}
