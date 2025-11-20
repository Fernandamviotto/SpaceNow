import { PersonalDataModel } from "./personal-data.model";
import { ReservaTipoModel } from "./reserva-tipo.model";
import { SalaModel } from "./sala.model";
import { SolicitacaoAgendaStatusModel } from "./solicitacao-agenda-status.model";
import { CreateReservaRequest } from "./solicitacao-reserva.model";

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
  reserva: CreateReservaRequest;
  status: boolean;
  tipoString: string;
  perfil: string;

  constructor() {
    this.sala = new SalaModel();
    this.tipo = new ReservaTipoModel();
    this.agendaStatus = new SolicitacaoAgendaStatusModel();
    this.reserva = new CreateReservaRequest();
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
    this.reserva.dataInicio = solicitacaoAgenda.reserva.dataInicio;
    this.reserva.dataFim = solicitacaoAgenda.reserva.dataFim;
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
    solicitacaoReserva: CreateReservaRequest,
    agenda: SolicitacaoAgendaModel,
    personalInfo: PersonalDataModel,
    tipoReserva: ReservaTipoModel
  ) {
    solicitacaoReserva.dataFim = solicitacaoReserva.dataInicio;
    this.agendaId = agenda.agendaId;
    this.aliasCadastro = solicitacaoReserva.solicitante;
    this.aliasAlteracao = personalInfo.login;
    this.nomeAlteracao = personalInfo.fullName;
    this.data = solicitacaoReserva.dataInicio;
    this.horaInicio = solicitacaoReserva.horaInicio.substr(0, 5);
    this.horaFim = solicitacaoReserva.horaFim.substr(0, 5);
    this.motivoReserva = solicitacaoReserva.titulo;
    this.quantidadePessoas = solicitacaoReserva.quantidadePessoas;
    this.reservaId = solicitacaoReserva.id;
    this.salaId = solicitacaoReserva.salaId;
    this.reserva = solicitacaoReserva;
    this.reservaTipoId = tipoReserva.reservaTipoId;
    this.status = true;
  }
}
