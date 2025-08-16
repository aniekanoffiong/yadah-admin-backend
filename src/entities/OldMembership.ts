import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../modules/base/base.entity";
import { Department } from "./OldDepartment";
import { IsBoolean, IsDate, IsIn, IsInt, IsOptional, IsString, Length } from "class-validator";

@Entity("memberships")
export class Membership extends BaseEntity {
  @Column()
  @IsString()
  @Length(1, 255)
  memberName!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  departmentId?: number;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: "departmentId" })
  department?: Department;

  @Column()
  @IsString()
  @IsIn(["standard", "premium"])
  membershipType!: string;

  @Column({ type: "date" })
  joinDate!: string;

  @Column({ default: true })
  isActive!: boolean;
}
