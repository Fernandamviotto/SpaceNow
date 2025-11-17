export class ReservaTipoModel {
  constructor(public reservaTipoId?: number, public nome?: string) {
    this.reservaTipoId = reservaTipoId || 0;
    this.nome = nome || "";
  }
}
