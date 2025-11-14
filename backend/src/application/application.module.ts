import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { UsersService } from "./users/services/users.service";
import { ProfilesService } from "./profiles/services/profiles.service";

@Module({
  imports: [InfrastructureModule],
  providers: [UsersService, ProfilesService],
  exports: [UsersService, ProfilesService],
})
export class ApplicationModule {}
