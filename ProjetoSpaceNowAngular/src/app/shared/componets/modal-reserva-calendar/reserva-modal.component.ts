import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-reserva-modal",
  templateUrl: "./reserva-modal.component.html",
  styleUrls: ["./reserva-modal.component.css"],
})
export class ReservaModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() modalData: any = {}; // { id, title, roomId, start, end, ... }
  @Input() rooms: any[] = []; // [{ id, title }, ...]

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(120)]],
      roomId: [null, Validators.required],
      start: ["", Validators.required], // ISO / datetime-local
      end: ["", Validators.required], // ISO / datetime-local
      notes: [""],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["modalData"] && this.modalData) {
      this.patchForm(this.modalData);
    }

    // quando abrir, garantir que o form esteja consistente
    if (changes["visible"] && this.visible && this.modalData) {
      this.patchForm(this.modalData);
    }
  }

  private patchForm(data: any) {
    // Conversões simples para inputs type=datetime-local (yyyy-MM-ddTHH:mm)
    const startLocal = data?.start ? this.toInputDatetimeLocal(data.start) : "";
    const endLocal = data?.end ? this.toInputDatetimeLocal(data.end) : "";

    this.form.patchValue({
      title: data?.title ?? "",
      roomId: data?.roomId ?? data?.roomId ?? null,
      start: startLocal,
      end: endLocal,
      notes: data?.notes ?? "",
    });
  }

  private toInputDatetimeLocal(iso: string): string {
    // Se já estiver em formato 'YYYY-MM-DDTHH:mm' retorna como está; caso contrário tenta converter
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  private fromInputDatetimeLocal(value: string): string {
    // retorna ISO (com timezone local)
    if (!value) return "";
    const d = new Date(value);
    return d.toISOString();
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.modalData,
      title: this.form.value.title,
      roomId: this.form.value.roomId,
      start: this.fromInputDatetimeLocal(this.form.value.start),
      end: this.fromInputDatetimeLocal(this.form.value.end),
      notes: this.form.value.notes,
    };

    this.save.emit(payload);
  }

  onClose() {
    this.close.emit();
  }

  onDelete() {
    // confirmação mínima
    if (confirm("Deseja realmente excluir esta reserva?")) {
      this.delete.emit(this.modalData);
    }
  }

  // Helpers p/ template
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
