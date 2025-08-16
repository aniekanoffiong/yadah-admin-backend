import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../modules/base/base.entity";
import { Department } from "./OldDepartment";
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Length } from "class-validator";

@Entity("events")
export class Event extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 255)
  title!: string;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: "timestamptz" })
  startDatetime!: Date;

  @Column({ type: "timestamptz" })
  endDatetime!: Date;

  @Column()
  @IsInt()
  departmentId!: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: "departmentId" })
  department!: Department;

  @Column({ default: false })
  isLivestream!: boolean;

  @Column({ nullable: true })
  @IsOptional()
  location?: string;
}
