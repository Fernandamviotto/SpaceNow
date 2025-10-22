import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectStubComponent } from '../../shared/ng-select/ng-select.component';
import { TabGroupComponent } from '../../shared/tabs/tab-group.component';
import { TabComponent } from '../../shared/tabs/tab.component';
import { PaginationControlsComponent } from '../../shared/pagination/pagination-controls.component';
import { PaginatePipe } from '../../../pipes/paginate.pipe';
import { Router } from '@angular/router';
import { MatDialog } from '../../../shared/modal-stubs';
import { AppSettings } from '../../../shared/app-settings';
import { UtilComponent } from '../../../shared/util.component';
import { SalaModel } from '../../../Models/sala.model';
import { SalaTipoModel } from '../../../Models/sala-tipo.model';
import { SalaService } from '../../../services/sala.service';
import { SalaTipoService } from '../../../services/sala-tipo.service';
import { SelecaoFiltroService } from '../../../services/selecao-filtro.service';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, NgSelectStubComponent, TabGroupComponent, TabComponent, PaginationControlsComponent, PaginatePipe],
})
export class ConsultaComponent implements OnInit, OnDestroy {
    // agenda: SolicitacaoAgendaModel = new SolicitacaoAgendaModel(); // not defined in project, remove for now
    sala: SalaModel = new SalaModel();
    salas: SalaModel[] = new Array<SalaModel>();
    admin: boolean = false;
    currentPage: number = 1;
    currentIndex: number = 0;
    totalItems: number = 0;
    util = UtilComponent;
    appSettings = AppSettings;
    tiposDeSala: Array<SelectOption> = new Array<SelectOption>();
    salasFiltro: Array<SelectOption> = new Array<SelectOption>();
    andares: Array<SelectOption> = new Array<SelectOption>();
    predios: Array<SelectOption> = new Array<SelectOption>();
    listRoomType: SalaTipoModel[] = new Array<SalaTipoModel>();
    tipoDeSalaIdFiltro: string = '';
    salaIdFiltro: string = '';
    andarIdFiltro: string = '';
    predioIdFiltro: string = '';
    salasSelecionadas: Array<SelectOption> = new Array<SelectOption>();
    andaresSelecionados: Array<SelectOption> = new Array<SelectOption>();
    prediosSelecionados: Array<SelectOption> = new Array<SelectOption>();
    tiposDeSalaSelecionados: Array<SelectOption> = new Array<SelectOption>();

    constructor(
        private route: Router,
        private _dialog: MatDialog,
        private _salaService: SalaService,
        private _salaTipoService: SalaTipoService,
        private _selecaoFiltroService: SelecaoFiltroService
    ) {}

    ngOnInit() {
        this.getRooms();
        this.carregarFiltros();
    }

    ngOnDestroy(): void {
        this._selecaoFiltroService.resetarFiltros();
    }

    carregarFiltros() {
        this.getBuilding();
        this.getFloors();
        this.getFilterRooms();
        this.getRoomType();
    }

    aplicarFiltro() {
        this.currentPage = 1;
        this.getRooms(this.currentIndex === 0 ? true : false);
    }

    getRooms(ativas = true) {
        this._salaService.getConsultaGrid(this.prepararFiltroSala(), this.currentPage, 20, ativas).subscribe({
            next: (response: any) => {
                this.salas = response.result;
                this.totalItems = response.pagination.totalRows;
                this.currentPage = response.pagination.pageNumber;
            },
        });
    }

    getBuilding() {
        this._selecaoFiltroService.buscarPredios().subscribe({
            next: (response: any) => {
                this.predios = response;
            },
        });
        this.getRoomType();
    }

    getFloors() {
        this._selecaoFiltroService.buscarAndares(this.prepararFiltroSala()).subscribe({
            next: (response: any) => {
                this.andares = response;
            },
        });
    }

    getFilterRooms() {
        this._selecaoFiltroService.buscarSalasPorAbas(this.prepararFiltroSala(), 1, 5000, this.currentIndex === 0).subscribe({
            next: (response: any) => {
                this.salasFiltro = response;
            },
        });
    }

    getRoomType() {
        this._selecaoFiltroService.buscarTipoDeSalas().subscribe({
            next: (roomTypes: any) => {
                this.tiposDeSala = roomTypes;
            },
        });
    }

    prepararFiltroSala() {
        let sala = new SalaModel();
        if (sala.andar && sala.andar.predio) sala.andar.predio.ids = this._selecaoFiltroService.recuperaPredioIdFiltro();
        if (sala.salaTipo) sala.salaTipo.ids = this._selecaoFiltroService.recuperaTipoSalaIdFiltro();
        sala.ids = this._selecaoFiltroService.recuperaSalaIdFiltro();
        if (sala.andar) sala.andar.ids = this._selecaoFiltroService.recuperaAndarIdFilter();
        return sala;
    }

    setFilterPredio(data: any) {
        this._selecaoFiltroService.atribuirFiltroPredio(data, this.prepararFiltroSala());
        this.getFloors();
        this.getFilterRooms();
    }

    setFilterAndar(data: any) {
        this._selecaoFiltroService.atribuirFiltroAndar(data, this.prepararFiltroSala());
        this.getFilterRooms();
    }

    setFilterSala(data: any) {
        this._selecaoFiltroService.atribuirFiltroSala(data);
    }

    setFilterTipoDeSala(data: any) {
        this._selecaoFiltroService.atribuirFiltroTipoSala(data, this.prepararFiltroSala());
        this.getFilterRooms();
    }

    // kept detailed handler below; this placeholder is safe for template event types
    // actual logic implemented in onTabClicked(index: number)

    limparFiltro() {
        this.currentPage = 1;
        this._selecaoFiltroService.adicionaPredioIdFiltro('');
        this._selecaoFiltroService.adicionaAndarIdFiltro('');
        this._selecaoFiltroService.adicionaSalaIdFiltro('');
        this._selecaoFiltroService.adicionaTipoSalaIdFiltro('');
        this.salasSelecionadas = [];
        this.andaresSelecionados = [];
        this.prediosSelecionados = [];
        this.tiposDeSalaSelecionados = [];
        this.getBuilding();
        this.getFloors();
        this.getFilterRooms();
        this.getRooms();
    }

    getRoomDetail(salaId: any) {
        const dialogRef = this._dialog.open(ModalDetalhesSalaComponent, {
            data: { salaId: salaId },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            $('.modal-backdrop').remove();
        });
    }

    changePage(event: any) {
        this.currentPage = event;
        this.getRooms();
    }

    addRoom() {
        this._salaService.id = null;
        sessionStorage.removeItem('roomId');
        this.route.navigate(['/salas/cadastro']);
    }

    editRoom(id: number) {
        this._salaService.id = id;
        this.route.navigate(['/salas/cadastro']);
    }

    showMessage(message?: string) {
        const dialogRef = this._dialog.open(ModalComponent, {
            data: {
                title: 'Insper Space',
                message: message || 'Insper Space',
            },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            this.getRooms();
        });
    }

    verificaFiltros(): boolean {
        return this._selecaoFiltroService.filtrosSelecionados();
    }

    onTabClicked(index: number): void {
        this.currentIndex = index;
        this.getFilterRooms();

        if (index === 0) {
            this.getRooms();
        }

        if (index === 1) {
            this.getRooms(false);
        }
    }
}
