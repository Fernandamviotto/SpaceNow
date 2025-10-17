import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { SpanErrorValidationComponent } from "../../components/span-error-validation/span-error-validation.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, SpanErrorValidationComponent],
  templateUrl: './cadastro.component.component.html',
  styleUrls: ['./cadastro.component.component.css']
})
export class CadastroComponent implements OnInit {
  sala: SalaModel = {
    salaId: 0,
    apelido: '',
    capacidade: 1,
    publicoExterno: false,
    bitBloqueiaPublicoExterno: false,
    salaTipoId: 0,
    andar: {
      andarId: 0,
      predioId: 0,
      predio: { predioId: 0 }
    } as AndarModel,
    recursos: [],
    responsaveis: []
  } as unknown as SalaModel;
  predios: PredioModel[] = [];
  andares: AndarModel[] = [];
  tiposDeSala: SalaTipoModel[] = [];
  recursos: { recursoId: number; nomeRecurso: string }[] = [];
  tipoDeSalaSelecionada?: SalaTipoModel;

  isHabilitado: boolean = true;
  isValid: boolean = true;
  titulo: string = 'Cadastro de Sala';
  edicao: boolean = false;

  constructor(
    private salaService: SalaService,
    private predioService: PredioService,
    private andarService: AndarService,
    private salaTipoService: SalaTipoService,
    private recursoService: RecursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPredios();
    this.loadTiposDeSala();
    this.loadRecursos();
  }
  loadPredios(): void {
    this.predioService.getAll().subscribe(res => {
      this.predios = res;
    });
  }
  loadAndares(): void {
    if (this.sala.andar.predioId) {
      this.andarService.getByPredio(this.sala.andar.predioId).subscribe((res) => {
        this.andares = res;
      });
    }
  }

  loadTiposDeSala(): void {
    this.salaTipoService.getAll().subscribe((res) => {
      this.tiposDeSala = res;
    });
  }

  loadRecursos(): void {
    this.recursoService.getAll().subscribe(res => {
      this.recursos = res;
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
    this.router.navigate(['/salas/consulta']);
  }

  // Métodos de validação do formulário
  applyCssErrorValidation(field: any, form: NgForm): any {
    return field.invalid && (field.dirty || field.touched) ? 'is-invalid' : '';
  }

  fieldValidTouched(field: any, form: NgForm): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  // Substitui util.maxLength do template
  onKeyMaxLength(event: any, max: number): void {
    const input = event?.target as HTMLInputElement;
    if (!input) return;
    if (input.value && input.value.length > max) {
      input.value = input.value.substring(0, max);
    }
  }

  // Chamado ao alterar o prédio no select
  loadFloor(): void {
    this.loadAndares();
  }

  // Atualiza tipo de sala selecionado
  changeTypeOfRoom(): void {
    this.tipoDeSalaSelecionada = this.tiposDeSala.find(t => t.salaTipoId === this.sala.salaTipoId);
  }

  // Handler para mudança de recurso (mantido por compatibilidade com template)
  changeResource(_event: any, _index: number): void {
    // Sem lógica adicional no momento; ngModel já atualiza o recursoId
  }

  // Validação simples dos responsáveis (e-mail básico)
  isValidResponsibles(blur: boolean = true): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasInvalidEmail = this.sala.responsaveis.some(r => !!r.responsavelEmail && !emailRegex.test(r.responsavelEmail));
    // Caso blur=false, apenas não marque como inválido enquanto digitando se o campo estiver vazio
    this.isValid = !hasInvalidEmail;
  }
}