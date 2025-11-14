import { User } from "../entities/user.entity";

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = new User();
    this.user.isActive = true; // valor padrão
  }

  setFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  setProfileId(profileId: string): UserBuilder {
    this.user.profileId = profileId;
    return this;
  }

  setIsActive(isActive: boolean): UserBuilder {
    this.user.isActive = isActive;
    return this;
  }

  build(): User {
    if (!this.user.email) {
      throw new Error("Email is required");
    }
    return this.user;
  }
}
