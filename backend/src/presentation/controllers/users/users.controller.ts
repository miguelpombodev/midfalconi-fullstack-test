import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
} from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CreateUserRequest } from "../../../application/users/contracts/createUser.request";
import { UpdateUserRequest } from "../../../application/users/contracts/updateUser.request";
import { UserIdParamsDto } from "../../../application/users/dtos/UserIdParam.dto";
import { UsersService } from "../../../application/users/services/users.service";
import { User } from "../../../core/users/entities/user.entity";
import { InjectPinoLogger } from "nestjs-pino/InjectPinoLogger";
import { PinoLogger } from "nestjs-pino/PinoLogger";

@Controller("users")
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @InjectPinoLogger(UsersService.name)
    private readonly _logger: PinoLogger,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async createUser(@Body() body: CreateUserRequest): Promise<void> {
    return await this._usersService.createUserAsync(body);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey("users_list")
  @HttpCode(200)
  @ApiOperation({ summary: "Retrieve all users" })
  @ApiResponse({ status: 200, description: "List of users" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiQuery({
    name: "profile",
    required: false,
    type: String,
    description: "Filter users by profile ID",
  })
  async findAllUsers(@Query("profile") profileId?: string): Promise<User[]> {
    const allUsers = await this._usersService.findAllUsersAsync(
      profileId || null,
    );

    return allUsers;
  }

  @Put(":userId/inactivate")
  @HttpCode(204)
  @ApiOperation({ summary: "Inactivate a user" })
  @ApiResponse({ status: 204, description: "User inactivated successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "userId", description: "ID of the user to inactivate" })
  async inactivateUser(@Param() params: UserIdParamsDto): Promise<void> {
    await this._usersService.inactivateUserAsync(params.userId);
    await this.cacheManager.del(`user_${params.userId}`);
    await this.cacheManager.del("users_list");
  }

  @Get(":userId")
  @HttpCode(200)
  @ApiOperation({ summary: "Retrieve user by its id" })
  @ApiResponse({ status: 200, description: "User informations" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "userId", description: "ID of the user to inactivate" })
  async findOneUser(@Param() params: UserIdParamsDto): Promise<User | null> {
    const cachedUser = await this.cacheManager.get<User>(
      `user_${params.userId}`,
    );

    if (cachedUser) {
      this._logger.debug(`Cache hit for user with id: ${params.userId}`);
      return cachedUser;
    }

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
  @ApiParam({ name: "userId", description: "ID of the user to inactivate" })
  async updateOneUser(
    @Param() params: UserIdParamsDto,
    @Body() body: UpdateUserRequest,
  ): Promise<void> {
    await this._usersService.updateUserAsync(params.userId, body);
    await this.cacheManager.del(`user_${params.userId}`);
    await this.cacheManager.del("users_list");
  }

  @Delete(":userId")
  @HttpCode(204)
  @ApiOperation({ summary: "Deletes a user by its id" })
  @ApiResponse({ status: 204, description: "User deleted successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiParam({ name: "userId", description: "ID of the user to inactivate" })
  async deleteOneUser(@Param() params: UserIdParamsDto): Promise<void> {
    await this._usersService.deleteUserAsync(params.userId);
    await this.cacheManager.del(`user_${params.userId}`);
    await this.cacheManager.del("users_list");
  }
}
