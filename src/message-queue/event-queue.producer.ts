import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EventInterface } from './interfaces/event.interface';
import { ScanEvent } from '../modules/scans/entities/scan-event.entity';

/**
 * The event producer for the scan event
 */
@Injectable()
export class EventQueueProducer {
  /**
   * The constructor for the scan event producer
   *
   * @param eventQueue The queue
   */
  constructor(@InjectQueue('scan_event') private eventQueue: Queue) {}

  /**
   * To add an event to queue
   *
   * @param data The event data
   * @returns The queue job
   */
  addEvent(data: ScanEvent) {
    const event = this.buildEvent(data);
    return this.eventQueue.add(event, { removeOnComplete: true });
  }

  /**
   * To build an event for raw data
   *
   * @param data The event data
   * @returns The constructed event data
   */
  private buildEvent(data: ScanEvent): EventInterface {
    const event: EventInterface = {
      eventId: data.uuid,
      repsositoryName: data.repsositoryName,
      action: 'scan',
    };
    return event;
  }
}
