import { UpdateUserRequest } from "../../src/application/users/contracts/updateUser.request";
import { profileFixture } from "./profile.fixtures";

const validUUIDv4 = "a1b2c3d4-e5f6-4890-a1b2-c3d4e5f67890";
const validProfileUUIDv4 = "p1r2o3f4-e5f6-4890-a1b2-c3d4e5f67890";

const userFixture = {
  id: validUUIDv4,
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
  isActive: true,
  profileId: "p1r2o3f4-e5f6-7890-a1b2-c3d4e5f67890",
  inactivateUser: jest.fn(),
  profile: { ...profileFixture, id: validProfileUUIDv4 },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CreateUserRequestFixture = {
  firstName: "New",
  lastName: "User",
  email: "new@user.com",
  profileId: validProfileUUIDv4,
};

const updateUserRequestFixture: Partial<UpdateUserRequest> = {
  firstName: "Updated",
  lastName: "Name",
  email: "updated@email.com",
  profileId: "p1r2o3f4-e5f6-4890-a1b2-c3d4e5f67890",
};

export { userFixture, CreateUserRequestFixture, updateUserRequestFixture };
