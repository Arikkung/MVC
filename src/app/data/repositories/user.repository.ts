import { IUser } from "src/app/core/models/user.model";

export interface UserRepository {
    create(user: IUser): Promise<void>;
    update(user: IUser): Promise<void>;
    delete(userId: string): Promise<void>;
    getAll(): Promise<IUser[]>;
    getById(userId: string): Promise<IUser | undefined>;
  }