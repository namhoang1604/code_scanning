import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseSchema } from '../../../common/base-schema.entity';
import { Vulnerability } from './vulnerability.entity';

/**
 * The scan event entity
 */
@Entity({ name: 'scan_events' })
export class ScanEvent extends BaseSchema {
  /**
   * The unique id, it is exposed to retrieve the scan event and add to the queue
   */
  @Index()
  @Column({ generated: 'uuid' })
  uuid!: string;

  /**
   * The respository name
   */
  @Column()
  repsositoryName!: string;

  /**
   * The status of the scan event, it should be changed from 'queued' -> 'processing' -> 'success' or 'failed'
   */
  @Column({
    enum: ['queued', 'processing', 'success', 'failed'],
    default: 'queued',
  })
  status!: string;

  /**
   * The datetime when set the queued status
   */
  @Column()
  queuedAt?: Date;

  /**
   * The datetime when set the processing status
   */
  @Column({ nullable: true })
  processedAt?: Date;

  /**
   * The datetime when set the success status
   */
  @Column({ nullable: true })
  successAt?: Date;

  /**
   * The datetime when set the failed status
   */
  @Column({ nullable: true })
  failedAt?: Date;

  /**
   * The vulnerabilities found when scan the repository
   */
  @OneToMany(() => Vulnerability, (vulnerability) => vulnerability.scanEvent)
  vulnerabilities: Vulnerability[];
}
