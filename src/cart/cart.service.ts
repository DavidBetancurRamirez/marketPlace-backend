import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateItemDto } from './dto/update-cart.dto';
import { CartItem } from './entities/cart-item.entity';
import { UserActiveInterface } from '../common/interfaces/user.interface';
import { User } from '../user/entities/user.entity';
import { ItemType } from './entities/item-type.entity';
import { CartResponse } from './interfaces/cart-response.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(ItemType)
    private readonly itemTypeRepository: Repository<ItemType>,
  ) {}

  async create(user: User) {
    return await this.cartRepository.save({ 
      user,
      items: []
    });
  }

  async findAll() {
    return await this.cartRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findMyCart(email: string) {
    return await this.cartRepository.find({
      where: { 
        user: { email } 
      },
    });
  }

  async findOne(id: number) {
    return await this.cartRepository.find({
      where: { id },
    });
  }

  async addItem(userActive: UserActiveInterface, updateItemDto: UpdateItemDto) {
    const cart = await this.findMyCart(userActive.email);

    console.log(cart)
    return cart;
  }

  async updateItem(userActive: UserActiveInterface, updateItemDto: UpdateItemDto) {
    return `This action updates a cart`;
  }

  async clearCart(userActive: UserActiveInterface, updateItemDto: UpdateItemDto) {
    return `This action updates a cart`;
  }
  
  async removeItem(userActive: UserActiveInterface, updateItemDto: UpdateItemDto) {
    return `This action updates a cart`;
  }

  tocartResponse(cart: Cart): CartResponse {
    delete cart["deletedAt"];
    
    return cart;
  }
}
