import { PredioModel } from "./predio.model";

export interface AndarModel {
  andarId: number;
  apelido?: string;
  predioId?: number;
  predio?: PredioModel;
}