import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserRequest } from "src/application/users/contracts/createUser.request";
import { UpdateUserRequest } from "src/application/users/contracts/updateUser.request";
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

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Retrieve all users" })
  @ApiResponse({ status: 200, description: "List of users" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async findAllUsers(): Promise<User[]> {
    return await this._usersService.findAllUsersAsync();
  }

  @Get(":userId")
  @HttpCode(200)
  @ApiOperation({ summary: "Retrieve user by its id" })
  @ApiResponse({ status: 200, description: "User informations" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async findOneUser(
    @Param() params: FindOneUserParamsDto,
  ): Promise<User | null> {
    return await this._usersService.findOneUserAsync(params.userId);
  }

  @Put(":userId")
  @HttpCode(204)
  @ApiOperation({
    summary:
      "Updates data for a single user, using its id as parameter and requiring the rest of the data in its body",
  })
  @ApiResponse({ status: 204, description: "User's data update" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async updateOneUser(
    @Param() params: FindOneUserParamsDto,
    @Body() body: UpdateUserRequest,
  ): Promise<void> {
    await this._usersService.updateUserAsync(params.userId, body);
  }

  @Delete(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Deletes a user by its id" })
  @ApiResponse({ status: 204, description: "User deleted successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async deleteOneUser(@Param() params: FindOneUserParamsDto): Promise<void> {
    return await this._usersService.deleteUserAsync(params.userId);
  }
}
