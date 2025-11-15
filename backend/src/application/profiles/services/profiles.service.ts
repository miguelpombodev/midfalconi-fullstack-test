import { Injectable } from "@nestjs/common";
import { Profile } from "../../../core/profiles/entities/profile.entity";
import { ProfilesRepository } from "../../../infrastructure/persistence/repositories/profiles/profiles.repository";

@Injectable()
export class ProfilesService {
  constructor(private readonly _profilesRepository: ProfilesRepository) {}

  async findAllProfilesAsync(): Promise<Profile[]> {
    const profiles = await this._profilesRepository.getAll();

    return profiles;
  }
}
