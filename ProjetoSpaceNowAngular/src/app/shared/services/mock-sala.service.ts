import { Injectable } from "@angular/core";
import { of, delay } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MockSalaService {
  id: number | null = null;

  private mockSalas = [
    {
      salaId: 1,
      apelido: "Sala Alfa",
      capacidade: 25,
      andar: { apelido: "1º Andar", predio: { apelido: "Bloco A" } },
      salaTipo: { id: 1, nomeTipo: "Laboratório" }, 
      status: true,
    },
    {
      salaId: 2,
      apelido: "Sala Beta",
      capacidade: 40,
      andar: { apelido: "2º Andar", predio: { apelido: "Bloco B" } },
      salaTipo: { id: 2, nomeTipo: "Auditório" }, 
      status: true,
    },
    {
      salaId: 3,
      apelido: "Sala Gama",
      capacidade: 15,
      andar: { apelido: "Térreo", predio: { apelido: "Bloco C" } },
      salaTipo: { id: 3, nomeTipo: "Sala de Aula" }, 
      status: false,
    },
  ];

  getConsultaGrid(filtro: any, page: number, perPage: number, ativas: boolean) {
    const filtradas = this.mockSalas.filter((s) => s.status === ativas);
    const start = (page - 1) * perPage;
    const paginadas = filtradas.slice(start, start + perPage);

    const response = {
      result: paginadas,
      pagination: {
        totalRows: filtradas.length,
        pageNumber: page,
      },
    };
    return of(response).pipe(delay(400)); // simula tempo de rede
  }

  getSalaById(id: number) {
    const sala = this.mockSalas.find((s) => s.salaId === id);
    return of(sala).pipe(delay(300));
  }
}
