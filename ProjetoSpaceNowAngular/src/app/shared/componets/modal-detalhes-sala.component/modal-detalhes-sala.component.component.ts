import { Component, Input } from "@angular/core";
import { Sala } from "../../services/home.service";

@Component({
  selector: 'app-modal-detalhes-sala',
  templateUrl: './modal-detalhes-sala.component.component.html',
  styleUrls: ['./modal-detalhes-sala.component.component.css']
})
export class ModalDetalhesSalaComponent {
  @Input() sala?: Sala;
}