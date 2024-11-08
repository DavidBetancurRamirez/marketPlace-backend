import { IsString } from "class-validator";

export class CleareCartDto {
  @IsString()
  message: string;
}
