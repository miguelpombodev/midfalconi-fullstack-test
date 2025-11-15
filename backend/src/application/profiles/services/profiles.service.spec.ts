import { Test, TestingModule } from "@nestjs/testing";
import { ProfilesService } from "./profiles.service";
import { ProfilesRepository } from "src/infrastructure/persistence/repositories/profiles/profiles.repository";
import { Profile } from "src/core/profiles/entities/profile.entity";

const profileFixture: Profile = {
  id: "p1r2o3f4-e5f6-7890-a1b2-c3d4e5f67890",
  name: "Admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  users: [],
};

const profilesListFixture: Profile[] = [
  profileFixture,
  {
    ...profileFixture,
    id: "p1r2o3f4-e5f6-7890-a1b2-c3d4e5f67891",
    name: "User",
  },
];

const mockProfilesRepository = {
  getAll: jest.fn(),
};

describe("ProfilesService", () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: ProfilesRepository,
          useValue: mockProfilesRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAllProfilesAsync", () => {
    it("should return a list of all profiles", async () => {
      // Arrange
      mockProfilesRepository.getAll.mockResolvedValue(profilesListFixture);

      // Act
      const result = await service.findAllProfilesAsync();

      // Assert
      expect(result).toEqual(profilesListFixture);
      expect(result.length).toBe(2);
      expect(mockProfilesRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it("should return an empty list if no profiles exist", async () => {
      // Arrange
      mockProfilesRepository.getAll.mockResolvedValue([]);

      // Act
      const result = await service.findAllProfilesAsync();

      // Assert
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
      expect(mockProfilesRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the repository fails", async () => {
      const dbError = new Error("Database Error");
      // Arrange
      mockProfilesRepository.getAll.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.findAllProfilesAsync()).rejects.toThrow(dbError);
    });
  });
});
