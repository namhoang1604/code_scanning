import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScanRequestDto } from '../dto/create-scan.dto';
import { ScanEvent } from '../entities/scan-event.entity';
import { Vulnerability } from '../entities/vulnerability.entity';

/**
 * The context for scan event entity
 */
@Injectable()
export class ScanEventContext {
  /**
   * The constructor for the scan event context
   *
   * @param scanEventRepository The repository of scan event
   * @param vulnerabilityRepository The repository of vulnerability
   */
  constructor(
    @InjectRepository(ScanEvent)
    private scanEventRepository: Repository<ScanEvent>,
    @InjectRepository(Vulnerability)
    private vulnerabilityRepository: Repository<Vulnerability>,
  ) {}

  /**
   * To create a scan event record
   *
   * @param createScanDto The scan input data
   * @returns The scan event
   */
  create(createScanDto: CreateScanRequestDto): Promise<ScanEvent> {
    return this.scanEventRepository.save({
      ...createScanDto,
      queuedAt: new Date().toISOString(),
    });
  }

  /**
   * To change state from 'queued' to 'processing'
   *
   * @param event The scan event
   */
  async processEvent(event: ScanEvent) {
    await this.update(event, {
      status: 'processing',
      processedAt: new Date().toISOString(),
    });
  }

  /**
   * To change state from 'processing' to 'success'
   *
   * @param event The scan event
   */
  async completeEvent(event: ScanEvent) {
    await this.update(event, {
      status: 'success',
      successAt: new Date().toISOString(),
    });
  }

  /**
   * To change state from 'processing' to 'failed'
   *
   * @param event The scan event
   */
  async markAsFailedEvent(event: ScanEvent) {
    await this.update(event, {
      status: 'failed',
      failedAt: new Date().toISOString(),
    });
  }

  /**
   * To update the change
   *
   * @param event The scan event
   * @param data The change data
   */
  async update(event: ScanEvent, data): Promise<void> {
    await this.scanEventRepository.update(event.id, data);
  }

  /**
   * To fetch the scan event and related vulnerabilities
   *
   * @param uuid The unique id of the scan event
   * @returns The scan event
   */
  findOne(uuid: string): Promise<ScanEvent> {
    return this.scanEventRepository.findOne({
      where: { uuid },
      relations: {
        vulnerabilities: true,
      },
    });
  }

  /**
   * To create a vulnerability
   *
   * @param scanEvent The scan event
   * @param data The vulnerability input data
   * @returns The vulnerability
   */
  createVulnerability(scanEvent: ScanEvent, data): Promise<Vulnerability> {
    return this.vulnerabilityRepository.save({
      ...data,
      scanEvent: scanEvent,
    });
  }
}
