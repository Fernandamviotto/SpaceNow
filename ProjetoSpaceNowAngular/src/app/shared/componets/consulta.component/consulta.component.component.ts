import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SalaModel } from '../../models/sala.model';
import { PredioModel } from '../../models/predio.model';
import { AndarModel } from '../../models/andar.model';
import { SalaTipoModel } from '../../models/sala-tipo.model';
import { SalaService } from '../../services/sala.service';
import { PredioService } from '../../services/predio.service';
import { AndarService } from '../../services/andar.service';
import { SalaTipoService } from '../../services/sala-tipo.service';
import { TabComponent } from '../tab/tab.component';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { ModalDetalhesSalaComponent } from '../modal-detalhes-sala.component/modal-detalhes-sala.component.component';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, NgxPaginationModule, TabComponent, TabGroupComponent, ModalDetalhesSalaComponent],
  templateUrl: './consulta.component.component.html',
  styleUrls: ['./consulta.component.component.css']
})
export class ConsultaComponent implements OnInit {
  salas: SalaModel[] = [];
  predios: PredioModel[] = [];
  andares: AndarModel[] = [];
  tiposDeSala: SalaTipoModel[] = [];

  salasFiltro: SalaModel[] = [];
  prediosSelecionados: number[] = [];
  andaresSelecionados: number[] = [];
  tiposDeSalaSelecionados: number[] = [];
  salasSelecionadas: number[] = [];

  currentPage: number = 1;
  totalItems: number = 0;
  ITENS_POR_PAGINA: number = 10;
  
  salaDetalhes?: SalaModel;
  showModal: boolean = false;

  constructor(
    private salaService: SalaService,
    private predioService: PredioService,
    private andarService: AndarService,
    private salaTipoService: SalaTipoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPredios();
    this.loadAndares();
    this.loadTiposDeSala();
    this.loadSalas();

  }

  loadPredios(): void {
    this.predioService.getAll().subscribe((res) => (this.predios = res));
  }

  loadAndares(): void {
    this.andarService.getAll().subscribe((res) => (this.andares = res));
  }

  loadTiposDeSala(): void {
    this.salaTipoService.getAll().subscribe((res) => (this.tiposDeSala = res));
  }

  loadSalas(): void {
    this.salaService.getSalas(this.currentPage).subscribe((res) => {
      this.salas = res.data;
      this.totalItems = res.totalItems;
      this.salasFiltro = [...res.data];
    });
  }

  setFilterPredio(selected: number[]): void {
    this.prediosSelecionados = selected;
  }

  setFilterAndar(selected: number[]): void {
    this.andaresSelecionados = selected;
  }

  setFilterTipoDeSala(selected: number[]): void {
    this.tiposDeSalaSelecionados = selected;
  }

  setFilterSala(selected: number[]): void {
    this.salasSelecionadas = selected;
  }

  aplicarFiltro(): void {
    this.salas = this.salasFiltro.filter((sala) => {
      const andarMatch = this.andaresSelecionados.length ? this.andaresSelecionados.includes(sala.andar.andarId) : true;
      const tipoMatch = this.tiposDeSalaSelecionados.length ? this.tiposDeSalaSelecionados.includes(sala.salaTipoId) : true;
      return andarMatch && tipoMatch;
    });
  }

  limparFiltro(): void {
    this.prediosSelecionados = [];
    this.andaresSelecionados = [];
    this.tiposDeSalaSelecionados = [];
    this.salas = [...this.salasFiltro];
  }

  verificaFiltros(): boolean {
    return this.prediosSelecionados.length || this.andaresSelecionados.length || this.tiposDeSalaSelecionados.length ? true : false;
  }

  onTabClicked(tabIndex: number): void {
    // lógica para alternar entre abas Ativas/Inativas
    // você pode filtrar as salas baseado no status ativo
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadSalas();
  }

  addRoom(): void {
    this.router.navigate(['/salas/cadastro']);
  }

  editRoom(salaId: number | undefined): void {
    if (!salaId) return;
    this.router.navigate(['/salas/cadastro'], { queryParams: { id: salaId } });
  }

  getRoomDetail(salaId: number | undefined): void {
    if (!salaId) return;
    this.salaService.getById(salaId).subscribe((sala) => {
      this.salaDetalhes = sala;
      this.showModal = true;
    });
  }
  
  closeModal(): void {
    this.showModal = false;
    this.salaDetalhes = undefined;
  }
}