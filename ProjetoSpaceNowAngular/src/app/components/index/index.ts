import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  username: string = 'Fernanda Silva';
  dataAtual: Date = new Date();
  periodo: string = 'manha';
  alertasPendentes: number = 5;

  horarios = ['07:00', '08:00', '09:00', '10:00', '11:00'];
  salas = [
    { nome: 'Amador Aguiar' },
    { nome: 'José Ermírio de Moraes Filho' },
    { nome: 'Olavo Setubal' },
    { nome: 'Sebastião Camargo' },
  ];

  reservas = [
    { sala: 'Olavo Setubal', hora: '08:00', nome: 'Comportamento Organizacional', tipo: 'academico' },
    { sala: 'Sebastião Camargo', hora: '09:00', nome: 'Microeconomia I', tipo: 'academico' },
  ];

  ngOnInit(): void {}

  prevDay() {
    this.dataAtual = new Date(this.dataAtual.setDate(this.dataAtual.getDate() - 1));
  }

  nextDay() {
    this.dataAtual = new Date(this.dataAtual.setDate(this.dataAtual.getDate() + 1));
  }

  setPeriodo(periodo: string) {
    this.periodo = periodo;
  }

  temReserva(sala: any, hora: string) {
    return this.reservas.some(r => r.sala === sala.nome && r.hora === hora);
  }

  getTipoReserva(sala: any, hora: string) {
    const reserva = this.reservas.find(r => r.sala === sala.nome && r.hora === hora);
    return reserva ? reserva.tipo : '';
  }

  getNomeReserva(sala: any, hora: string) {
    const reserva = this.reservas.find(r => r.sala === sala.nome && r.hora === hora);
    return reserva ? reserva.nome : '';
  }
}
