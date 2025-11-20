export class SalaModel {
  salaId: number = 0;
  nome: string = "";
  capacidade: number = 0;
  predioId: number = 0;
  tipoDeSalaId: number = 0;
  status: boolean = true;

  predio?: { id: number; nome: string };
  tipoDeSala?: { id: number; nomeTipo: string };

  get predioNome(): string {
    return this.predio?.nome ?? "";
  }

  get tipoDeSalaNome(): string {
    return this.tipoDeSala?.nomeTipo ?? "";
  }
}
