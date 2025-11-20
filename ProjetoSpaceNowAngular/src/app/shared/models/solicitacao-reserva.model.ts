export class CreateReservaRequest {
  horaInicio: any;
  horaFim: any;
  canSubmit: boolean;
  salaId: number;
  sala: string;
  tipo: string;
  reservaTipoId?: number;
  solicitante: string;
  dataInicio: string;
  dataFim: string;
  quantidadePessoas: number;
  titulo: string;
  id: number;
}

export interface ReservaDto {
  id: number;
  titulo: string;
  sala: string;
  tipo: string;
  solicitante: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  quantidadePessoas: number;
}
