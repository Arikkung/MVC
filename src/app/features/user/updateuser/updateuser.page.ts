import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.page.html',
  styleUrls: ['./updateuser.page.scss'],
})
export class UpdateuserPage implements OnInit {
  user: IUser | undefined;

  public cedula!: FormControl;
  public email!: FormControl;
  public nombre!: FormControl;
  public password!: FormControl;

  public userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSrv: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {
    const userID = this.route.snapshot.paramMap.get('userId'); // Cambiar 'id' por 'userId'
    if (userID) {
      this.loadUser(userID);
    }
  }

  async loadUser(userID: string) {
    try {
      this.user = this.userSrv.getUserById(userID);
      if (this.user) {
        this.userForm.patchValue({
          cedula: this.user.cedula,
          email: this.user.email,
          nombre: this.user.nombre,
          password: this.user.password,
        });
      } else {
        console.error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  }

  async saveUser() {
    if (this.userForm.invalid) {
      console.error('Formulario inválido');
      return;
    }
    try {
      if (this.user) {
        // Crear un objeto actualizado de la tarea
        const updatedTask: IUser = {
          ...this.user,
          cedula: this.userForm.value.cedula,
          email: this.userForm.value.email,
          nombre: this.userForm.value.nombre,
          password: this.userForm.value.password,
        };

        // Llamar al servicio para actualizar la tarea
        await this.userSrv.updateUser(updatedTask);

        console.log('Tarea actualizada exitosamente');
        // Redirigir al usuario (por ejemplo, a la lista de tareas)
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  }

  private initForm() {
    this.cedula = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.nombre = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.userForm = new FormGroup({
      cedula: this.cedula,
      email: this.email,
      nombre: this.nombre,
      password: this.password,
    });
  }
}
