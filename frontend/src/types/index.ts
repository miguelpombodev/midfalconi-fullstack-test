export interface Profile {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
  profile?: Profile;
}

export type CreateUserDto = Omit<
  User,
  "id" | "isActive" | "profile" | "inactivateUser" | "createdAt" | "updatedAt"
>;

export type UpdateUserDto = Partial<CreateUserDto> & {
  isActive?: boolean;
};
