import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalaService } from '../../services/room.servise';
import { Sala } from '../../Models/sala.dto';

@Component({
  selector: 'app-cadastro-sala',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class CadastroSalaComponent implements OnInit {
  form: FormGroup;
  editingId?: number;
  constructor(
    private fb: FormBuilder,
    private service: SalaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      capacidade: [1, [Validators.required, Validators.min(1)]],
      disponivel: [true]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.editingId = id;
      this.service.getById(id).subscribe(s => this.form.patchValue(s));
    }
  }

  save() {
    if (this.form.invalid) return;
    const payload: Sala = this.form.value;
    if (this.editingId) {
      payload.id = this.editingId;
      this.service.update(payload).subscribe(() => this.router.navigate(['/salas']));
    } else {
      this.service.create(payload).subscribe(() => this.router.navigate(['/salas']));
    }
  }
}