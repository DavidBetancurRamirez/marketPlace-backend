import { Event } from "src/events/entities/event.entity";
import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Model extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Photo, (photo) => photo.url)
  @JoinTable({
    name: 'model_photos',
    joinColumn: {
      name: 'model_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'photos_id',
      referencedColumnName: 'id'
    }
  })
  images: Photo[];

  @ManyToMany(() => Event, (evento) => evento.participating_models)
  participated_events: Event[];

  @Column('text', { array: true, default: '{}' })
  achievements: string[];
}

//? Ejemplo
// _id: "1111",
// name: "Sofia",
// portfolio:
//   "https://img.freepik.com/fotos-premium/modelos-femeninas-hacen-pose-impresionante-portada-revista-alta-costura_563241-7214.jpg",
// booking_info: "Available",
// achievements: ["Magazine and TV model"],