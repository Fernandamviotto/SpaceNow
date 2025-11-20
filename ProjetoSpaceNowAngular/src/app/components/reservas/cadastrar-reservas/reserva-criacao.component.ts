import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";

import { AgendaService } from "../../../shared/services/agenda.service";
import { ReservaTipoService } from "../../../shared/services/reserva-tipo.service";
import { ReservaService } from "../../../shared/services/reserva.service";
import { SalaService } from "../../../shared/services/sala.service";
import { UtilComponent } from "../../../shared/componets/util.component";

import { ReservaTipoModel } from "../../../shared/models/reserva-tipo.model";
import { SalaModel } from "../../../shared/models/sala.model";
import { CreateReservaRequest } from "src/app/shared/models/solicitacao-reserva.model";
import { TipoReserva } from "src/app/shared/enum/tipo-reserva.enum";

@Component({
  selector: "app-reserva-criacao",
  templateUrl: "./reserva-criacao.component.html",
  styleUrls: ["./reserva-criacao.component.css"],
})
export class ReservaCriacaoComponent implements OnInit {
  sala: SalaModel = new SalaModel();
  salasDisponiveis: SalaModel[] = [];
  reservaTipo: ReservaTipoModel[] = [];

  tiposReserva = Object.entries(TipoReserva)
    .filter(([key, value]) => typeof value === "number") // filtra apenas os valores numéricos
    .map(([key, value]) => ({ label: key, value }));

  reserva: CreateReservaRequest = new CreateReservaRequest();

  reservada = false;
  bloqueada = false;
  tempoMenor = false;
  boolDays = false;
  edicao = true; // tela de criação ativa
  util = UtilComponent;

  @ViewChildren("horariosInicio") horariosInicio: QueryList<ElementRef>;
  @ViewChildren("horariosFim") horariosFim: QueryList<ElementRef>;
  @ViewChild("txtParticipante") txtParticipante!: NgModel;

  constructor(
    private router: Router,
    private _salaService: SalaService,
    private _reservaTipoService: ReservaTipoService,
    private _reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.loadSalas();
    this.loadTiposReserva();
  }

  /** ------------------ MÉTODOS DE CARREGAMENTO ------------------ **/
  loadSalas(): void {
    this._salaService.getSelectList().subscribe({
      next: (res) => (this.salasDisponiveis = res),
      error: (err) => console.error("Erro ao carregar salas:", err),
    });
  }

  loadTiposReserva(): void {
    this._reservaTipoService.getAll().subscribe({
      next: (res) => (this.reservaTipo = res),
      error: (err) => console.error("Erro ao carregar tipos de reserva:", err),
    });
  }

  /** ------------------ EVENTOS DE FORMULÁRIO ------------------ **/
  onSalaChange(form: NgForm) {
    this.sala =
      this.salasDisponiveis.find((s) => s.salaId === +this.reserva.salaId) ||
      new SalaModel();
    if (this.txtParticipante) {
      this.checkCapacity(this.txtParticipante, form);
    }
    this.updateCanSubmit(form);
  }

  onTipoChange(): void {
    if (this.reserva.reservaTipoId == null) {
      this.reservaTipo = [];
      return;
    }

    this._reservaTipoService.getById(this.reserva.reservaTipoId).subscribe({
      next: (data) => (this.reservaTipo = data),
      error: (err) => console.error("Erro ao carregar subtipos:", err),
    });
  }

  changeTipoReserva(): void {
    if (!this.reserva.reservaTipoId) return;

    this._reservaTipoService.getById(this.reserva.reservaTipoId).subscribe({
      next: (res) => (this.reservaTipo = res),
      error: (err) => console.error("Erro ao carregar subtipos:", err),
    });
  }

  checkCapacity(txtParticipante: NgModel, form: NgForm) {
    const qtd = this.reserva.quantidadePessoas || 0;
    const capacidade = this.sala?.capacidade || 0;

    const errors = { ...txtParticipante.control.errors };

    if (qtd > capacidade) {
      errors["capacidadeExcedida"] = true;
    } else {
      delete errors["capacidadeExcedida"];
    }

    txtParticipante.control.setErrors(
      Object.keys(errors).length ? errors : null
    );

    // Atualiza botão com referência ao form
    this.updateCanSubmit(form);
  }

  checkDate(form: NgForm): void {
    if (this.reserva.dataInicio && this.reserva.dataFim) {
      const inicio = new Date(this.reserva.dataInicio);
      const fim = new Date(this.reserva.dataFim);
      this.tempoMenor = fim < inicio;
    }
    this.updateCanSubmit(form);
  }

  checkTime(txtField: NgModel, form: NgForm): void {
    const start = this.reserva.horaInicio;
    const end = this.reserva.horaFim;
    if (start && end && start >= end) {
      txtField.control.setErrors({ invalidTime: true });
    } else if (txtField) {
      txtField.control.setErrors(null);
    }
    this.updateCanSubmit(form);
  }

  /** ------------------ SUBMISSÃO ------------------ **/
  bookResource(form: NgForm): void {
    if (form.invalid || this.bloqueada) return;

    const payload: CreateReservaRequest = {
      salaId: this.reserva.salaId,
      sala: this.reserva.sala,
      tipo: TipoReserva[this.reserva.tipo],
      reservaTipoId: this.reserva.reservaTipoId,
      solicitante: this.reserva.solicitante,
      dataInicio: this.reserva.dataInicio,
      dataFim: this.reserva.dataFim,
      quantidadePessoas: this.reserva.quantidadePessoas,
      horaInicio: this.reserva.horaInicio,
      horaFim: this.reserva.horaFim,
      canSubmit: true,
      titulo: this.reserva.titulo,
      id: this.reserva.id,
    };

    this._reservaService.criarReserva(payload).subscribe({
      next: () => {
        alert("Reserva criada com sucesso!");
        this.router.navigate(["/reservas"]);
      },
      error: (err) => console.error("Erro ao criar reserva:", err),
    });
  }

  back(): void {
    this.router.navigate(["/reservas"]);
  }

  /** ------------------ AUXILIARES DE CSS ------------------ **/
  applyCssErrorValidation(field: NgModel, form: NgForm) {
    return {
      "is-invalid": field.invalid && (field.touched || form.submitted),
      "is-valid": field.valid && (field.touched || form.submitted),
    };
  }

  fieldValidTouched(field: NgModel, form: NgForm): boolean {
    return field?.invalid && (field?.touched || form.submitted);
  }

  updateCanSubmit(form: NgForm) {
    this.reserva.canSubmit =
      !!this.reserva.salaId &&
      !!this.reserva.tipo &&
      !!this.reserva.dataInicio &&
      !!this.reserva.dataFim &&
      !!this.reserva.horaInicio &&
      !!this.reserva.horaFim &&
      this.reserva.quantidadePessoas > 0 &&
      !this.tempoMenor &&
      !this.bloqueada &&
      (!this.txtParticipante.control.errors ||
        Object.keys(this.txtParticipante.control.errors).length === 0) &&
      form.valid;
  }
}
