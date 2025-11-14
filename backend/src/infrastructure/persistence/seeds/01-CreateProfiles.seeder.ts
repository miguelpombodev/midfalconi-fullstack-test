import { Profile } from "../../../core/profiles/entities/profile.entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateProfilesSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Profile)().create({
      name: "Administrator",
    });

    await factory(Profile)().create({
      name: "User",
    });
  }
}
