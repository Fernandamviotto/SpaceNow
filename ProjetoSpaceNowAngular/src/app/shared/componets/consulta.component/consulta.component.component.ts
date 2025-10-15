import { Component, OnInit } from '@angular/core';
import { SalaModel } from '../../models/sala.model';
import { PredioModel } from '../../models/predio.model';
import { AndarModel } from '../../models/andar.model';
import { SalaTipoModel } from '../../models/sala-tipo.model';
import { SalaService } from '../../services/sala.service';
import { PredioService } from '../../services/predio.service';
import { AndarService } from '../../services/andar.service';
import { SalaTipoService } from '../../services/sala-tipo.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
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

  currentPage: number = 1;
  totalItems: number = 0;

  constructor(
    private salaService: SalaService,
    private predioService: PredioService,
    private andarService: AndarService,
    private salaTipoService: SalaTipoService
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
      this.salaService.subscribe((res) => {
      this.salas = res;
      this.totalItems = res.length;
      this.salasFiltro = [...res];
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

  changePage(page: number): void {
    this.currentPage = page;
  }

  addRoom(): void {
    // lógica para criar nova sala
  }

  editRoom(salaId: number): void {
    // lógica para editar sala
  }

  getRoomDetail(salaId: number): void {
    // lógica para abrir detalhes da sala
  }
}