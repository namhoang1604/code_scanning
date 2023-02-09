import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ScanEventProcessor } from '../workers/scan-event.processor';

/**
 * The event consumer for the scan event
 */
@Processor('scan_event')
export class EventQueueConsumer {
  /**
   * The constructor for the scan event consumer
   *
   * @param scanEventProcesor The processor of the scan event
   */
  constructor(private readonly scanEventProcesor: ScanEventProcessor) {}

  /**
   * To demand the job to pass to the processor
   *
   * @param job The job of queue
   * @returns Any data
   */
  @Process()
  async transcode(job: Job<unknown>) {
    await this.scanEventProcesor.process(job.data);
    return 'Done';
  }
}
