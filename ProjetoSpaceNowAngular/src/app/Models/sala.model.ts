import { AndarModel } from "./andar.model";
import { SalaImagemModel } from "./sala-imagem.model";
import { SalaRecursoModel } from "./sala-recurso.model";
import { SalaResponsavelModel } from "./sala-responsavel.model";
import { SalaTipoModel } from "./sala-tipo.model";

export class SalaModel {
  salaId: number = 0;
  apelido: string = '';
  capacidade: number = 0;
  publicoExterno: boolean = false;
  bitBloqueiaPublicoExterno: boolean = false;
  salaTipoId: number = 0;
  salaTipo: SalaTipoModel = new SalaTipoModel();
  andar: AndarModel = new AndarModel();
  recursos: SalaRecursoModel[] = [];
  responsaveis: SalaResponsavelModel[] = [];
  imagens: SalaImagemModel[] = [];
  ativo: boolean = true;
  aliasCadastro?: string;
  dtCadastro?: string;
  nomeAlteracao?: string;
  aliasAlteracao?: string;
  dtAlteracao?: string;
  ids: string[] = [];
}
