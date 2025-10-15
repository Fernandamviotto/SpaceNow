import { Predio } from './predio.model';

export interface Andar {
  andarId: number;
  apelido?: string;
  predioId?: number;
  predio?: Predio;
}