import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SalaModel } from "../../models/sala.model";

@Component({
  selector: 'app-modal-detalhes-sala',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-detalhes-sala.component.component.html',
  styleUrls: ['./modal-detalhes-sala.component.component.css']
})
export class ModalDetalhesSalaComponent {
  @Input() sala?: SalaModel;
}