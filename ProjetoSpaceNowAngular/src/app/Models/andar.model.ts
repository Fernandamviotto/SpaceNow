export class PredioModel {
  predioId: number = 0;
  nome: string = '';
  apelido?: string;
  endereco?: string;
  ids: string[] = [];
}

export class AndarModel {
  andarId: number = 0;
  apelido: string = '';
  predio: PredioModel = new PredioModel();
  ids: string[] = [];
}
