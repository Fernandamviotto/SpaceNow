import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class SalaTipoService {
  getAll() {
    const tipos = [
      { nomeTipo: "Laboratório" },
      { nomeTipo: "Sala de Aula" },
      { nomeTipo: "Auditório" },
    ];
    return of(tipos).pipe(delay(300));
  }
}
