import { Injectable } from '@angular/core';
import { UserRepository } from '../user.repository';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFirebaseRepository implements UserRepository {
  private collectionName = 'users';

  constructor(private firestore: AngularFirestore) {}

  async create(user: IUser): Promise<void> {
    const id = this.firestore.createId();
    user.id = id;
    await this.firestore.collection(this.collectionName).doc(id).set(user);
  }

  async update(user: IUser): Promise<void> {
    await this.firestore.collection(this.collectionName).doc(user.id).update(user);
  }

  async delete(userId: string): Promise<void> {
    await this.firestore.collection(this.collectionName).doc(userId).delete();
  }

  async getAll(): Promise<IUser[]> {
    const snapshot = await this.firestore.collection<IUser>(this.collectionName).get().toPromise();
    return snapshot?.docs.map((doc) => ({ ...doc.data() })) || [];
  }

  async getById(userId: string): Promise<IUser | undefined> {
    const doc = await this.firestore.collection(this.collectionName).doc<Task>(userId).get().toPromise();
    return doc?.exists ? ({ id: doc.id, ...doc.data() } as IUser) : undefined;
  }
}