import { Module } from "@nestjs/common";
import { ProfileController } from "./profile/profile.controller";
import { UsersController } from "./users/users.controller";
import { ApplicationModule } from "src/application/application.module";

@Module({
  imports: [ApplicationModule],
  controllers: [UsersController, ProfileController],
})
export class ControllersModule {}
