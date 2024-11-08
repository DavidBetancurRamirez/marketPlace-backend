import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { Role } from 'src/common/enums/rol.enum';
import { UpdateItemDto } from './dto/update-cart.dto';
import { CartItemService } from './cart-item.service';
import { CleareCartDto } from './dto/cleare-cart.dto';
import { ItemType } from './entities/item-type.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.interface';
import { Controller, Get, Body, Patch, Post, Delete } from '@nestjs/common';
import { ResponsesSecurity } from 'src/common/decorators/responses-security.decorator';

@ApiTags('cart')
@ResponsesSecurity()
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
  ) {}

  @Get('all')
  @ApiOperation({ summary: 'Find all' })
  @Auth([Role.ADMIN])
  findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Find my cart' })
  @Auth([Role.USER, Role.MODEL])
  findOne(@ActiveUser() userActive: UserActiveInterface): Promise<Cart> {
    return this.cartService.findMyCart(userActive.email);
  }

  @Patch()
  @ApiOperation({ summary: 'Add item to my cart' })
  @Auth([Role.USER, Role.MODEL])
  updateItem(
    @ActiveUser() userActive: UserActiveInterface, 
    @Body() updateCartDto: UpdateItemDto
  ): Promise<Cart> {
    return this.cartService.updateItem(userActive, updateCartDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  @Auth([Role.USER, Role.MODEL])
  clearCart(@ActiveUser() userActive: UserActiveInterface): Promise<CleareCartDto> {
    return this.cartService.clearCart(userActive);
  }

  @Get('item-type')
  @ApiOperation({ summary: 'Find all items types' })
  @Auth([Role.ADMIN])
  findItemsTypes(): Promise<ItemType[]> {
    return this.cartItemService.findItemsTypes();
  }

  @Post('item-type')
  @ApiOperation({ summary: 'Add item type' })
  @Auth([Role.ADMIN])
  addItemType(@Body() createItemTypeDto: CreateItemTypeDto): Promise<ItemType> {
    return this.cartItemService.addItemType(createItemTypeDto);
  }
}
