import { CartItem } from './cart-item.entity';
import { ItemTypeValues } from '../types/item-type.type';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: ItemTypeValues;

  @OneToMany(() => CartItem, (cartItem) => cartItem.itemType)
  cartItems: CartItem[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_update: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;
}
