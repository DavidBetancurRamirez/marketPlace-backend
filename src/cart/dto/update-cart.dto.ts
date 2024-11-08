import { IsIn, IsNumber, IsString, Min } from "class-validator";
import { ItemTypeArray, ItemTypeValues } from "../types/item-type.type";

export class UpdateItemDto {
  @IsNumber()
  itemId: number;

  @IsString()
  @IsIn(ItemTypeArray)
  itemType: ItemTypeValues;

  @IsNumber()
  @Min(1)
  quantity: number;
}
