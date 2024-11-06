import { Model } from "src/models/entities/model.entity";
import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ nullable: false })
  location: string;

  @ManyToMany(() => Photo, (photo) => photo.url)
  @JoinTable({
    name: 'event_photos',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'photos_id',
      referencedColumnName: 'id'
    }
  })
  images: Photo[];

  @ManyToMany(() => Model, (model) => model.participated_events)
  @JoinTable({
    name: 'event_models',
    joinColumn: {
      name: 'event_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'model_id',
      referencedColumnName: 'id'
    }
  })
  participating_models: Model[];

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
// _id: "111aa",
// name: "Medallo Fashion Week",
// image:
// "https://www.clubcampestre.co/wp-content/uploads/2019/04/Gran_Salon_Llano-800x500_c.jpg",
// date: "2024-09-24",
// location: "Club Social Medellin",
// participating_models: ["1271"],
//! products_showcased: ["aaaa", "baaa"],