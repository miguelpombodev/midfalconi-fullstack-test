import { Controller } from "@nestjs/common";
import { UsersService } from "src/application/users/users.service";
import { User } from "src/core/users/entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  async findOneUser(userId: string): Promise<User | null> {
    return await this._usersService.findOneUserAsync(userId);
  }
}
