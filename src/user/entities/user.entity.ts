import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/rol.enum';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @OneToOne(() => Cart, cart => cart.user, { eager: true })
  @JoinColumn()
  cart: Cart;

  @Column({ type: 'simple-enum', enum: Role, default: [Role.USER], array: true })
  roles: Role[];

  @DeleteDateColumn({ type: 'timestamp',  select: false })
  deletedAt: Date;
}
