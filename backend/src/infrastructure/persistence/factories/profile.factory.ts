import { faker } from "@faker-js/faker";
import { Profile } from "../../../core/profiles/entities/profile.entity";
import { define } from "typeorm-seeding";

define(Profile, () => {
  const profile = new Profile();
  profile.name = faker.person.jobTitle();
  return profile;
});
