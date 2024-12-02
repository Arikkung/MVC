import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';
import { UserFirebaseRepository } from '../repositories/firebase/user.firebase.repository';

@Injectable({
  providedIn: 'root'
})

export class UpdateUserCommand {
    constructor(private UserfirebaseRpt: UserFirebaseRepository) {}

  async execute(task: IUser): Promise<void> {
    try {
      await this.UserfirebaseRpt.update(task); // Llamamos al repositorio para actualizar el evento en la base de datos
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw new Error('No se pudo actualizar el evento');
    }
  }
}