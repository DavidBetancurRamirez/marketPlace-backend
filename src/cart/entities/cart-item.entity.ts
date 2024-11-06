import { Entity, Column, ManyToOne, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { ItemType } from '../types/item-type.type';

@Entity()
export class CartItem {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  itemId: number;

  @Column()
  itemType: ItemType;

  @ManyToOne(() => Cart, cart => cart.items, { nullable: false, onDelete: 'CASCADE' })
  cart: Cart;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  addedAt: Date;
}
