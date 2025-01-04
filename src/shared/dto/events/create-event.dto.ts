import { IsISO8601, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsObject()
  @IsNotEmpty()
  payload: Record<string, any>;

  @IsISO8601()
  @IsOptional()
  timestamp?: string;
}