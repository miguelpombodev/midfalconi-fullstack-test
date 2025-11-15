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

  async inactivateUserAsync(userId: string): Promise<User | null> {
    try {
      const checkUser = await this._usersRepository.getById(userId);

      if (!checkUser) {
        this._logger.warn(
          `There was an attempt to inactivate a non-existing user with id: ${userId}`,
        );
        throw new NotFoundException("User not found");
      }

      checkUser.inactivateUser();

      const updatedUser = await this._usersRepository.updateUser(
        userId,
        checkUser,
      );
      return updatedUser;
    } catch (error) {
      this._logger.error({ error }, "Error trying to inactivate user");
      throw error;
    }
  }

  async findAllUsersAsync(profileId: string | null): Promise<User[]> {
    try {
      const users = await this._usersRepository.getAll(profileId);
      return users;
    } catch (error) {
      this._logger.error({ error }, "Error trying to retrieve users list");
      throw error;
    }
  }

  async findOneUserAsync(userId: string): Promise<User | null> {
    const checkUser = await this._usersRepository.getById(userId);

    if (!checkUser) {
      this._logger.warn(
        `There was an attempt to update a non-existing user with id: ${userId}`,
      );
      throw new NotFoundException("User not found");
    }

    return checkUser;
  }

  async updateUserAsync(
    userId: string,
    userData: Partial<User>,
  ): Promise<User | null> {
    try {
      const checkUser = await this._usersRepository.getById(userId);

      if (!checkUser) {
        this._logger.warn(
          `There was an attempt to update a non-existing user with id: ${userId}`,
        );
        throw new NotFoundException("User not found");
      }
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

  async deleteUserAsync(userId: string): Promise<void> {
    try {
      const checkUser = await this._usersRepository.getById(userId);

      if (!checkUser) {
        this._logger.warn(
          `There was an attempt to update a non-existing user with id: ${userId}`,
        );
        throw new NotFoundException("User not found");
      }

      await this._usersRepository.deleteUser(userId);
      this._logger.info(`User with id ${userId} deleted successfully!`);
    } catch (error) {
      this._logger.error({ error }, "Error trying to delete user");
      throw error;
    }
  }
}
