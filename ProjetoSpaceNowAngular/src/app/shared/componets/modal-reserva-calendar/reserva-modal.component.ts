import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalaModel } from "../../models/sala.model";
import { SalaService } from "../../services/sala.service";

@Component({
  selector: "app-reserva-modal",
  templateUrl: "./reserva-modal.component.html",
  styleUrls: ["./reserva-modal.component.css"],
})
export class ReservaModalComponent implements OnChanges, OnInit {
  @Input() visible: boolean = false;
  @Input() modalData: any = {};
  @Input() rooms: SalaModel[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private salaService: SalaService) {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(120)]],
      roomId: [null, Validators.required],
      start: ["", Validators.required],
      end: ["", Validators.required],
      notes: [""],
    });
  }

  ngOnInit() {
    this.loadRooms();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["modalData"] && this.modalData) {
      this.patchForm(this.modalData);
    }

    if (changes["visible"] && this.visible && this.modalData) {
      this.patchForm(this.modalData);
    }
  }

  private loadRooms() {
    this.salaService.getSelectList().subscribe({
      next: (res) => {
        this.rooms = res;
      },
      error: (err) => {
        console.error("Erro ao carregar salas:", err);
      },
    });
  }

  private patchForm(data: any) {
    const startLocal = data?.start ? this.toInputDatetimeLocal(data.start) : "";
    const endLocal = data?.end ? this.toInputDatetimeLocal(data.end) : "";

    this.form.patchValue({
      title: data?.title ?? "",
      roomId: data?.roomId ?? null,
      start: startLocal,
      end: endLocal,
      notes: data?.notes ?? "",
    });
  }

  private toInputDatetimeLocal(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  private fromInputDatetimeLocal(value: string): string {
    if (!value) return "";
    return new Date(value).toISOString();
  }

  onSave() {
    // Valida o formulário
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Monta o payload com os dados do formulário
    const payload = {
      ...this.modalData, // mantém ID e outros campos existentes
      title: this.form.value.title,
      roomId: this.form.value.roomId, // id da sala selecionada
      start: this.fromInputDatetimeLocal(this.form.value.start),
      end: this.fromInputDatetimeLocal(this.form.value.end),
      notes: this.form.value.notes,
    };

    // Emite para o componente pai tratar a persistência
    this.save.emit(payload);
  }

  onClose() {
    this.close.emit();
  }

  onDelete() {
    if (confirm("Deseja realmente excluir esta reserva?")) {
      this.delete.emit(this.modalData);
    }
  }

  get titleCtrl() {
    return this.form.get("title");
  }
  get roomCtrl() {
    return this.form.get("roomId");
  }
  get startCtrl() {
    return this.form.get("start");
  }
  get endCtrl() {
    return this.form.get("end");
  }
}
