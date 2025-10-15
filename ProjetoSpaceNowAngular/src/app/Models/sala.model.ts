import { Andar } from './andar.model';
import { SalaRecurso } from './sala-recurso.model';
import { SalaResponsavel } from './sala-responsavel.model';
import { SalaTipo } from './sala-tipo.model';
import { SalaDisponibilidade } from './sala-disponibilidade.model';

export interface Sala {
  salaId?: number;
  apelido: string;
  capacidade: number;
  publicoExterno: boolean;
  bitBloqueiaPublicoExterno: boolean;
  salaTipoId: number;
  salaTipo?: SalaTipo;
  andar: Andar;
  recursos: SalaRecurso[];
  responsaveis: SalaResponsavel[];
  disponibilidade?: SalaDisponibilidade[];
  aliasCadastro?: string;
  dtCadastro?: string | Date;
  nomeAlteracao?: string;
  aliasAlteracao?: string;
  dtAlteracao?: string | Date;
}