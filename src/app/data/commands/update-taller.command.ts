import { Injectable } from '@angular/core';
import { Italler } from 'src/app/core/models/taller.model';
import { TallerFirebaseRepository } from '../repositories/firebase/taller.firebase.repository';

@Injectable({
  providedIn: 'root'
})

export class UpdateTallerCommand {
    constructor(private TallerfirebaseRpt: TallerFirebaseRepository) {}

  async execute(taller: Italler): Promise<void> {
    try {
      await this.TallerfirebaseRpt.update(taller); // Llamamos al repositorio para actualizar el evento en la base de datos
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw new Error('No se pudo actualizar el evento');
    }
  }
}