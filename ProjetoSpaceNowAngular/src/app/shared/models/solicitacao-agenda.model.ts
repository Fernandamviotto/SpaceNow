import { PersonalDataModel } from "./personal-data.model";
import { ReservaTipoModel } from "./reserva-tipo.model";
import { SalaModel } from "./sala.model";
import { SolicitacaoAgendaStatusModel } from "./solicitacao-agenda-status.model";
import { SolicitacaoReservaModel } from "./solicitacao-reserva.model";

export class SolicitacaoAgendaModel {
  agendaId: number;
  agendaStatusId: number;
  agendaStatus: SolicitacaoAgendaStatusModel;
  reservaTipoId: number;
  tipo: ReservaTipoModel;
  reservaId: number;
  salaId: number;
  sala: SalaModel;
  data: string;
  horaInicio: string;
  horaFim: string;
  motivoReserva: string;
  dtAlteracao: string;
  aliasAlteracao: string;
  nomeAlteracao: string;
  nomeCadastro: string;
  quantidadePessoas: number;
  motivoNegacao: string;
  dtAprovacao: string;
  aliasCadastro: string;
  dtCadastro: string;
  reserva: SolicitacaoReservaModel;
  status: boolean;
  tipoString: string;
  perfil: string;

  constructor() {
    this.sala = new SalaModel();
    this.tipo = new ReservaTipoModel();
    this.agendaStatus = new SolicitacaoAgendaStatusModel();
    this.reserva = new SolicitacaoReservaModel();
    this.motivoNegacao = "";
    this.motivoReserva = "";
  }

  load(solicitacaoAgenda: any) {
    this.reserva = solicitacaoAgenda.reserva;
    this.sala =
      solicitacaoAgenda.sala == undefined
        ? new SalaModel()
        : solicitacaoAgenda.sala;
    this.agendaId = solicitacaoAgenda.agendaId;
    this.aliasCadastro = solicitacaoAgenda.aliasCadastro.toLowerCase();
    this.nomeCadastro = solicitacaoAgenda.nomeCadastro;
    this.dtCadastro = solicitacaoAgenda.dtCadastro;
    this.data = solicitacaoAgenda.data;
    this.reserva.dataInicioReserva =
      solicitacaoAgenda.reserva.dataInicioReserva;
    this.reserva.dataFimReserva = solicitacaoAgenda.reserva.dataFimReserva;
    this.horaInicio = solicitacaoAgenda.horaInicio.substr(0, 5);
    this.horaFim = solicitacaoAgenda.horaFim.substr(0, 5);
    this.motivoReserva = solicitacaoAgenda.motivoReserva;
    this.motivoNegacao = solicitacaoAgenda.motivoNegacao;
    this.quantidadePessoas = solicitacaoAgenda.quantidadePessoas;
    this.aliasAlteracao = solicitacaoAgenda.aliasAlteracao;
    this.nomeAlteracao = solicitacaoAgenda.nomeAlteracao;
    this.agendaStatus.nome = solicitacaoAgenda.agendaStatus.nome;
    this.agendaStatusId = solicitacaoAgenda.agendaStatusId;
    this.reservaId = solicitacaoAgenda.reservaId;
    this.dtAlteracao = solicitacaoAgenda.dtAlteracao;
    this.tipo = solicitacaoAgenda.reservaTipo;
  }

  updateAgenda(
    solicitacaoReserva: SolicitacaoReservaModel,
    agenda: SolicitacaoAgendaModel,
    personalInfo: PersonalDataModel
  ) {
    solicitacaoReserva.dataFimReserva = solicitacaoReserva.dataInicioReserva;
    this.agendaId = agenda.agendaId;
    this.aliasCadastro = solicitacaoReserva.aliasCadastro;
    this.nomeCadastro = solicitacaoReserva.nomeCadastro;
    this.aliasAlteracao = personalInfo.login;
    this.nomeAlteracao = personalInfo.fullName;
    this.dtCadastro = solicitacaoReserva.dtCadastro;
    this.data = solicitacaoReserva.dataInicioReserva;
    this.horaInicio = solicitacaoReserva.horaInicioReserva.substr(0, 5);
    this.horaFim = solicitacaoReserva.horaFimReserva.substr(0, 5);
    this.motivoReserva = solicitacaoReserva.motivo;
    this.quantidadePessoas = solicitacaoReserva.quantidadePessoas;
    this.reservaId = solicitacaoReserva.reservaId;
    this.dtAlteracao = solicitacaoReserva.dtAlteracao;
    this.salaId = solicitacaoReserva.salaId;
    this.reserva = solicitacaoReserva;
    this.reservaTipoId = solicitacaoReserva.reservaTipoId;

    this.motivoNegacao = agenda.motivoNegacao;
    this.dtAprovacao = agenda.dtAprovacao;
    this.status = true;
    this.perfil = solicitacaoReserva.perfil;
  }
}
