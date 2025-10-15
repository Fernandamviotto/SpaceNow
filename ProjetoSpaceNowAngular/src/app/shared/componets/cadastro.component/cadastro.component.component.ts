import { Component, OnInit } from "@angular/core";
import { SalaModel } from "../../models/sala.model";
import { NgForm } from "@angular/forms";
import { AndarModel } from "../../models/andar.model";
import { PredioModel } from "../../models/predio.model";
import { SalaTipoModel } from "../../models/sala-tipo.model";
import { AndarService } from "../../services/andar.service";
import { PredioService } from "../../services/predio.service";
import { RecursoService } from "../../services/recurso.service";
import { SalaTipoService } from "../../services/sala-tipo.service";
import { SalaService } from "../../services/sala.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  sala: SalaModel = {
    andar: {} as AndarModel,
    recursos: [],
    responsaveis: []
  } as unknown as SalaModel;
  predios: PredioModel[] = [];
  andares: AndarModel[] = [];
  tiposDeSala: SalaTipoModel[] = [];

  isHabilitado: boolean = true;
  isValid: boolean = true;
  titulo: string = 'Cadastro de Sala';

  constructor(
    private salaService: SalaService,
    private predioService: PredioService,
    private andarService: AndarService,
    private salaTipoService: SalaTipoService,
    private recursoService: RecursoService
  ) {}

  ngOnInit(): void {
    this.loadPredios();
    this.loadTiposDeSala();
  }
  loadPredios(): void {
    const predioId = this.sala.andar?.predio?.predioId;
    if (predioId) {
      this.andarService.getByPredio(predioId).subscribe((res) => {
        this.andares = res;
      });
    }
  }
  loadAndares(): void {
    if (this.sala.andar.predio?.predioId) {
      this.andarService.getByPredio(this.sala.andar.predio.predioId).subscribe((res) => {
        this.andares = res;
      });
    }
  }

  loadTiposDeSala(): void {
    this.salaTipoService.getAll().subscribe((res) => {
      this.tiposDeSala = res;
    });
  }

  addResource(): void {
    this.sala.recursos.push({ recursoId: 0, qtdRecurso: 1 });
  }

  removeResource(index: number): void {
    this.sala.recursos.splice(index, 1);
  }

  addResponsible(): void {
    this.sala.responsaveis.push({ responsavelEmail: '' });
  }

  removeResponsible(index: number): void {
    this.sala.responsaveis.splice(index, 1);
  }

  save(): void {
    if (!this.isValid) return;

    this.salaService.save(this.sala).subscribe(() => {
      alert('Sala salva com sucesso!');
      // Redirecionar ou resetar formulário se necessário
    });
  }

  habilitarDesabilitar(): void {
    this.isHabilitado = !this.isHabilitado;
  }

  back(): void {
    // lógica de voltar para a página anterior
  }

  // Métodos de validação do formulário
  applyCssErrorValidation(field: any, form: NgForm): any {
    return field.invalid && (field.dirty || field.touched) ? 'is-invalid' : '';
  }

  fieldValidTouched(field: any, form: NgForm): boolean {
    return field.invalid && (field.dirty || field.touched);
  }
}