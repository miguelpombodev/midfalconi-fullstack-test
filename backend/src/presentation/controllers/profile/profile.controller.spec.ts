import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { ProfileController } from "./profile.controller";
import { ProfilesService } from "../../../application/profiles/services/profiles.service";
import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  mockCacheInterceptor,
  mockProfilesService,
} from "../../../../test/mocks/profile.mocks";
import { profilesListFixture } from "../../../../test/fixtures/profile.fixtures";

describe("ProfileController", () => {
  let app: INestApplication;
  let service: typeof mockProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfilesService,
          useValue: mockProfilesService,
        },
      ],
    })
      .overrideInterceptor(CacheInterceptor)
      .useValue(mockCacheInterceptor)
      .compile();

    app = module.createNestApplication();
    await app.init();
    service = module.get(ProfilesService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  describe("GET /profile", () => {
    it("should return a list of profiles", async () => {
      // Arrange
      const expectedResponse = JSON.parse(JSON.stringify(profilesListFixture));
      service.findAllProfilesAsync.mockResolvedValue(profilesListFixture);

      // Act
      const response = await request(app.getHttpServer()).get("/profile");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      expect(service.findAllProfilesAsync).toHaveBeenCalledTimes(1);
    });
  });
});
