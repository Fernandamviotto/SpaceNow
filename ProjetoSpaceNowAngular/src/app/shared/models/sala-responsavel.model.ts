export class SalaResponsavelModel {
  id?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  cargo?: string;
  ativo?: boolean;

  constructor() {
    this.ativo = true;
  }
}
