import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';
import { UserFirebaseRepository } from '../repositories/firebase/user.firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateUserCommand {
  constructor(private UserfirebaseRpt: UserFirebaseRepository) {}

  async execute(task: Omit<IUser, 'id'>): Promise<void> {
    const newTask: IUser = {
      ...task,
      id: '', // Se generará en el repositorio
    };
    await this.UserfirebaseRpt.create(newTask);
  }
}