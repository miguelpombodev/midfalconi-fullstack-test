import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UsersRepository } from "../../../infrastructure/persistence/repositories/users/users.repository";
import {
  mockLogger,
  mockUsersRepository,
} from "../../../../test/mocks/user.mocks";
import { getLoggerToken } from "nestjs-pino";
import {
  CreateUserRequestFixture,
  userFixture,
} from "../../../../test/fixtures/user.fixtures";
import { User } from "../../../core/users/entities/user.entity";
import { NotFoundException } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: getLoggerToken(UsersService.name),
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUserAsync", () => {
    it("should create a new user successfully", async () => {
      // Arrange
      mockUsersRepository.getUserByEmail.mockResolvedValue(null);
      mockUsersRepository.createUser.mockResolvedValue(undefined);

      // Act
      await service.createUserAsync(CreateUserRequestFixture);

      // Assert
      expect(mockUsersRepository.getUserByEmail).toHaveBeenCalledWith(
        CreateUserRequestFixture.email,
      );

      expect(mockUsersRepository.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          ...CreateUserRequestFixture,
          isActive: true,
        }),
      );

      expect(mockLogger.info).toHaveBeenCalledWith(
        `User created with email: ${CreateUserRequestFixture.email}`,
      );
    });

    it("should throw a NotFoundException if user already exists", async () => {
      // Arrange
      mockUsersRepository.getUserByEmail.mockResolvedValue(userFixture as User);

      await expect(
        service.createUserAsync(CreateUserRequestFixture),
      ).rejects.toThrow(NotFoundException);

      expect(mockUsersRepository.getUserByEmail).toHaveBeenCalledWith(
        CreateUserRequestFixture.email,
      );

      expect(mockUsersRepository.createUser).not.toHaveBeenCalled();
    });

    it("should log and re-throw error if repository fails", async () => {
      const dbError = new Error("Database connection lost");
      mockUsersRepository.getUserByEmail.mockRejectedValue(dbError);

      // Act
      await expect(
        service.createUserAsync(CreateUserRequestFixture),
      ).rejects.toThrow(dbError);

      // Assert
      expect(mockLogger.error).toHaveBeenCalledWith(
        { error: dbError },
        "Error creating user",
      );
    });
  });

  describe("findOneUserAsync", () => {
    it("should return a user if found", async () => {
      // Arrange
      mockUsersRepository.getById.mockResolvedValue(userFixture as User);

      // Act
      const result = await service.findOneUserAsync(userFixture.id);

      // Assert
      expect(result).toEqual(userFixture);
      expect(mockUsersRepository.getById).toHaveBeenCalledTimes(1);
    });

    it("should throw NotFoundException if user not found", async () => {
      mockUsersRepository.getById.mockResolvedValue(null);

      // Act
      await expect(service.findOneUserAsync("invalid-id")).rejects.toThrow(
        NotFoundException,
      );

      // Assert
      expect(mockUsersRepository.getById).toHaveBeenCalledTimes(1);
      expect(mockLogger.warn).toHaveBeenCalled();
    });
  });

  describe("inactivateUserAsync", () => {
    it("should inactivate a user successfully", async () => {
      // Arrange
      const userToInactivate = {
        ...userFixture,
        inactivateUser: jest.fn(),
      } as unknown as User;

      mockUsersRepository.getById.mockResolvedValue(userToInactivate);
      mockUsersRepository.updateUser.mockResolvedValue(userToInactivate);

      // Act
      const result = await service.inactivateUserAsync(userFixture.id);

      // Assert
      expect(mockUsersRepository.getById).toHaveBeenCalledWith(userFixture.id);
      expect(userToInactivate.inactivateUser).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.updateUser).toHaveBeenCalledWith(
        userFixture.id,
        userToInactivate,
      );
      expect(result).toEqual(userToInactivate);
    });
  });

  describe("findAllUsersAsync", () => {
    it("should return a list of users", async () => {
      // Arrange
      const usersList = [userFixture as User, userFixture as User];
      mockUsersRepository.getAll.mockResolvedValue(usersList);

      // Act
      const result = await service.findAllUsersAsync(null);

      // Assert
      expect(result).toEqual(usersList);
      expect(result.length).toBe(2);
      expect(mockUsersRepository.getAll).toHaveBeenCalledWith(null);
    });

    it("should call repository with profileId if provided", async () => {
      // Arrange
      const profileId = "profile-filter-id";
      mockUsersRepository.getAll.mockResolvedValue([]);

      // Act
      await service.findAllUsersAsync(profileId);

      // Assert
      expect(mockUsersRepository.getAll).toHaveBeenCalledWith(profileId);
    });
  });
});
