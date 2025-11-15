import { getConnection } from "typeorm";
import { Profile } from "../../../core/profiles/entities/profile.entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateProfilesSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const profileRepository = getConnection().getRepository(Profile);
    const profilesToCreate = [{ name: "Administrator" }, { name: "User" }];

    for (const profileData of profilesToCreate) {
      const profileName = profileData.name;

      const existingProfile = await profileRepository.findOne({
        where: { name: profileName },
      });

      if (!existingProfile) {
        console.log(`Creating profile: ${profileName}`);
        await factory(Profile)().create(profileData);
      }
    }
  }
}
