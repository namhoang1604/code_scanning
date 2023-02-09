import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Base schema define the common fields,
 * All entities should extend from BaseSchema
 */
export abstract class BaseSchema extends BaseEntity {
  /**
   * id is a primary key and automatic increase when insert a new record
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * createdDate is a datetime and generated when insert a new record
   */
  @CreateDateColumn()
  createdDate!: Date;

  /**
   * updatedDate is a datetime and changed when any update happen
   */
  @UpdateDateColumn()
  updatedDate!: Date;
}
