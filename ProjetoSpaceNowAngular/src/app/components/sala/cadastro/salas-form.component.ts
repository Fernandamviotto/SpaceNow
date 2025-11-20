import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SalaService } from "../../../shared/services/sala.service";
import { MockPredioService } from "../../../shared/mock/mock-predio.service";
import { MockTipoSalaService } from "../../../shared/mock/mock-tipo-sala.service";
import { SalaModel } from "../../../shared/models/sala.model";

@Component({
  selector: "app-salas-form",
  templateUrl: "./salas-form.component.html",
  styleUrls: ["./salas-form.component.css"],
})
export class SalasFormComponent implements OnInit {
  sala: SalaModel = new SalaModel();
  predios: { id: number; nome: string }[] = [];
  tiposSala: { id: number; nomeTipo: string }[] = [];
  saving = false;

  constructor(
    private salaService: SalaService,
    private predioService: MockPredioService,
    private tipoSalaService: MockTipoSalaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSelects();

    const salaId = this.route.snapshot.paramMap.get("id");
    if (salaId) {
      this.carregarSala(parseInt(salaId, 10));
    }
  }

  loadSelects() {
    this.predioService.listar().subscribe({
      next: (res) => {
        this.predios = res.map((p) => ({
          id: p.id,
          nome: p.nome,
        }));
      },
      error: (err) => console.error("Erro ao carregar prédios", err),
    });

    this.tipoSalaService.listar().subscribe({
      next: (res) => {
        this.tiposSala = res.map((t) => ({
          id: t.id,
          nomeTipo: t.nomeTipo,
        }));
      },
      error: (err) => console.error("Erro ao carregar tipos de sala", err),
    });
  }

  carregarSala(id: number) {
    this.salaService.getById(id).subscribe({
      next: (res) => {
        this.sala = {
          ...res,
          predioId: res.predioId,
          tipoDeSalaId: res.tipoDeSalaId,
          predioNome: res.predioNome,
          tipoDeSalaNome: res.tipoDeSalaNome,
        };
      },
      error: (err) => {
        console.error("Erro ao carregar sala:", err);
        alert("Não foi possível carregar a sala para edição.");
      },
    });
  }

  salvar(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving = true;

    // Monta payload compatível com backend
    const payload = {
      id: this.sala.salaId, // backend espera 'id'
      nome: this.sala.nome,
      capacidade: this.sala.capacidade,
      predioNome: this.sala.predioNome,
      tipoDeSalaId: this.sala.tipoDeSalaId,
      status: this.sala.status,
    };

    const request$ = this.sala.salaId
      ? this.salaService.atualizar({
          id: this.sala.salaId,
          nome: this.sala.nome,
          capacidade: this.sala.capacidade,
          predioId: this.sala.predioId!,
          tipoDeSalaId: this.sala.tipoDeSalaId!,
          status: this.sala.status,
        })
      : this.salaService.criar({
          nome: this.sala.nome,
          capacidade: this.sala.capacidade,
          predioId: this.sala.predioId!,
          tipoDeSalaId: this.sala.tipoDeSalaId!,
          status: this.sala.status,
        });

    request$.subscribe({
      next: () => {
        this.saving = false;
        alert("Sala salva com sucesso!");
        this.router.navigate(["/salas"]);
      },
      error: (err) => {
        console.error("Erro ao salvar sala:", err);
        this.saving = false;
        alert("Erro ao salvar sala, veja o console.");
      },
    });
  }
}
