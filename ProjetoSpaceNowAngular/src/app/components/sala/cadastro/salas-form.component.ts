import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MockPredioService } from "../../../shared/mock/mock-predio.service";
import { MockSalaService } from "../../../shared/mock/mock-sala.service";
import { MockTipoSalaService } from "../../../shared/mock/mock-tipo-sala.service";
@Component({
  selector: "app-salas-form",
  templateUrl: "./salas-form.component.html",
  styleUrls: ["./salas-form.component.css"],
})
export class SalasFormComponent implements OnInit {
  addImage() {
    throw new Error("Method not implemented.");
  }
  addResource() {
    throw new Error("Method not implemented.");
  }
  addResponsible() {
    throw new Error("Method not implemented.");
  }
  sala: any = {};
  predios: any[] = [];
  tiposSala: any[] = [];
  responsaveis: any[] = [];
  imagemFile: File | null = null;
  imagemPreview: string | ArrayBuffer | null = null;
  saving = false;

  constructor(
    private salaService: MockSalaService,
    private predioService: MockPredioService,
    private tipoSalaService: MockTipoSalaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSelects();
  }

  loadSelects() {
    this.predioService.listar().subscribe((res) => (this.predios = res));
    this.tipoSalaService.listar().subscribe((res) => (this.tiposSala = res));
  }

  salvar(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving = true;

    this.salaService.criar(this.sala).subscribe({
      next: () => {
        this.saving = false;
        console.log("Sala mock salva:", this.sala);
        alert("Sala salva com sucesso (mock)!");
        this.router.navigate(["/salas"]);
      },
      error: (err) => {
        console.error("Erro mock ao salvar sala:", err);
        this.saving = false;
      },
    });
  }
}
