import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ItemType } from './entities/item-type.entity';
import { CartItemService } from './cart-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, ItemType]),
    AuthModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartItemService],
  exports: [CartService],
})
export class CartModule {}
