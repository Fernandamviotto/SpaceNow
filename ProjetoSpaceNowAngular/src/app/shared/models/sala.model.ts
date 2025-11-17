import { SalaTipoModel } from "./sala-tipo.model";

export class SalaModel {
  salaId: number = 0;
  nome: string = "";
  andar: any = { apelido: "", predio: { apelido: "" } };
  capacidade: number = 0;
  salaTipo: SalaTipoModel = new SalaTipoModel(0, "");
  status: boolean = true;
  responsaveis: any;
  predioId: any;
  tipoDeSalaId: any;
  tipoDeSala: any;
}
  