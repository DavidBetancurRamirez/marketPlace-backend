import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateItemDto } from "./dto/update-cart.dto";
import { CartItem } from "./entities/cart-item.entity";
import { ItemType } from "./entities/item-type.entity";
import { ItemTypeValues } from "./types/item-type.type";
import { CreateItemTypeDto } from "./dto/create-item-type.dto";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(ItemType)
    private readonly itemTypeRepository: Repository<ItemType>,
  ) {}

  async update(cart: Cart, updateItemDto: UpdateItemDto): Promise<void> {
    const itemType = await this.getItemType(updateItemDto.itemType);
    const item = this.itemInCart(cart, updateItemDto.itemId, itemType);

    // TODO: validate itemID
    
    if (item) {
      await this.cartItemRepository.update(item.id, {
        ...updateItemDto,
        itemType
      });

    } else {
      await this.cartItemRepository.save({
        cart,
        itemType,
        itemId: updateItemDto.itemId,
        quantity: updateItemDto.quantity,
      });
    }
  }

  async remove(id: number): Promise<void> {
    await this.cartItemRepository.delete({ id });
  }

  itemInCart(cart: Cart, itemId: number, itemType: ItemType): CartItem {
    return cart?.items?.find((item) =>
      item.itemId === itemId && 
      item.itemType.id === itemType.id
    );
  }

  //* Item Types methods
  async findItemsTypes(): Promise<ItemType[]> {
    return await this.itemTypeRepository.find({
      order: { id: 'ASC' }
    }) 
  }

  async findOneItemTypeByName(name: ItemTypeValues): Promise<ItemType> {
    return await this.itemTypeRepository.findOne({
      where: { name }
    }) 
  }

  async addItemType(createItemTypeDto: CreateItemTypeDto): Promise<ItemType> {
    return await this.itemTypeRepository.save({ 
      name: createItemTypeDto.name
    })
  }

  async getItemType(itemTypeName: ItemTypeValues): Promise<ItemType> {
    const itemType = await this.findOneItemTypeByName(itemTypeName);
    if (!itemType) {
      throw new BadRequestException("invalid itemType");
    }
    return itemType;
  }
}