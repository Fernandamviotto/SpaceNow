import { Component, OnInit, Inject } from "@angular/core";
import { SalaModel } from "../../models/sala.model";
import { SalaService } from "../../services/sala.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-modal-detalhes-sala",
  templateUrl: "./modal-detalhes-sala.component.html",
  styleUrls: ["./modal-detalhes-sala.component.css"],
})
export class ModalDetalhesSalaComponent implements OnInit {
  sala: SalaModel = new SalaModel();
  loading = true;
  error = "";

  constructor(
    private dialogRef: MatDialogRef<ModalDetalhesSalaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { salaId: number },
    private salaService: SalaService
  ) {}

  ngOnInit(): void {
    this.carregarSala();
  }

  carregarSala(): void {
    this.salaService.getById(this.data.salaId).subscribe({
      next: (res) => {
        this.sala = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erro ao carregar detalhes da sala.";
        this.loading = false;
      },
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
