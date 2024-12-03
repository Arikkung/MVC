import { Injectable } from '@angular/core';
import { Italler } from 'src/app/core/models/taller.model';
import { TallerFirebaseRepository } from '../repositories/firebase/taller.firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class GetTallerQuery {
  constructor(private TallerFirebaseRpt: TallerFirebaseRepository) {}

  async execute(): Promise<Italler[]> {
    return await this.TallerFirebaseRpt.getAll();
  }
}