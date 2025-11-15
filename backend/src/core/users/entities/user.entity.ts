import { Entity, JoinColumn, ManyToOne, Column } from "typeorm";
import { UserBuilder } from "../builder/user.builder";
import { BaseEntity } from "src/core/common/base.entity";
import { Profile } from "src/core/profiles/entities/profile.entity";

@Entity("users")
export class User extends BaseEntity {
  @Column({ type: "varchar", length: 30 })
  firstName: string;

  @Column({ type: "varchar", length: 30 })
  lastName: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "uuid" })
  profileId: string;

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn({ name: "profileId" })
  profile: Profile;

  inactivateUser(): User {
    this.isActive = false;
    return this;
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }
}
