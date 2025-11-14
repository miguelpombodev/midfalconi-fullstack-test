import { Controller, Get, HttpCode } from "@nestjs/common";
import { ProfilesService } from "src/application/profiles/profiles.service";
import { Profile } from "src/core/profiles/entities/profile.entity";

@Controller("profile")
export class ProfileController {
  constructor(private readonly _profilesService: ProfilesService) {}

  @Get()
  @HttpCode(200)
  async findAllProfiles(): Promise<Profile[]> {
    return await this._profilesService.findAllProfilesAsync();
  }
}
