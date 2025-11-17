import { Component, OnInit, OnDestroy } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DashboardSalasService } from "../../shared/services/dashboard-salas.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // ======= CONTROLES DE EXIBIÇÃO =======
  showModal: boolean = false; // Modal de criação/edição de reserva
  showSalaModal: boolean = false; // Modal de detalhes da sala
  showDatePicker: boolean = false; // Modal do datepicker

  // ======= DADOS DO CALENDÁRIO =======
  salas: any[] = [];
  reservas: any[] = [];
  salaSelecionada: any = null;

  // Dados usados pela modal de criação/edição
  modalData: any = {
    id: null,
    title: "",
    roomId: null,
    start: "",
    end: "",
  };
  rooms: any[] = []; // Salas disponíveis para seleção

  // ======= DADOS DE INTERFACE =======
  selectedDate: Date = new Date();
  selectedPeriod: string = "todos";
  showReserveButton: boolean = true;

  // DatePicker properties
  calendarDays: any[] = [];
  currentMonthYear: Date = new Date();
  weekdays: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  predios: any[] = [];
  pageNumber: number = 1;
  resources: any[] = [];
  horarios: any[] = [];
  timeSlots: string[] = [];
  intervalMinutes: number = 30; // duração de cada linha (em minutos)
  // seleção por arrastar
  isDragging: boolean = false;
  dragStartSlot: string | null = null;
  dragEndSlot: string | null = null;
  dragRoomId: any = null;
  private onWindowMouseUpBound: any;
  dragJustFinished: boolean = false;
  // popover / ações
  activePopoverReservaId: number | null = null;

  // ======= CONFIGURAÇÃO DO FULLCALENDAR =======
  calendarOptions: CalendarOptions = {
    plugins: [resourceTimeGridPlugin, interactionPlugin],
    initialView: "resourceTimeGridDay",
    selectable: true,
    editable: false,
    resources: [],
    events: [],
    headerToolbar: false,
    resourceAreaHeaderContent: "Salas",
    slotMinTime: "07:00",
    slotMaxTime: "22:00",
    dateClick: (info) => this.onCalendarDateClick(info),
    eventClick: (info) => this.onCalendarEventClick(info),
  };
  mock: any;

  constructor(private dashboardSalasService: DashboardSalasService) {}

  ngOnInit(): void {
    this.loadData();
    // gera os horários iniciais (por padrão 07:00-22:00)
    this.generateTimeSlots(7, 22, this.intervalMinutes);
    // listener global para finalizar seleção ao soltar o mouse
    this.onWindowMouseUpBound = this.onWindowMouseUp.bind(this);
    window.addEventListener("mouseup", this.onWindowMouseUpBound);
  }

  ngOnDestroy(): void {
    if (this.onWindowMouseUpBound) {
      window.removeEventListener("mouseup", this.onWindowMouseUpBound);
    }
  }

  // =====================================================
  // 🔹 Carregar dados iniciais (salas, reservas, prédios)
  // =====================================================
  loadData() {
    // Salas
    this.dashboardSalasService.getSalas().subscribe((data) => {
      this.salas = data;
      this.rooms = data.map((sala: any) => ({
        id: sala.id,
        title: sala.nome,
      }));

      // atualiza os recursos do calendário (cada recurso = uma sala -> uma linha)
      this.calendarOptions = {
        ...this.calendarOptions,
        resources: this.rooms,
      };
    });

    // Reservas (filtradas pela data selecionada)
    this.dashboardSalasService
      .getReservas(this.selectedDate)
      .subscribe((data) => {
        this.reservas = data;

        // Converte as reservas em eventos do FullCalendar
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.reservas.map((r) => ({
            id: r.id,
            resourceId: r.salaId, // vincula evento à sala (recurso)
            title: r.salaNome,
            start: r.inicio,
            end: r.fim,
            color: r.corPredio,
          })),
        };
      });

    // Prédios mockados (ou obtidos do backend)
    // getPrediosMock retorna um array direto (não observable)
    this.predios = this.dashboardSalasService.getPrediosMock();
  }

  // =====================================================
  // 🔹 Carrega horários de acordo com a data selecionada
  // =====================================================
  loadHorarios() {
    this.dashboardSalasService
      .getHorariosPorSala(this.selectedDate)
      .subscribe((h) => {
        this.horarios = h;
      });
  }

  // Gera os intervalos de horário (linhas) em formato HH:mm
  generateTimeSlots(startHour: number, endHour: number, interval = 60) {
    const slots: string[] = [];
    const totalMinutes = (endHour - startHour) * 60;
    const steps = Math.ceil(totalMinutes / interval);
    for (let i = 0; i < steps; i++) {
      const minutes = startHour * 60 + i * interval;
      const hh = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
      const mm = (minutes % 60).toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
    this.timeSlots = slots;
  }

  // =====================================================
  // 🔹 DatePicker Methods
  // =====================================================
  openDatePicker() {
    this.currentMonthYear = new Date(this.selectedDate);
    this.generateCalendarDays();
    this.showDatePicker = true;
  }

  closeDatePicker() {
    this.showDatePicker = false;
  }

  generateCalendarDays() {
    const year = this.currentMonthYear.getFullYear();
    const month = this.currentMonthYear.getMonth();

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    // Dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
    const firstDayWeekday = firstDay.getDay();

    this.calendarDays = [];

    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      this.calendarDays.push({
        day: day,
        date: date,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.isSelectedDate(date),
      });
    }

    // Dias do mês atual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      this.calendarDays.push({
        day: day,
        date: date,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        isSelected: this.isSelectedDate(date),
      });
    }

    // Dias do próximo mês
    const totalCells = 42; // 6 semanas * 7 dias
    const remainingCells = totalCells - this.calendarDays.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      this.calendarDays.push({
        day: day,
        date: date,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.isSelectedDate(date),
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSelectedDate(date: Date): boolean {
    return date.toDateString() === this.selectedDate.toDateString();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.closeDatePicker();

    // Recarrega os dados para a nova data selecionada
    this.loadData();
    this.loadHorarios();
  }

  selectToday() {
    this.selectDate(new Date());
  }

  previousMonth() {
    this.currentMonthYear = new Date(
      this.currentMonthYear.getFullYear(),
      this.currentMonthYear.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentMonthYear = new Date(
      this.currentMonthYear.getFullYear(),
      this.currentMonthYear.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
  }

  closePopover() {
    this.activePopoverReservaId = null;
  }

  // Editar reserva a partir do popover
  editReservaFromPopover(reserva: any, event?: MouseEvent) {
    event?.stopPropagation();
    this.modalData = {
      id: reserva.id,
      title: reserva.salaNome,
      roomId: reserva.salaId,
      start: reserva.inicio,
      end: reserva.fim,
    };
    this.showModal = true;
    this.closePopover();
  }

  // Deletar reserva a partir do popover
  deleteReservaFromPopover(reserva: any, event?: MouseEvent) {
    event?.stopPropagation();
    if (!confirm("Deseja realmente excluir esta reserva?")) return;
    this.dashboardSalasService.deleteReserva(reserva.id);
    this.closePopover();
    this.loadData();
  }

  // Drag selection handlers
  onCellMouseDown(roomId: any, slotTime: string, event?: MouseEvent) {
    event?.preventDefault();
    this.isDragging = true;
    this.dragRoomId = roomId;
    this.dragStartSlot = slotTime;
    this.dragEndSlot = slotTime;
  }

  onCellMouseEnter(roomId: any, slotTime: string) {
    if (!this.isDragging) return;
    if (this.dragRoomId !== roomId) return; // só permite seleção na mesma sala
    this.dragEndSlot = slotTime;
  }

  onWindowMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (!this.dragStartSlot || !this.dragEndSlot || !this.dragRoomId) {
      this.clearDragState();
      return;
    }

    // calcula início e fim baseado nos índices dos slots
    const startIndex = this.timeSlots.indexOf(this.dragStartSlot);
    const endIndex = this.timeSlots.indexOf(this.dragEndSlot);
    if (startIndex === -1 || endIndex === -1) {
      this.clearDragState();
      return;
    }
    const s = Math.min(startIndex, endIndex);
    const e = Math.max(startIndex, endIndex);

    const startSlot = this.timeSlots[s];
    const endSlot = this.timeSlots[e];

    const startISO = `${
      this.selectedDate.toISOString().split("T")[0]
    }T${startSlot}:00`;
    const endDate = new Date(
      `${this.selectedDate.toISOString().split("T")[0]}T${endSlot}:00`
    );
    // adiciona um intervalo de duração para o final (intervalMinutes)
    const endISO = new Date(
      endDate.getTime() + this.intervalMinutes * 60000
    ).toISOString();

    // abre modal com intervalo selecionado
    this.modalData = {
      id: null,
      title: "",
      roomId: this.dragRoomId,
      start: startISO,
      end: endISO,
    };
    this.showModal = true;
    this.dragJustFinished = true;
    this.clearDragState();
  }

  clearDragState() {
    this.isDragging = false;
    this.dragStartSlot = null;
    this.dragEndSlot = null;
    this.dragRoomId = null;
  }

  isSlotInSelection(roomId: any, slotTime: string): boolean {
    if (!this.dragStartSlot || !this.dragEndSlot) return false;
    if (this.dragRoomId !== roomId) return false;
    const s = this.timeSlots.indexOf(this.dragStartSlot);
    const e = this.timeSlots.indexOf(this.dragEndSlot);
    if (s === -1 || e === -1) return false;
    const start = Math.min(s, e);
    const end = Math.max(s, e);
    const idx = this.timeSlots.indexOf(slotTime);
    return idx >= start && idx <= end;
  }

  // =====================================================
  // 🔹 Clique em uma data do calendário (criação)
  // =====================================================
  onCalendarDateClick(info: any) {
    this.selectedDate = new Date(info.dateStr);

    // Preenche dados padrão para nova reserva
    this.modalData = {
      id: null,
      title: "",
      roomId: null,
      start: info.dateStr,
      end: info.dateStr,
    };

    this.showModal = true;
  }

  // =====================================================
  // 🔹 Clique em um evento do calendário (edição)
  // =====================================================
  onCalendarEventClick(info: any) {
    const reserva = this.reservas.find((r) => r.id == info.event.id);
    if (!reserva) return;

    // Abre a modal de edição de reserva
    this.modalData = {
      id: reserva.id,
      title: reserva.salaNome,
      roomId: reserva.salaId,
      start: reserva.inicio,
      end: reserva.fim,
    };

    this.showModal = true;
  }

  // =====================================================
  // 🔹 Seleção de períodos (manhã, tarde, noite, todos)
  // =====================================================
  // Aceita tanto string ('manha'|'tarde'|'noite'|'todos') quanto um evento DOM antigo
  onChangePeriod(valueOrEvent: any) {
    let value: string = "todos";
    // Se passou uma string diretamente
    if (typeof valueOrEvent === "string") {
      value = valueOrEvent;
    } else if (valueOrEvent && valueOrEvent.target) {
      // compatibilidade com uso antigo: <span value="noite" (click)="onChangePeriod($event)">
      value =
        valueOrEvent.target.getAttribute("value") ||
        valueOrEvent.target.value ||
        "todos";
    }

    this.selectedPeriod = value;
    // Ajusta horários visíveis para a grade conforme o período
    switch (value) {
      case "manha":
        this.generateTimeSlots(7, 12, this.intervalMinutes);
        break;
      case "tarde":
        this.generateTimeSlots(12, 18, this.intervalMinutes);
        break;
      case "noite":
        this.generateTimeSlots(18, 23, this.intervalMinutes);
        break;
      case "todos":
      default:
        this.generateTimeSlots(7, 22, this.intervalMinutes);
    }
    // limpa qualquer seleção em andamento
    this.clearDragState();
    this.dragJustFinished = false;
  }

  // =====================================================
  // 🔹 Solicitar reserva de uma sala (via modal detalhes)
  // =====================================================
  createReserve() {
    alert(
      `Reserva solicitada para: ${
        this.salaSelecionada?.nome || "Selecione uma sala"
      }`
    );
    this.showSalaModal = false;
  }

  // =====================================================
  // 🔹 Fechar modal de detalhes da sala
  // =====================================================
  closeSalaModal() {
    this.showSalaModal = false;
    this.salaSelecionada = null;
  }

  // =====================================================
  // 🔹 Funções da modal de criação/edição (FullCalendar)
  // =====================================================

  saveModal() {
    if (!this.modalData.title || !this.modalData.roomId) {
      alert("Preencha o título e selecione uma sala!");
      return;
    }

    if (this.modalData.id) {
      // Edição de reserva existente
      const index = this.reservas.findIndex((r) => r.id === this.modalData.id);
      if (index >= 0) {
        this.reservas[index] = {
          ...this.reservas[index],
          salaNome: this.modalData.title,
          salaId: this.modalData.roomId,
          inicio: this.modalData.start,
          fim: this.modalData.end,
        };
      }
    } else {
      // Criação de nova reserva
      const novaReserva = {
        id: this.reservas.length + 1,
        salaNome: this.modalData.title,
        salaId: this.modalData.roomId,
        inicio: this.modalData.start,
        fim: this.modalData.end,
        corPredio: "#48C774",
      };
      this.reservas.push(novaReserva);
    }

    // Atualiza os eventos do calendário
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.reservas.map((r) => ({
        id: r.id,
        resourceId: r.salaId,
        title: r.salaNome,
        start: r.inicio,
        end: r.fim,
        color: r.corPredio,
      })),
    };

    // persistir no mock-service e recarregar dados
    if (this.modalData.id) {
      // atualização
      this.dashboardSalasService.updateReserva({
        id: this.modalData.id,
        salaNome: this.modalData.title,
        salaId: this.modalData.roomId,
        inicio: this.modalData.start,
        fim: this.modalData.end,
        corPredio: this.modalData.corPredio || "#48C774",
      });
    } else {
      // criação
      const novaReserva = {
        id: this.reservas.length + 1,
        salaNome: this.modalData.title,
        salaId: this.modalData.roomId,
        inicio: this.modalData.start,
        fim: this.modalData.end,
        corPredio: this.modalData.corPredio || "#48C774",
      };
      this.dashboardSalasService.addReserva(novaReserva);
    }

    // recarrega reservas para refletir a mudança
    this.loadData();

    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

  onModalSave(event: any) {
    console.log("Salvou reserva:", event);
    this.showModal = false;
    this.loadData(); // ou o método que atualiza o calendário
  }

  onModalDelete(event: any) {
    console.log("Deletou reserva:", event);
    this.showModal = false;
    this.loadData();
  }

  // =====================================================
  // 🔹 Navegação de datas
  // =====================================================
  previousDay() {
    this.selectedDate = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    );
    // recarrega reservas/horários para a nova data
    this.loadData();
    this.loadHorarios();
  }

  nextDay() {
    this.selectedDate = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() + 1)
    );
    // recarrega reservas/horários para a nova data
    this.loadData();
    this.loadHorarios();
  }
  openRoomDetails(room: any) {
    this.salaSelecionada = room;
    this.showSalaModal = true;
  }

  // Método para abrir reserva a partir de uma célula
  openCellReserve(roomId: any, slotTime: string) {
    if (this.dragJustFinished) {
      this.dragJustFinished = false;
      return;
    }

    const slotDate = new Date(
      `${this.selectedDate.toISOString().split("T")[0]}T${slotTime}:00`
    );
    const endDate = new Date(slotDate.getTime() + this.intervalMinutes * 60000);

    this.modalData = {
      id: null,
      title: "",
      roomId: roomId,
      start: slotDate.toISOString(),
      end: endDate.toISOString(),
    };

    this.showModal = true;
  }

  // Método para verificar se um slot está reservado
  isSlotReserved(roomId: any, slotTime: string): any {
    const slotStart = new Date(
      `${this.selectedDate.toISOString().split("T")[0]}T${slotTime}:00`
    );
    const slotEnd = new Date(
      slotStart.getTime() + this.intervalMinutes * 60000
    );

    return this.reservas.find((reserva) => {
      const reservaStart = new Date(reserva.inicio);
      const reservaEnd = new Date(reserva.fim);
      return (
        reserva.salaId === roomId &&
        reservaStart < slotEnd &&
        reservaEnd > slotStart
      );
    });
  }
}
