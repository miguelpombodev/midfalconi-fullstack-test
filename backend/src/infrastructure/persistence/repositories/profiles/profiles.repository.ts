import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IProfilesRepository } from "src/core/profiles/abstraction/profiles-repository.interface";
import { Profile } from "src/core/profiles/entities/profile.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class ProfilesRepository implements IProfilesRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  getAllProfiles(): Promise<Profile[]> {
    const profiles = this.profilesRepository.find();
    return profiles;
  }

  async getUsersByProfileId(profileId: string): Promise<any> {
    const usersWithProfile = await this.profilesRepository.find({
      where: { id: profileId },
      relations: ["users"],
    });

    return usersWithProfile;
  }

  getById(id: string): Promise<Profile | null> {
    return this.profilesRepository.findOne({ where: { id } });
  }
}
