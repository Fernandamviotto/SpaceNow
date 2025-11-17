import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AgendaService } from "../../services/agenda.service";
import { ReservaService } from "../../services/reserva.service";
import { AgendaStatus } from "../../enum/agenda-status.enum";
import { TipoReserva } from "../../enum/tipo-reserva.enum";
import { SolicitacaoAgendaModel } from "../../models/solicitacao-agenda.model";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-modal-detalhes-reserva",
  templateUrl: "./modal-detalhes-reserva.component.html",
  styleUrls: ["./modal-detalhes-reserva.component.css"],
})
export class ModalDetalhesReservaComponent implements OnInit, AfterViewInit {
  reserva!: SolicitacaoAgendaModel;
  tipoReservaEnum = TipoReserva;
  agendaStatusEnum = AgendaStatus;
  carregando = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalDetalhesReservaComponent>,
    private agendaService: AgendaService,
    private reservaService: ReservaService,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.data?.reservaId) {
      this.carregarReserva(this.data.reservaId);
    }
  }

  ngAfterViewInit(): void {}

  carregarReserva(id: number): void {
    this.carregando = true;
    this.agendaService.obterReservaPorId(id).subscribe({
      next: (res: SolicitacaoAgendaModel) => {
        this.reserva = res;
        this.carregando = false;
      },
      error: () => {
        this.sharedService.mostrarMensagem(
          "Erro ao carregar detalhes da reserva."
        );
        this.carregando = false;
      },
    });
  }

  aprovarReserva(): void {
    this.carregando = true;
    this.reservaService.aprovarReserva(this.reserva.reservaId).subscribe({
      next: () => {
        this.sharedService.mostrarMensagem("Reserva aprovada com sucesso.");
        this.carregando = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.sharedService.mostrarMensagem("Erro ao aprovar reserva.");
        this.carregando = false;
      },
    });
  }

  negarReserva(): void {
    this.carregando = true;
    this.reservaService.negarReserva(this.reserva.reservaId).subscribe({
      next: () => {
        this.sharedService.mostrarMensagem("Reserva negada.");
        this.carregando = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.sharedService.mostrarMensagem("Erro ao negar reserva.");
        this.carregando = false;
      },
    });
  }

  cancelarReserva(): void {
    this.carregando = true;
    this.reservaService.cancelarReserva(this.reserva.reservaId).subscribe({
      next: () => {
        this.sharedService.mostrarMensagem("Reserva cancelada.");
        this.carregando = false;
        this.dialogRef.close(true);
      },
      error: () => {
        this.sharedService.mostrarMensagem("Erro ao cancelar reserva.");
        this.carregando = false;
      },
    });
  }

  remanejarReserva(): void {
    this.dialogRef.close();
    this.router.navigate(["/reservas/remanejar", this.reserva.reservaId]);
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}
