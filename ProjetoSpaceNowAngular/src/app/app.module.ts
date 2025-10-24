import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxPaginationModule } from "ngx-pagination";

import { AndarService } from "./shared/services/andar.service";
import { PredioService } from "./shared/services/predio.service";
import { PerfilService } from "./shared/services/perfil.service";
import { RecursoService } from "./shared/services/recurso.service";
import { SalaTipoService } from "./shared/services/sala-tipo.service";
import { SalaService } from "./shared/services/sala.service";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgxPaginationModule,
  ],
  providers: [
    AndarService,
    PredioService,
    PerfilService,
    RecursoService,
    SalaTipoService,
    SalaService,
  ],
})
export class AppModule {}
