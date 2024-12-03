import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Italler } from 'src/app/core/models/taller.model';
import { TallerService } from 'src/app/core/services/user/taller.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public numero_de_taller!: FormControl;
  public calificacion!: FormControl;
  public nombre_estudiante!: FormControl;
  public codigo_estudiante!: FormControl;

  public tallerForm!: FormGroup;

  taller: Italler[] = [];

  constructor(private TallerSrv: TallerService) {
    this.initForm();
  }

  async addTaller() {
    if (this.tallerForm.valid) {
      const formData = this.tallerForm.value;
      const newTaller: Italler = {
        id: '', // Este valor será generado en el backend.
        numero_de_taller: formData.numero_de_taller,
        calificacion: formData.calificacion,
        nombre_estudiante: formData.nombre_estudiante,
        codigo_estudiante: formData.codigo_estudiante,
      };
      await this.TallerSrv.addTaller(newTaller);
      this.resetForm();
    } else {
      console.error('El formulario no es válido.');
    }
  }

  resetForm() {
    this.tallerForm.reset();
  }

  private initForm() {
    this.numero_de_taller = new FormControl('', [Validators.required]);
    this.calificacion = new FormControl('', [Validators.required]);
    this.nombre_estudiante = new FormControl('', [Validators.required]);
    this.codigo_estudiante = new FormControl('', [Validators.required]);

    this.tallerForm = new FormGroup({
      numero_de_taller: this.numero_de_taller,
      calificacion: this.calificacion,
      nombre_estudiante: this.nombre_estudiante,
      codigo_estudiante: this.codigo_estudiante,
    });
  }
}