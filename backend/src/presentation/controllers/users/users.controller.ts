import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { FindOneUserParamsDto } from "src/application/users/dtos/findOneUserParam.dto";
import { UsersService } from "src/application/users/services/users.service";
import { User } from "src/core/users/entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get(":userId")
  @HttpCode(200)
  async findOneUser(
    @Param() params: FindOneUserParamsDto,
  ): Promise<User | null> {
    return await this._usersService.findOneUserAsync(params.userId);
  }
}
