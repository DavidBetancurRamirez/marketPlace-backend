import { IsIn, IsString } from "class-validator";
import { ItemTypeArray, ItemTypeValues } from "../types/item-type.type";

export class CreateItemTypeDto {
  @IsString()
  @IsIn(ItemTypeArray)
  name: ItemTypeValues;
}
