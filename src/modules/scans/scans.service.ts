import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CacheWrapperService } from '../../cache/cache-wrapper.service';
import { longTtl } from '../../common/constants';
import { EventQueueProducer } from '../../message-queue/event-queue.producer';
import { ScanEventContext } from './contexts/scan-event.context';
import { CreateScanRequestDto } from './dto/create-scan.dto';
import { ScanEvent } from './entities/scan-event.entity';

/**
 * The scan services
 */
@Injectable()
export class ScansService {
  /**
   * The constructor for the scan service
   *
   * @param eventQueueProducer The event producer
   * @param scanEventContext The event context
   */
  constructor(
    @Inject(forwardRef(() => EventQueueProducer))
    private readonly eventQueueProducer: EventQueueProducer,
    private readonly scanEventContext: ScanEventContext,
    private readonly cacheWrapperService: CacheWrapperService,
  ) {}

  /**
   * To create and trigger scan for the repository
   *
   * @param createScanDto The creation scan dto
   * @returns The scan event
   */
  async create(createScanDto: CreateScanRequestDto) {
    const event = await this.scanEventContext.create(createScanDto);
    this.eventQueueProducer.addEvent(event);
    return event;
  }

  /**
   * To fetch the detail scan
   *
   * @param id The unique id of the scan event
   * @returns The scan event
   */
  async findOne(id: string) {
    let scanEvent = await this.cacheWrapperService.get<ScanEvent>(
      `scanEven_${id}`,
    );

    if (!scanEvent) {
      scanEvent = await this.scanEventContext.findOne(id);
      if (
        scanEvent &&
        (scanEvent.status === 'success' || scanEvent.status === 'failed')
      ) {
        this.cacheWrapperService.set(`scanEven_${id}`, scanEvent, longTtl);
      }
      return scanEvent;
    }
    return scanEvent;
  }
}
