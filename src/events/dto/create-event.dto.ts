
import { IsIn, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  message: string;
}