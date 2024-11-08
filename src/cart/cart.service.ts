import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UpdateItemDto } from './dto/update-cart.dto';
import { CartItemService } from './cart-item.service';
import { CleareCartDto } from './dto/cleare-cart.dto';
import { CartResponse } from './interfaces/cart-response.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserActiveInterface } from '../common/interfaces/user.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    private readonly cartItemService: CartItemService,
  ) {}

  async create(user: User): Promise<Cart> {
    return await this.cartRepository.save({ 
      user,
    });
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findMyCart(email: string): Promise<CartResponse> {
    const cart = await this.cartRepository.findOne({
      where: { user: { email } },
    });
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }
    return this.toCartResponse(cart);
  }

  async updateItem(userActive: UserActiveInterface, updateItemDto: UpdateItemDto): Promise<CartResponse> {
    const cart = await this.findMyCart(userActive.email);

    await this.cartItemService.update(cart, updateItemDto);

    return await this.findMyCart(userActive.email);
  }

  async clearCart(userActive: UserActiveInterface): Promise<CleareCartDto> {
    const cart = await this.findMyCart(userActive.email);

    cart.items?.forEach(async (item) => await this.cartItemService.remove(item.id));

    return { message: 'Cart cleared' };
  }

  toCartResponse(cart: Cart): CartResponse {
    delete cart["deletedAt"];
    
    return cart;
  }
}
