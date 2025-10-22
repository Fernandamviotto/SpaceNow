import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelecaoFiltroService {
  private predioFiltro: string[] = [];
  private andarFiltro: string[] = [];
  private salaFiltro: string[] = [];
  private tipoSalaFiltro: string[] = [];

  buscarPredios(): Observable<any> {
    const items = [{ id: 1, nome: 'Prédio A' }];
    return of(items);
  }

  buscarAndares(sala: any): Observable<any> {
    const items = [{ id: 1, text: '1º Andar', groupBy: 'Prédio A' }];
    return of(items);
  }

  buscarSalasPorAbas(filter: any, page: number, pageSize: number, ativas: boolean): Observable<any> {
    const items = [{ id: 1, text: 'Sala 101', groupBy: '1º Andar' }];
    return of(items);
  }

  buscarTipoDeSalas(): Observable<any> {
    const items = [{ id: 1, text: 'Padrão' }];
    return of(items);
  }

  atribuirFiltroPredio(data: any[], sala: any) { this.predioFiltro = data.map((d: any) => d.id); }
  atribuirFiltroAndar(data: any[], sala: any) { this.andarFiltro = data.map((d: any) => d.id); }
  atribuirFiltroSala(data: any[]) { this.salaFiltro = data.map((d: any) => d.id); }
  atribuirFiltroTipoSala(data: any[], sala: any) { this.tipoSalaFiltro = data.map((d: any) => d.id); }

  recuperaPredioIdFiltro() { return this.predioFiltro; }
  recuperaTipoSalaIdFiltro() { return this.tipoSalaFiltro; }
  recuperaSalaIdFiltro() { return this.salaFiltro; }
  recuperaAndarIdFilter() { return this.andarFiltro; }

  adicionaPredioIdFiltro(id: string) { this.predioFiltro = id ? [id] : []; }
  adicionaAndarIdFiltro(id: string) { this.andarFiltro = id ? [id] : []; }
  adicionaSalaIdFiltro(id: string) { this.salaFiltro = id ? [id] : []; }
  adicionaTipoSalaIdFiltro(id: string) { this.tipoSalaFiltro = id ? [id] : []; }

  resetarFiltros() { this.predioFiltro = []; this.andarFiltro = []; this.salaFiltro = []; this.tipoSalaFiltro = []; }

  filtrosSelecionados(): boolean {
    return this.predioFiltro.length > 0 || this.andarFiltro.length > 0 || this.salaFiltro.length > 0 || this.tipoSalaFiltro.length > 0;
  }
}
