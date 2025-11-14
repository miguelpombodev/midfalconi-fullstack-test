import { Injectable } from "@nestjs/common";
import { User } from "src/core/users/entities/user.entity";
import { UsersRepository } from "src/infrastructure/persistence/repositories/users/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async findOneUserAsync(userId: string): Promise<User | null> {
    const user = await this._usersRepository.getById(userId);
    return user;
  }
}
