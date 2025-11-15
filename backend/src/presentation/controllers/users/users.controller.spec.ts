import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { UsersController } from "./users.controller";
import { UsersService } from "../../../application/users/services/users.service";
import { CACHE_MANAGER, CacheInterceptor } from "@nestjs/cache-manager";
import {
  mockCacheInterceptor,
  mockCacheManager,
  mockLogger,
  mockUsersService,
} from "../../../../test/mocks/user.mocks";
import { getLoggerToken } from "nestjs-pino";
import {
  CreateUserRequestFixture,
  updateUserRequestFixture,
  userFixture,
} from "../../../../test/fixtures/user.fixtures";

describe("UsersController", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        {
          provide: getLoggerToken(UsersService.name),
          useValue: mockLogger,
        },
      ],
    })
      .overrideInterceptor(CacheInterceptor)
      .useValue(mockCacheInterceptor)
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  describe("POST /users", () => {
    it("should create a user and return 201", async () => {
      // Arrange
      mockUsersService.createUserAsync.mockResolvedValue(undefined);

      // Act
      const response = await request(app.getHttpServer())
        .post("/users")
        .send(CreateUserRequestFixture);

      // Assert
      expect(response.status).toBe(201);
      expect(mockUsersService.createUserAsync).toHaveBeenCalledWith(
        CreateUserRequestFixture,
      );
    });
  });

  describe("GET /users", () => {
    it("should return a list of users and return 200", async () => {
      // Arrange
      const expectedResponse = JSON.parse(JSON.stringify([userFixture]));
      mockUsersService.findAllUsersAsync.mockResolvedValue([userFixture]);

      // Act
      const response = await request(app.getHttpServer()).get("/users");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      expect(mockUsersService.findAllUsersAsync).toHaveBeenCalledWith(null);
    });

    it("should pass the profileId query param to the service", async () => {
      // Arrange
      const profileId = "test-profile-id";
      mockUsersService.findAllUsersAsync.mockResolvedValue([]);

      // Act
      await request(app.getHttpServer()).get(`/users?profile=${profileId}`);

      // Assert
      expect(mockUsersService.findAllUsersAsync).toHaveBeenCalledWith(
        profileId,
      );
    });
  });

  describe("GET /users/:userId", () => {
    it("should return a user from cache if found (Cache HIT)", async () => {
      // Arrange
      const expectedResponse = JSON.parse(JSON.stringify(userFixture));
      mockCacheManager.get.mockResolvedValue(userFixture);

      // Act
      const response = await request(app.getHttpServer()).get(
        `/users/${userFixture.id}`,
      );

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      expect(mockCacheManager.get).toHaveBeenCalledWith(
        `user_${userFixture.id}`,
      );

      expect(mockUsersService.findOneUserAsync).not.toHaveBeenCalled();
      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it("should return a user from service if not in cache (Cache MISS)", async () => {
      // Arrange
      const expectedResponse = JSON.parse(JSON.stringify(userFixture));
      mockCacheManager.get.mockResolvedValue(null); // Cache MISS
      mockUsersService.findOneUserAsync.mockResolvedValue(userFixture); // Service HIT

      // Act
      const response = await request(app.getHttpServer()).get(
        `/users/${userFixture.id}`,
      );

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      expect(mockCacheManager.get).toHaveBeenCalledWith(
        `user_${userFixture.id}`,
      );
      // O serviço DEVE ser chamado
      expect(mockUsersService.findOneUserAsync).toHaveBeenCalledWith(
        userFixture.id,
      );
    });

    it("should return 400 if userId is not a valid UUID", async () => {
      // Act
      const response = await request(app.getHttpServer()).get("/users/123");

      // Assert
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /users/:userId/inactivate", () => {
    it("should inactivate a user and clear cache", async () => {
      // Arrange
      mockUsersService.inactivateUserAsync.mockResolvedValue(undefined);
      mockCacheManager.del.mockResolvedValue(undefined);

      // Act
      const response = await request(app.getHttpServer()).put(
        `/users/${userFixture.id}/inactivate`,
      );

      // Assert
      expect(response.status).toBe(204);
      expect(mockUsersService.inactivateUserAsync).toHaveBeenCalledWith(
        userFixture.id,
      );

      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `user_${userFixture.id}`,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith("users_list");
    });
  });

  describe("PUT /users/:userId", () => {
    it("should update a user and clear cache", async () => {
      // Arrange
      mockUsersService.updateUserAsync.mockResolvedValue(undefined);
      mockCacheManager.del.mockResolvedValue(undefined);

      // Act
      const response = await request(app.getHttpServer())
        .put(`/users/${userFixture.id}`)
        .send(updateUserRequestFixture);

      // Assert
      expect(response.status).toBe(204);
      expect(mockUsersService.updateUserAsync).toHaveBeenCalledWith(
        userFixture.id,
        updateUserRequestFixture,
      );
      // Verifica se a lógica de limpar o cache do controller foi chamada
      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `user_${userFixture.id}`,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith("users_list");
    });
  });

  describe("DELETE /users/:userId", () => {
    it("should delete a user and clear cache", async () => {
      // Arrange
      mockUsersService.deleteUserAsync.mockResolvedValue(undefined);
      mockCacheManager.del.mockResolvedValue(undefined);

      // Act
      const response = await request(app.getHttpServer()).delete(
        `/users/${userFixture.id}`,
      );

      // Assert
      expect(response.status).toBe(204);
      expect(mockUsersService.deleteUserAsync).toHaveBeenCalledWith(
        userFixture.id,
      );

      expect(mockCacheManager.del).toHaveBeenCalledWith(
        `user_${userFixture.id}`,
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith("users_list");
    });
  });
});
