import { Injectable } from '@angular/core';
import { TallerRepository } from '../taller.repository';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Italler } from 'src/app/core/models/taller.model';

@Injectable({
  providedIn: 'root',
})
export class TallerFirebaseRepository implements TallerRepository {
  private collectionName = 'talleres';

  constructor(private firestore: AngularFirestore) {}

  async create(taller: Italler): Promise<void> {
    const id = this.firestore.createId();
    taller.id = id;
    await this.firestore.collection(this.collectionName).doc(id).set(taller);
  }

  async update(taller: Italler): Promise<void> {
    await this.firestore.collection(this.collectionName).doc(taller.id).update(taller);
  }

  async delete(tallerId: string): Promise<void> {
    await this.firestore.collection(this.collectionName).doc(tallerId).delete();
  }

  async getAll(): Promise<Italler[]> {
    const snapshot = await this.firestore.collection<Italler>(this.collectionName).get().toPromise();
    return snapshot?.docs.map((doc) => ({ ...doc.data() })) || [];
  }

  async getById(tallerId: string): Promise<Italler | undefined> {
    const doc = await this.firestore.collection(this.collectionName).doc<Task>(tallerId).get().toPromise();
    return doc?.exists ? ({ id: doc.id, ...doc.data() } as Italler) : undefined;
  }
}