import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/core/users/abstraction/user-repository.interface";
import { User } from "src/core/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly context: Repository<User>,
  ) {}

  getAll(profileId: string | null): Promise<User[]> {
    const query = this.context
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile");

    if (profileId) {
      query.where("user.profileId = :profileId", { profileId });
    }

    query.orderBy("user.createdAt", "DESC");

    return query.getMany();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.context.findOneBy({ email });
  }

  async updateUser(
    userId: string,
    userData: Partial<User>,
  ): Promise<User | null> {
    const user = await this.context.preload({ id: userId, ...userData });

    if (!user) {
      return null;
    }

    return await this.context.save(user);
  }

  async createUser(user: User): Promise<User> {
    return await this.context.save(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.context.delete(userId);
  }

  async getById(id: string): Promise<User | null> {
    return await this.context.findOneBy({ id });
  }
}
