export class SolicitacaoAgendaStatusModel {
  constructor(public id?: number, public nome?: string) {
    this.id = id || 0;
    this.nome = nome || "";
  }
}
