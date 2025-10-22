export class SalaRecursoModel {
  constructor(recursoId: number = 0) {
    this.recursoId = recursoId;
    this.qtdRecurso = 1;
  }
  recursoId: number = 0;
  qtdRecurso: number = 1;
}
