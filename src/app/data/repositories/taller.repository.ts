import { Italler } from "src/app/core/models/taller.model";

export interface TallerRepository {
    create(taller: Italler): Promise<void>;
    update(taller: Italler): Promise<void>;
    delete(tallerId: string): Promise<void>;
    getAll(): Promise<Italler[]>;
    getById(tallerId: string): Promise<Italler | undefined>;
  }