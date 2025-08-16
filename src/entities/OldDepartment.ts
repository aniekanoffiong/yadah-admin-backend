import { Entity, Column } from "typeorm";
import { BaseEntity } from "../modules/base/base.entity";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

@Entity("departments")
export class Department extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 100)
  name!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  manager?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
