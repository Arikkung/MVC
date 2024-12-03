import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Italler } from '../../models/taller.model';
import { CreateTallerCommand } from 'src/app/data/commands/create-taller.command';
import { GetTallerQuery } from 'src/app/data/queries/get-taller.query';
import { DeleteTallerCommand } from 'src/app/data/commands/delete-taller.command';
import { UpdateTallerCommand } from 'src/app/data/commands/update-taller.command';


@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private tallerSubject = new BehaviorSubject<Italler[]>([]);
  public tallerSubject$ = this.tallerSubject.asObservable();

  constructor(
    private CreatetallerCmd: CreateTallerCommand,
    private GettallerrQry: GetTallerQuery,
    private DeletetallerCmd: DeleteTallerCommand,
    private UpdateTallerCmd: UpdateTallerCommand,  // Agregar el comando de actualización de tarea
  ) {}

  async loadTaller() {
    const taller = await this.GettallerrQry.execute();
    this.tallerSubject.next(taller);
  }

  async addTaller(newTaller: Italler) {
    await this.CreatetallerCmd.execute(newTaller);
    const updatedUsers = [...this.tallerSubject.value, newTaller];
    this.tallerSubject.next(updatedUsers);
  }

  async deleteTaller(tallerId: string) {
    await this.DeletetallerCmd.execute(tallerId);
    const updatedUsers = this.tallerSubject.value.filter((taller) => taller.id !== tallerId);
    this.tallerSubject.next(updatedUsers);
  }

  async updateTaller(taller: Italler) {
    try {
      await this.UpdateTallerCmd.execute(taller);
      const updatedTasks = this.tallerSubject.value.map((t) =>
        t.id === taller.id ? { ...t, ...taller } : t
      );
      this.tallerSubject.next(updatedTasks);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw error; // O maneja el error según sea necesario
    }
  }
  
  getTallerById(tallerId: string): Italler | undefined {
    return this.tallerSubject.value.find((taller) => taller.id === tallerId);
  }
}