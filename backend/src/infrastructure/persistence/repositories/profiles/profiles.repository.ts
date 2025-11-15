import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IProfilesRepository } from "../../../../core/profiles/abstraction/profiles-repository.interface";
import { Profile } from "../../../../core/profiles/entities/profile.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class ProfilesRepository implements IProfilesRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}
  getAll(): Promise<Profile[]> {
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
