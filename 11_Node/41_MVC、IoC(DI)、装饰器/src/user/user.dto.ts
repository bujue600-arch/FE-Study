import { plainToInstance } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, validate } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name!: string;
}

export async function toCreateUserDto(payload: unknown): Promise<CreateUserDto> {
  const dto = plainToInstance(CreateUserDto, payload);
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true
  });

  if (errors.length > 0) {
    throw errors;
  }

  return dto;
}
