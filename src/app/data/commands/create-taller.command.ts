import { Injectable } from '@angular/core';
import { Italler } from 'src/app/core/models/taller.model';
import { TallerFirebaseRepository } from '../repositories/firebase/taller.firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateTallerCommand {
  constructor(private TallerfirebaseRpt: TallerFirebaseRepository) {}

  async execute(taller: Omit<Italler, 'id'>): Promise<void> {
    const newTaller: Italler = {
      ...taller,
      id: '', // Se generará en el repositorio
    };
    await this.TallerfirebaseRpt.create(newTaller);
  }
}