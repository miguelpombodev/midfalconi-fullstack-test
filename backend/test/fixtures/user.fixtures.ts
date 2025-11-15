import { profileFixture } from "./profile.fixtures";

const userFixture = {
  id: "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
  isActive: true,
  profileId: "p1r2o3f4-e5f6-7890-a1b2-c3d4e5f67890",
  inactivateUser: jest.fn(),
  profile: profileFixture,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CreateUserRequestFixture = {
  firstName: "New",
  lastName: "User",
  email: "new@user.com",
  profileId: "p1r2o3f4-e5f6-7890-a1b2-c3d4e5f67890",
};

export { userFixture, CreateUserRequestFixture };
