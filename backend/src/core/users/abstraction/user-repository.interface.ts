import { IBaseRepository } from "src/core/common/abstraction/base-repository.interface";
import { User } from "../entities/user.entity";

export interface IUserRepository extends IBaseRepository<User> {
  updateUser(userId: string, userData: Partial<User>): Promise<User | null>;

  createUser(user: User): Promise<User>;

  deleteUser(userId: string): Promise<void>;
}
