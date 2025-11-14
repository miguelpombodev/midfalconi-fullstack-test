import { Injectable } from "@nestjs/common";
import { Profile } from "src/core/profiles/entities/profile.entity";
import { ProfilesRepository } from "src/infrastructure/persistence/repositories/profiles/profiles.repository";

@Injectable()
export class ProfilesService {
  constructor(private readonly _profilesRepository: ProfilesRepository) {}

  async findAllProfilesAsync(): Promise<Profile[]> {
    const profiles = await this._profilesRepository.getAllProfiles();

    return profiles;
  }
}
