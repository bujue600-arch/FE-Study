import { plainToInstance, Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  validate
} from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title!: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @Type(() => Number)
  @IsInt()
  authorId!: number;
}

export async function toCreatePostDto(payload: unknown): Promise<CreatePostDto> {
  const dto = plainToInstance(CreatePostDto, payload, {
    enableImplicitConversion: true
  });
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true
  });

  if (errors.length > 0) {
    throw errors;
  }

  return dto;
}
