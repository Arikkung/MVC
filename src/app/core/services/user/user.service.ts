import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../models/user.model';
import { CreateUserCommand } from 'src/app/data/commands/create-user.command';
import { GetUserQuery } from 'src/app/data/queries/get-user.query';
import { DeleteUserCommand } from 'src/app/data/commands/delete-user.command';
import { UpdateUserCommand } from 'src/app/data/commands/update-user.command';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  public usersSubject$ = this.usersSubject.asObservable();

  constructor(
    private CreateuserCmd: CreateUserCommand,
    private GetuserQry: GetUserQuery,
    private DeleteuserCmd: DeleteUserCommand,
    private UpdateUserCmd: UpdateUserCommand,  // Agregar el comando de actualización de tarea
  ) {}

  async loadTasks() {
    const users = await this.GetuserQry.execute();
    this.usersSubject.next(users);
  }

  async addUser(newUser: IUser) {
    await this.CreateuserCmd.execute(newUser);
    const updatedUsers = [...this.usersSubject.value, newUser];
    this.usersSubject.next(updatedUsers);
  }

  async deleteUser(userId: string) {
    await this.DeleteuserCmd.execute(userId);
    const updatedUsers = this.usersSubject.value.filter((user) => user.id !== userId);
    this.usersSubject.next(updatedUsers);
  }

  async updateUser(user: IUser) {
    try {
      await this.UpdateUserCmd.execute(user);
      const updatedTasks = this.usersSubject.value.map((t) =>
        t.id === user.id ? { ...t, ...user } : t
      );
      this.usersSubject.next(updatedTasks);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw error; // O maneja el error según sea necesario
    }
  }
  
  getUserById(userId: string): IUser | undefined {
    return this.usersSubject.value.find((user) => user.id === userId);
  }
}
