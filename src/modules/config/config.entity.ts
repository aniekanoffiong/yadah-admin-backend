import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class ConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => ConfigEntity, (item) => item.parentEntity)
  subEntities?: ConfigEntity[];

  @Column({ nullable: true })
  parentEntityId?: number; // Explicit FK column

  @ManyToOne(() => ConfigEntity, (item) => item.parentEntity)
  parentEntity?: ConfigEntity;

  // The field/column name in the target entity, e.g., 'title', 'subtitle'
  @OneToMany(() => ConfigEntityField, (item) => item.configEntity, { eager: true })
  fields!: ConfigEntityField[];

  // The name of the target entity/table this field config applies to, e.g., 'hero', 'event'
  @Index()
  @Column()
  entityName!: string;

  @Column({ default: true })
  multipleOccurrence?: boolean;

  @Column({ nullable: true })
  maxOccurrence?: number;

  @Column({ type: "json" })
  authorizations?: string;
}

@Entity()
export class ConfigEntityField extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ConfigEntity, (item) => item.fields)
  configEntity!: ConfigEntity;

  // The field/column name in the target entity, e.g., 'title', 'subtitle'
  @Column()
  fieldName!: string;

  // Human-friendly label to show in UI, e.g., 'Title', 'Subtitle'
  @Column()
  label!: string;

  // Field type in UI: 'text', 'boolean', 'select', 'number', 'date', etc.
  @Column()
  fieldType!: string;

  // Nullable JSON string with options for the field if type requires it (like dropdown)
  // E.g., JSON.stringify([{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }])
  @Column({ type: 'text', nullable: true })
  optionsJson?: string;

  // Whether this field is editable in the admin UI
  @Column({ default: true })
  editable!: boolean;

  // (Optional) Additional validation rules or metadata as JSON string
  @Column({ type: 'text', nullable: true })
  validationRulesJson?: string;

  // (Optional) Custom styles for rendering the field in UI, stored as JSON string
  @Column({ type: 'text', nullable: true })
  styling?: string;

  // (Optional) Order index for sorting fields in UI
  @Column({ default: 1 })
  displayOrder!: number;

  @Column()
  helpText?: string;

  @Column({ default: false })
  multipleOccurrence?: boolean;
}
