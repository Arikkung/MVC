import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Italler } from 'src/app/core/models/taller.model';
import { TallerService } from 'src/app/core/services/user/taller.service';

@Component({
  selector: 'app-updatetaller',
  templateUrl: './updatetaller.page.html',
  styleUrls: ['./updatetaller.page.scss'],
})
export class UpdatetallerPage implements OnInit {
  taller: Italler | undefined;

  public numero_de_taller!: FormControl;
  public calificacion!: FormControl;
  public nombre_estudiante!: FormControl;
  public codigo_estudiante!: FormControl;

  public tallerForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TallerSrv: TallerService
  ) {
    this.initForm();
  }

  ngOnInit() {
    const tallerID = this.route.snapshot.paramMap.get('tallerId'); // Cambiar 'id' por 'userId'
    if (tallerID) {
      this.loadTaller(tallerID);
    }
  }

  async loadTaller(tallerID: string) {
    try {
      this.taller = this.TallerSrv.getTallerById(tallerID);
      if (this.taller) {
        this.tallerForm.patchValue({
          numero_de_taller: this.taller.numero_de_taller,
          calificacion: this.taller.calificacion,
          nombre_estudiante: this.taller.nombre_estudiante,
          codigo_estudiante: this.taller.codigo_estudiante,
        });
      } else {
        console.error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  }

  async saveTaller() {
    if (this.tallerForm.invalid) {
      console.error('Formulario inválido');
      return;
    }
    try {
      if (this.taller) {
        // Crear un objeto actualizado de la tarea
        const updatedTaller: Italler = {
          ...this.taller,
          numero_de_taller: this.tallerForm.value.numero_de_taller,
          calificacion: this.tallerForm.value.calificacion,
          nombre_estudiante: this.tallerForm.value.nombre_estudiante,
          codigo_estudiante: this.tallerForm.value.codigo_estudiante,
        };

        // Llamar al servicio para actualizar la tarea
        await this.TallerSrv.updateTaller(updatedTaller);

        console.log('Tarea actualizada exitosamente');
        // Redirigir al usuario (por ejemplo, a la lista de tareas)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
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