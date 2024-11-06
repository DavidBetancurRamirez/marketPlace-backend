import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryType } from "../types/category.type";
import { ColorType } from "../types/color.type";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  category: CategoryType;

  @Column({ nullable: false })
  color: ColorType;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ default: false })
  featured: boolean;

  @ManyToMany(() => Photo, (photo) => photo.url)
  @JoinTable({
    name: 'product_photos',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'photos_id',
      referencedColumnName: 'id'
    }
  })
  images: Photo[];

  @ManyToOne(() => User, (user) => user.id, {
    eager: true
  })
  created_by: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_update: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt: Date;
}

//? Ejemplo
// _id: "aaaa",
// name: "Brown Eyelash",
// description: "A time-limited purple EyeLash from DIOR",
// price: 300,
// image: "https://www.instyle.es/medio/2018/04/10/3_0a1dd183.jpg",
// category: "Eyelashes",
// color: "Brown",
// date: 147492371832,
// featured: true,