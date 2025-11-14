import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserRequest } from "src/application/users/contracts/createUser.request";
import { FindOneUserParamsDto } from "src/application/users/dtos/findOneUserParam.dto";
import { UsersService } from "src/application/users/services/users.service";
import { User } from "src/core/users/entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async createUser(@Body() body: CreateUserRequest): Promise<void> {
    return await this._usersService.createUserAsync(body);
  }

  @Get(":userId")
  @HttpCode(200)
  async findOneUser(
    @Param() params: FindOneUserParamsDto,
  ): Promise<User | null> {
    return await this._usersService.findOneUserAsync(params.userId);
  }
}
