import { Profile } from "../../src/core/profiles/entities/profile.entity";

const profileFixture = {
  id: "p1r2o3f4-e5f6-4890-a1b2-c3d4e5f67890",
  name: "Standard User",
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

export { profileFixture, profilesListFixture };
