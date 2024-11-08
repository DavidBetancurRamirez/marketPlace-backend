import { CartService } from './cart.service';
import { Role } from 'src/common/enums/rol.enum';
import { UpdateItemDto } from './dto/update-cart.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.interface';
import { Controller, Get, Body, Patch, Post, Delete } from '@nestjs/common';
import { ResponsesSecurity } from 'src/common/decorators/responses-security.decorator';

@ApiTags('cart')
@ResponsesSecurity()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('all')
  @ApiOperation({ summary: 'Find All' })
  @Auth([Role.ADMIN])
  findAll() {
    return this.cartService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Find my cart' })
  @Auth([Role.USER, Role.MODEL])
  findOne(@ActiveUser() userActive: UserActiveInterface) {
    return this.cartService.findMyCart(userActive.email);
  }

  @Post('items/add')
  @ApiOperation({ summary: 'Add item to my cart' })
  @Auth([Role.USER, Role.MODEL])
  addItem(@ActiveUser() userActive: UserActiveInterface, @Body() updateCartDto: UpdateItemDto) {
    return this.cartService.addItem(userActive, updateCartDto);
  }

  @Patch('items/add')
  @ApiOperation({ summary: 'Update item' })
  @Auth([Role.USER, Role.MODEL])
  updateItem(@ActiveUser() userActive: UserActiveInterface, @Body() updateCartDto: UpdateItemDto) {
    return this.cartService.updateItem(userActive, updateCartDto);
  }

  @Delete('items/remove')
  @ApiOperation({ summary: 'Remove item' })
  @Auth([Role.USER, Role.MODEL])
  removeItem(@ActiveUser() userActive: UserActiveInterface, @Body() updateCartDto: UpdateItemDto) {
    return this.cartService.removeItem(userActive, updateCartDto);
  }

  @Delete('')
  @ApiOperation({ summary: 'Clear the cart' })
  @Auth([Role.USER, Role.MODEL])
  clearCart(@ActiveUser() userActive: UserActiveInterface, @Body() updateCartDto: UpdateItemDto) {
    return this.cartService.clearCart(userActive, updateCartDto);
  }
}
