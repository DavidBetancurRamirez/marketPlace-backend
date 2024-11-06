import { User } from "src/user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

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
// _id: "1122",
// title: "Robot kiss",
// image:
// "https://static01.nyt.com/images/2023/03/09/multimedia/09MISSED-MOMENTS-coperni-khtl/09MISSED-MOMENTS-coperni-khtl-threeByTwoMediumAt2X.jpg?quality=75&auto=webp",
// price: 90,
// category: "Model",
// format: ["Digital dowload", "Physical print"],