import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ScanEvent } from '../entities/scan-event.entity';

/**
 * The creation scan request dto
 */
export class CreateScanRequestDto {
  /**
   * The repository name
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  repsositoryName!: string;
}

/**
 * The creation scan response dto
 */
export class CreateScanResponseDto {
  /**
   * id is a primary key and automatic increase when insert a new record
   */
  @ApiProperty()
  id: number;

  /**
   * createdDate is a datetime and generated when insert a new record
   */
  @ApiProperty()
  createdDate: Date;

  /**
   * updatedDate is a datetime and changed when any update happen
   */
  @ApiProperty()
  updatedDate: Date;
  /**
   * The unique id, it is exposed to retrieve the scan event and add to the queue
   */
  @ApiProperty()
  uuid: string;

  /**
   * The respository name
   */
  @ApiProperty()
  repsositoryName: string;

  /**
   * The status of the scan event, it should be changed from 'queued' -> 'processing' -> 'success' or 'failed'
   */
  @ApiProperty()
  status: string;

  /**
   * The datetime when set the queued status
   */
  @ApiProperty()
  queuedAt: Date;

  /**
   * The constructor for the dto
   *
   * @param scanEvent The scan event
   */
  constructor(scanEvent: ScanEvent) {
    this.id = scanEvent.id;
    this.createdDate = scanEvent.createdDate;
    this.updatedDate = scanEvent.updatedDate;
    this.uuid = scanEvent.uuid;
    this.repsositoryName = scanEvent.repsositoryName;
    this.status = scanEvent.status;
    this.queuedAt = scanEvent.queuedAt;
  }
}
