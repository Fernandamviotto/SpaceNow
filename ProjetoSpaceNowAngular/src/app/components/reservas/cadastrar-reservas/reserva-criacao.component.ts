import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AgendaService } from "../../../shared/services/agenda.service";
import { ReservaTipoService } from "../../../shared/services/reserva-tipo.service";
import { ReservaService } from "../../../shared/services/reserva.service";
import { SalaService } from "../../../shared/services/sala.service";
import { UtilComponent } from "../../../shared/componets/util.component";
import { ReservaTipoModel } from "../../../shared/models/reserva-tipo.model";
import { SalaModel } from "../../../shared/models/sala.model";
import { SolicitacaoReservaModel } from "../../../shared/models/solicitacao-reserva.model";

@Component({
  selector: "app-reserva-criacao",
  templateUrl: "./reserva-criacao.component.html",
  styleUrls: ["./reserva-criacao.component.css"],
})
export class ReservaCriacaoComponent implements OnInit {
  sala: SalaModel = new SalaModel();
  salasDisponiveis: SalaModel[] = [];
  reservaTipo: ReservaTipoModel[] = [];
  reservaSubTipo: any[] = [];

  reserva: SolicitacaoReservaModel = new SolicitacaoReservaModel();
  reservada = false;
  bloqueada = false;
  tempoMenor = false;
  boolDays = false;
  edicao = true; // tela de criação ativa
  util = UtilComponent;

  @ViewChildren("horariosInicio") horariosInicio: QueryList<ElementRef>;
  @ViewChildren("horariosFim") horariosFim: QueryList<ElementRef>;
  @ViewChild("txtParticipante", { static: false }) txtParticipante: ElementRef;

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

  onSalaChange(form: NgForm): void {
    this.sala =
      this.salasDisponiveis.find((s) => s.salaId === +this.reserva.salaId) ||
      new SalaModel();
    this.checkCapacity(form.controls["txtParticipante"]);
  }

  changeTipoReserva(): void {
    if (!this.reserva.reservaTipoId) return;
    this._reservaTipoService.getById(this.reserva.reservaTipoId).subscribe({
      next: (res) => (this.reservaSubTipo = res),
      error: (err) => console.error("Erro ao carregar tipos:", err),
    });
  }

  checkCapacity(txtParticipante: any): void {
    if (this.reserva.quantidadePessoas && this.sala?.capacidade) {
      if (this.reserva.quantidadePessoas > this.sala.capacidade) {
        txtParticipante.control.setErrors({ capacidadeExcedida: true });
      } else {
        txtParticipante.control.setErrors(null);
      }
    }
  }

  checkDate(form: NgForm): void {
    const inicio = new Date(this.reserva.dataInicioReserva);
    const fim = new Date(this.reserva.dataFimReserva);
    this.tempoMenor = fim < inicio;
  }

  checkTime(field: any, form: NgForm): void {
    const start = this.reserva.horaInicioReserva;
    const end = this.reserva.horaFimReserva;
    if (start && end && start >= end) {
      field.control.setErrors({ invalidTime: true });
    }
  }

  clickDay(checked: boolean, event: any): void {
    this.boolDays = true;
  }

  clickWeekend(checked: boolean, event: any): void {
    this.boolDays = true;
  }

  /** ------------------ SUBMISSÃO ------------------ **/

  bookResource(form: NgForm): void {
    if (form.invalid || this.bloqueada) return;

    // map SolicitacaoReservaModel to the shape expected by criarReserva (Omit<Reserva, "id" | "status">)
    const payload: any = {
      sala: this.reserva.salaId ? { id: this.reserva.salaId } : null,
      tipo: this.reserva.reservaTipoId
        ? { id: this.reserva.reservaTipoId }
        : null,
      solicitante: (this.reserva as any).solicitante ?? null,
      dataInicio:
        this.reserva.dataInicioReserva && this.reserva.horaInicioReserva
          ? new Date(
              `${this.reserva.dataInicioReserva}T${this.reserva.horaInicioReserva}`
            )
          : null,
      dataFim:
        this.reserva.dataFimReserva && this.reserva.horaFimReserva
          ? new Date(
              `${this.reserva.dataFimReserva}T${this.reserva.horaFimReserva}`
            )
          : null,
      quantidadePessoas: this.reserva.quantidadePessoas,
      // add other fields required by the API if needed
    };

    // cast payload to any to satisfy the service signature
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

  applyCssErrorValidation(field: any, form: NgForm): any {
    return {
      "is-invalid": field.invalid && (field.touched || form.submitted),
    };
  }

  fieldValidTouched(field: any, form: NgForm): boolean {
    return field.invalid && (field.touched || form.submitted);
  }
}
