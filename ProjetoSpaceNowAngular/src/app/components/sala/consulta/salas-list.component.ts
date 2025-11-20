import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SalaService } from "../../../shared/services/sala.service";
import { SalaModel } from "../../../shared/models/sala.model";
import { SalaTipoModel } from "../../../shared/models/sala-tipo.model";
import { ModalDetalhesSalaComponent } from "../../../shared/componets/modal-detalhes-sala/modal-detalhes-sala.component";
import { ModalComponent } from "../../../shared/componets/modal/modal.component";

@Component({
  selector: "app-salas-list",
  templateUrl: "./salas-list.component.html",
  styleUrls: ["./salas-list.component.css"],
})
export class SalasListComponent implements OnInit {
  salas: SalaModel[] = [];
  currentIndex: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;
  predios: any[] = [];
  tiposSala: any[] = [];

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private _salaService: SalaService
  ) {}

  ngOnInit(): void {
    this.getRooms(true); // inicia mostrando salas ativas
  }

  getRooms(ativas: boolean = true) {
    this._salaService
      .getConsultaGrid({ ativo: ativas }, this.currentPage, 20, ativas)
      .subscribe({
        next: (response: any) => {
          if (response?.items?.length) {
            // Preenche predio e tipo de sala para exibição
            this.salas = response.items.map((r: any) => ({
              salaId: r.salaId,
              nome: r.nome,
              capacidade: r.capacidade,
              predioId: r.predioId,
              predioNome: r.predioNome, // já vem do backend
              tipoDeSalaId: r.tipoDeSalaId,
              tipoDeSalaNome: r.tipoDeSalaNome, // já vem do backend
              status: r.status,
            }));
            this.totalItems = response.totalCount;
            this.currentPage = response.pageNumber ?? 1;
          } else {
            this.salas = [];
            this.totalItems = 0;
          }
        },
        error: (err) => {
          console.error("Erro ao buscar salas da API:", err);
          this.salas = [];
          this.totalItems = 0;
        },
      });
  }

  /** 🔹 Tabs: Ativas/Inativas */
  onTabClicked(index: number): void {
    this.currentIndex = index;
    this.getRooms(index === 0); // 0 = ativas, 1 = inativas
  }

  /** 🔹 Abrir modal detalhes da sala */
  getRoomDetail(salaId: number) {
    const dialogRef = this._dialog.open(ModalDetalhesSalaComponent, {
      data: { salaId },
    });
    dialogRef
      .afterClosed()
      .subscribe(() =>
        document.querySelectorAll(".modal-backdrop").forEach((e) => e.remove())
      );
  }

  /** 🔹 Paginação */
  changePage(event: number) {
    this.currentPage = event;
    this.getRooms(this.currentIndex === 0);
  }

  /** 🔹 Adicionar nova sala */
  addRoom() {
    this._salaService.id = null;
    sessionStorage.removeItem("roomId");
    this.router.navigate(["/salas/novo"]);
  }

  /** 🔹 Editar sala */
  editRoom(id: number) {
    this._salaService.id = id;
    this.router.navigate(["/salas/novo"]);
  }

  /** 🔹 Mostrar mensagem genérica */
  showMessage(message?: string) {
    const dialogRef = this._dialog.open(ModalComponent, {
      data: { title: "Space Now", message: message || "Space Now" },
    });
    dialogRef
      .afterClosed()
      .subscribe(() => this.getRooms(this.currentIndex === 0));
  }
}
