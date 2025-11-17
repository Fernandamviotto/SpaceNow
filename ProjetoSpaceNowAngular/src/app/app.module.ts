import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Angular Material
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { NgxPaginationModule } from "ngx-pagination";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SalasListComponent } from "./salas/salas-list/salas-list.component";
import { SalasFormComponent } from "./salas/salas-form/salas-form.component";
import { PainelReservasComponent } from "./reservas/painel-reservas/painel-reservas.component";
import { MinhasReservasComponent } from "./reservas/minhas-reservas/minhas-reservas.component";
import { ReservaCriacaoComponent } from "./reservas/cadastrar-reservas/reserva-criacao.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalDetalhesSalaComponent } from "./components/modal-detalhes-sala/modal-detalhes-sala.component";
import { SpanErrorValidationComponent } from "./shared/span-error-validation/span-error-validation.component";

// Services
import { AuthService } from "./core/services/auth.service";
import { MockService } from "./core/mock/mock.service";
import { ToastService } from "./core/services/toast.service";
import { AuthGuard } from "./guards/auth.guard";
import { ReservaService } from "./core/services/reserva.service";
import { MockReservaService } from "./core/services/mock-reserva.service";
import { ReservaModalComponent } from "./components/modal-reserva-calendar/reserva-modal.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SalasListComponent,
    SalasFormComponent,
    PainelReservasComponent,
    MinhasReservasComponent,
    ReservaCriacaoComponent,
    ModalComponent,
    ModalDetalhesSalaComponent,
    SpanErrorValidationComponent,
    ReservaModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    AuthService,
    MockService,
    ToastService,
    AuthGuard,
    { provide: ReservaService, useClass: MockReservaService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
