import { AndarModel } from "./andar.model";
import { SalaDisponibilidadeModel } from "./sala-disponibilidade.model";
import { SalaRecursoModel } from "./sala-recurso.model";
import { SalaResponsavelModel } from "./sala-responsavel.model";
import { SalaTipoModel } from "./sala-tipo.model";


export interface SalaModel {
  salaId?: number;
  apelido: string;
  capacidade: number;
  publicoExterno: boolean;
  bitBloqueiaPublicoExterno: boolean;
  salaTipoId: number;
  salaTipo?: SalaTipoModel;
  andar: AndarModel;
  recursos: SalaRecursoModel[];
  responsaveis: SalaResponsavelModel[];
  disponibilidade?: SalaDisponibilidadeModel[];
  aliasCadastro?: string;
  dtCadastro?: string | Date;
  nomeAlteracao?: string;
  aliasAlteracao?: string;
  dtAlteracao?: string | Date;
}