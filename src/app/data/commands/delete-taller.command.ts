import { Injectable } from '@angular/core';
import { TallerFirebaseRepository } from '../repositories/firebase/taller.firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteTallerCommand {
  constructor(private TallerFirebaseRpt: TallerFirebaseRepository) {}

  async execute(tallerId: string): Promise<void> {
    await this.TallerFirebaseRpt.delete(tallerId);
  }
}