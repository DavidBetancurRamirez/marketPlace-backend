import { Cart } from './cart.entity';
import { ItemType } from './item-type.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ItemType, (itemType) => itemType.cartItems, { eager: true })
  @JoinColumn()
  itemType: ItemType;

  @ManyToOne(() => Cart, cart => cart.items, { nullable: false, onDelete: 'CASCADE' })
  cart: Cart;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
