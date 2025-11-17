import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ModalDetalhesSalaComponent } from "../../../shared/componets/modal-detalhes-sala/modal-detalhes-sala.component";
import { ModalComponent } from "../../../shared/componets/modal/modal.component";
import { AppSettings } from "../../../shared/componets/app-settings";
import { SalaService } from "../../../shared/services/sala.service";
import { MockSalaService } from "../../../shared/services/mock-sala.service";
import { UtilComponent } from "../../../shared/componets/util.component";
import { SalaTipoModel } from "../../../shared/models/sala-tipo.model";
import { SalaModel } from "../../../shared/models/sala.model";
import { SelectOption } from "../../../shared/models/select-option.model";
import { SolicitacaoAgendaModel } from "../../../shared/models/solicitacao-agenda.model";

@Component({
  selector: "app-salas-list",
  templateUrl: "./salas-list.component.html",
  styleUrls: ["./salas-list.component.css"],
})
export class SalasListComponent implements OnInit, OnDestroy {
  agenda: SolicitacaoAgendaModel = new SolicitacaoAgendaModel();
  sala: SalaModel = new SalaModel();
  salas: SalaModel[] = [];
  admin: boolean = false;

  currentPage: number = 1;
  currentIndex: number = 0;
  totalItems: number = 0;

  util = UtilComponent;
  appSettings = AppSettings;

  tiposDeSala: SelectOption[] = [];
  predios: SelectOption[] = [];
  listRoomType: SalaTipoModel[] = [];

  constructor(
    private route: Router,
    private _dialog: MatDialog,
    private _salaService: SalaService,
    private _mockSalaService: MockSalaService // 👈 injete o mock
  ) {}

  ngOnInit() {
    this.getRooms();
  }

  ngOnDestroy() {}

  /** 🔹 Busca as salas (ativas ou inativas) */
  getRooms(ativas: boolean = true) {
    this._salaService
      .getConsultaGrid(this.prepararFiltroSala(), this.currentPage, 20, ativas)
      .subscribe({
        next: (response) => {
          if (response?.result?.length) {
            // Normalize API shape to match SalaModel[] so TypeScript compiles
            this.salas = (response.result as any[]).map((r: any) => {
              return {
                ...r,
                // ensure properties expected by SalaModel exist
                responsaveis: r.responsaveis ?? [],
                predioId: r.predioId ?? r.andar?.predio?.predioId ?? null,
                tipoDeSalaId: r.tipoDeSalaId ?? r.salaTipo?.id ?? null,
                tipoDeSala:
                  r.tipoDeSala ??
                  (r.salaTipo
                    ? { id: r.salaTipo.id, nomeTipo: r.salaTipo.nomeTipo }
                    : null),
              } as SalaModel;
            });
            this.totalItems = response.pagination.totalRows;
            this.currentPage = response.pagination.pageNumber;
          } else {
            console.warn("API retornou vazio, usando dados mockados...");
            this.carregarMock(ativas);
          }
        },
        error: (err) => {
          console.error("Erro ao buscar salas da API:", err);
          this.carregarMock(ativas); // fallback automático
        },
      });
  }

  /** 🔹 Fallback para dados mockados */
  carregarMock(ativas: boolean) {
    this._mockSalaService
      .getConsultaGrid(this.prepararFiltroSala(), this.currentPage, 20, ativas)
      .subscribe((response) => {
        this.salas = (response.result as any[]).map((r: any) => {
          return {
            ...r,
            // ensure properties expected by SalaModel exist
            responsaveis: r.responsaveis ?? [],
            predioId: r.predioId ?? r.andar?.predio?.predioId ?? null,
            tipoDeSalaId: r.tipoDeSalaId ?? r.salaTipo?.id ?? null,
            tipoDeSala:
              r.tipoDeSala ??
              (r.salaTipo
                ? { id: r.salaTipo.id, nomeTipo: r.salaTipo.nomeTipo }
                : null),
          } as SalaModel;
        });
        this.totalItems = response.pagination.totalRows;
        this.currentPage = response.pagination.pageNumber;
      });
  }

  /** 🔹 Detalhes da sala (abre modal) */
  getRoomDetail(salaId: number) {
    const dialogRef = this._dialog.open(ModalDetalhesSalaComponent, {
      data: { salaId },
    });

    dialogRef.afterClosed().subscribe(() => {
      document.querySelectorAll(".modal-backdrop").forEach((e) => e.remove());
    });
  }

  /** 🔹 Paginação */
  changePage(event: number) {
    this.currentPage = event;
    this.getRooms();
  }

  addRoom() {
    this._salaService.id = null;
    sessionStorage.removeItem("roomId");
    this.route.navigate(["/salas/novo"]);
  }

  /** 🔹 Editar sala */
  editRoom(id: number) {
    this._salaService.id = id;
    this.route.navigate(["/salas/novo"]);
  }

  showMessage(message?: string) {
    const dialogRef = this._dialog.open(ModalComponent, {
      data: {
        title: "Space Now",
        message: message || "Space Now",
      },
    });

    dialogRef.afterClosed().subscribe(() => this.getRooms());
  }

  /** 🔹 Clique nas abas (ativas/inativas) */
  onTabClicked(index: number): void {
    this.currentIndex = index;
    if (index === 0) this.getRooms(true);
    if (index === 1) this.getRooms(false);
  }

  /** 🔹 Monta filtro de sala (placeholder para sua lógica) */
  prepararFiltroSala() {
    return {}; // Adapte se houver filtros aplicáveis
  }
}
