import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MockSalaService {
  private salas: any[] = [];

  criar(data: any): Observable<any> {
    const novaSala = {
      id: this.salas.length + 1,
      ...data,
    };
    this.salas.push(novaSala);
    console.log("Mock — sala criada:", novaSala);
    return of(novaSala);
  }

  atualizar(id: number, data: any): Observable<any> {
    const index = this.salas.findIndex((s) => s.id === id);
    if (index !== -1) this.salas[index] = { ...this.salas[index], ...data };
    console.log("Mock — sala atualizada:", this.salas[index]);
    return of(this.salas[index]);
  }

  listar(): Observable<any[]> {
    return of(this.salas);
  }

  getById(id: number): Observable<any> {
    const sala = this.salas.find((s) => s.id === id);
    return of(sala);
  }
}
