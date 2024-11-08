import { 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany,
  OneToOne, 
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true, eager: true })
  @JoinColumn()
  items: CartItem[];

  @OneToOne(() => User, user => user.cart, { nullable: false, onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_update: Date;
}
