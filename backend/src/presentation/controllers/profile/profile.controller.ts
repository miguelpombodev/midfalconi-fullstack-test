import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProfilesService } from "src/application/profiles/services/profiles.service";
import { Profile } from "src/core/profiles/entities/profile.entity";

@Controller("profile")
export class ProfileController {
  constructor(private readonly _profilesService: ProfilesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Retrieve a list of registered profiles" })
  @ApiResponse({ status: 200, description: "List of profiles" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async findAllProfiles(): Promise<Profile[]> {
    return await this._profilesService.findAllProfilesAsync();
  }
}
