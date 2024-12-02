import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public cedula!: FormControl;
  public email!: FormControl;
  public nombre!: FormControl;
  public password!: FormControl;

  public userForm!: FormGroup;

  users: IUser[] = [];

  constructor(private UserSrv: UserService) {
    this.initForm();
  }

  async addUser() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const newUser: IUser = {
        id: '', // Este valor será generado en el backend.
        cedula: formData.cedula,
        email: formData.email,
        nombre: formData.nombre,
        password: formData.password,
      };
      await this.UserSrv.addUser(newUser);
      this.resetForm();
    } else {
      console.error('El formulario no es válido.');
    }
  }

  resetForm() {
    this.userForm.reset();
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