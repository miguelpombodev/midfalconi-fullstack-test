import { BaseEntity } from "src/core/common/base.entity";
import { User } from "src/core/users/entities/user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("profiles")
export class Profile extends BaseEntity {
  @Column({ type: "varchar", length: 30 })
  name: string;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];
}
