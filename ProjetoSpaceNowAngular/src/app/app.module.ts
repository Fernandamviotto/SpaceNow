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
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/home/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { ReservaCriacaoComponent } from "./components/reservas/cadastrar-reservas/reserva-criacao.component";
import { MinhasReservasComponent } from "./components/reservas/minhas-reservas/minhas-reservas.component";
import { PainelReservasComponent } from "./components/reservas/painel-reservas/painel-reservas.component";
import { SalasFormComponent } from "./components/sala/cadastro/salas-form.component";
import { SalasListComponent } from "./components/sala/consulta/salas-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { ReservaModalComponent } from "./shared/componets/modal-reserva-calendar/reserva-modal.component";
import { ModalComponent } from "./shared/componets/modal/modal.component";
import { SpanErrorValidationComponent } from "./shared/componets/span-error-validation/span-error-validation.component";
import { MockService } from "./shared/mock/mock.service";
import { AuthService } from "./shared/services/auth.service";
import { MockReservaService } from "./shared/services/mock-reserva.service";
import { ReservaService } from "./shared/services/reserva.service";
import { ToastService } from "./shared/services/toast.service";

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
    SpanErrorValidationComponent,
    ReservaModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule,
    CommonModule,
  ],
  providers: [
    AuthService,
    MockService,
    ToastService,
    AuthGuard,
    // Mantém ReservaService real (não sobrescrevemos com mock por padrão)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
