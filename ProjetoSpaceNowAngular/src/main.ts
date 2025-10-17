import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from './app/app.routes';

import { AndarService } from './app/shared/services/andar.service';
import { PredioService } from './app/shared/services/predio.service';
import { PerfilService } from './app/shared/services/perfil.service';
import { RecursoService } from './app/shared/services/recurso.service';
import { SalaTipoService } from './app/shared/services/sala-tipo.service';
import { SalaService } from './app/shared/services/sala.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(FormsModule),
    AndarService,
    PredioService,
    PerfilService,
    RecursoService,
    SalaTipoService,
    SalaService
  ]
}).catch(err => console.error(err));