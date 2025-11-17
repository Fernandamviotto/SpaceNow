export class SolicitacaoReservaModel {
  reservaId: number;
  titulo: string;
  dataInicioReserva: string;
  dataFimReserva: string;
  horaInicioReserva: string;
  horaFimReserva: string;
  aliasCadastro: string;
  nomeCadastro: string;
  dtCadastro: string;
  motivo: string;
  quantidadePessoas: number;
  salaId: number;
  reservaTipoId: number;
  perfil?: string;
  dtAlteracao?: string;
  canSubmit: boolean;

  constructor() {
    this.reservaId = 0;
    this.titulo = "";
    this.dataInicioReserva = "";
    this.dataFimReserva = "";
    this.horaInicioReserva = "";
    this.horaFimReserva = "";
    this.aliasCadastro = "";
    this.nomeCadastro = "";
    this.dtCadastro = "";
    this.motivo = "";
    this.quantidadePessoas = 0;
    this.salaId = 0;
    this.reservaTipoId = 0;
    this.perfil = "";
    this.dtAlteracao = "";
    this.canSubmit = false;
  }
}
