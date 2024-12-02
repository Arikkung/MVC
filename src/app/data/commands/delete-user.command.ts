import { Injectable } from '@angular/core';
import { UserFirebaseRepository } from '../repositories/firebase/user.firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserCommand {
  constructor(private UserFirebaseRpt: UserFirebaseRepository) {}

  async execute(userId: string): Promise<void> {
    await this.UserFirebaseRpt.delete(userId);
  }
}