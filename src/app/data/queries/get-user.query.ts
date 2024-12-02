import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';
import { UserFirebaseRepository } from '../repositories/firebase/user.firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class GetUserQuery {
  constructor(private UserFirebaseRpt: UserFirebaseRepository) {}

  async execute(): Promise<IUser[]> {
    return await this.UserFirebaseRpt.getAll();
  }
}