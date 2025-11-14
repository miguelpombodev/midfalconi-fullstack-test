import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequest {
  @ApiProperty({
    description: "User's first name",
    example: "John",
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: "User's last name",
    example: "Doe",
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "User's  email address",
    example: "john.doe@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Profile ID associated with the user",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty()
  profileId: string;
}
