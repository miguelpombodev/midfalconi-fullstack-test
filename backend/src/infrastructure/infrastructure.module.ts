import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "./persistence/repositories/users/users.repository";
import { User } from "src/core/users/entities/user.entity";
import { Profile } from "src/core/profiles/entities/profile.entity";
import { ProfilesRepository } from "./persistence/repositories/profiles/profiles.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersRepository, ProfilesRepository],
  exports: [UsersRepository, ProfilesRepository],
})
export class InfrastructureModule {}
