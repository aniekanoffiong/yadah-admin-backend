import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GrowInFaith {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('text', { nullable: true })
  secondDescription?: string;

  @Column()
  image!: string;

  @Column()
  buttonText!: string;

  @Column()
  buttonLink!: string;
}
