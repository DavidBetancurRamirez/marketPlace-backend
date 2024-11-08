import { Cart } from './cart.entity';
import { ItemType } from './item-type.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items, { nullable: false, onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => ItemType, (itemType) => itemType.cartItems)
  @JoinColumn()
  itemType: ItemType;

  @Column()
  itemId: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
