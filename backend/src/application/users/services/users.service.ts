import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/core/users/entities/user.entity";
import { UsersRepository } from "src/infrastructure/persistence/repositories/users/users.repository";
import { CreateUserRequest } from "../contracts/createUser.request";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Injectable()
export class UsersService {
  constructor(
    private readonly _usersRepository: UsersRepository,

    @InjectPinoLogger(UsersService.name)
    private readonly _logger: PinoLogger,
  ) {}

  async createUserAsync(userData: CreateUserRequest): Promise<void> {
    try {
      const checkUser = await this._usersRepository.getUserByEmail(
        userData.email,
      );

      if (checkUser) {
        this._logger.warn(
          `There was an attempt to create a user with an existing email: ${userData.email}`,
        );

        throw new NotFoundException("User with this email already exists");
      }

      const user = User.builder()
        .setFirstName(userData.firstName)
        .setLastName(userData.lastName)
        .setEmail(userData.email)
        .setProfileId(userData.profileId)
        .setIsActive(true)
        .build();

      await this._usersRepository.createUser(user);

      this._logger.info(`User created with email: ${user.email}`);
    } catch (error) {
      this._logger.error({ error }, "Error creating user");
      throw error;
    }
  }

  async findAllUsersAsync(): Promise<User[]> {
    try {
      const users = await this._usersRepository.getAll();
      return users;
    } catch (error) {
      this._logger.error({ error }, "Error trying to retrieve users list");
      throw error;
    }
  }

  async findOneUserAsync(userId: string): Promise<User | null> {
    const user = await this._usersRepository.getById(userId);
    return user;
  }

  async updateUserAsync(
    userId: string,
    userData: Partial<User>,
  ): Promise<User | null> {
    try {
      const updatedUser = await this._usersRepository.updateUser(
        userId,
        userData,
      );
      return updatedUser;
    } catch (error) {
      this._logger.error({ error }, "Error trying to update user's data");
      throw error;
    }
  }
}
