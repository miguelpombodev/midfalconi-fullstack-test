import { IBaseRepository } from "src/core/common/abstraction/base-repository.interface";
import { Profile } from "../entities/profile.entity";

export interface IProfilesRepository extends IBaseRepository<Profile> {
  getUsersByProfileId(profileId: string): Promise<Profile | null>;
  getAllProfiles(): Promise<Profile[]>;
}
