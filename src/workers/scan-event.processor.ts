import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { UtilsService } from '../common/utils.service';
import { ScanEventContext } from '../modules/scans/contexts/scan-event.context';
import { ScanEvent } from '../modules/scans/entities/scan-event.entity';

/**
 * The scan event processor, to proceed the event from queue
 */
@Injectable()
export class ScanEventProcessor {
  /**
   * The utility service
   */
  utilsService: UtilsService;
  /**
   * The constructor for the scan event processor
   *
   * @param scanEventContext The scan event context
   * @param httpService The http service
   */
  constructor(
    @Inject(forwardRef(() => ScanEventContext))
    private readonly scanEventContext: ScanEventContext,
    private readonly httpService: HttpService,
  ) {
    this.utilsService = UtilsService.getInstance();
  }

  /**
   * The process function will scan the repository from the event, then save the result after that
   *
   * @param event The event from queue
   */
  async process(event: any): Promise<void> {
    const scanEvent = await this.scanEventContext.findOne(event.eventId);
    await this.scanEventContext.processEvent(scanEvent);
    const vulnerabilityNum = await this.scan(scanEvent);

    if (vulnerabilityNum > 0) {
      this.scanEventContext.markAsFailedEvent(scanEvent);
    } else {
      this.scanEventContext.completeEvent(scanEvent);
    }
  }

  /**
   * To scan the repository and save the vulnerabilities
   *
   * @param event The scan event entity
   * @returns Number of vulnerabilities
   */
  private async scan(event: ScanEvent): Promise<number> {
    // Sleep to simulate the scanning code process
    await this.utilsService.randomSleep();
    const vulnerabilityNum = this.utilsService.randomInteger(5);

    for (let index = 0; index < vulnerabilityNum; index++) {
      const path = await this.buildPath();
      const line = this.utilsService.randomInteger(2000);
      await this.scanEventContext.createVulnerability(event, { path, line });
    }
    return vulnerabilityNum;
  }

  /**
   * To simulate a file path with the random names
   * @returns A random path
   */
  private async buildPath(): Promise<string> {
    return lastValueFrom(
      this.httpService
        .get('https://names.drycodes.com/10?nameOptions=funnyWords')
        .pipe(map((data) => (data.data as Array<string>).join('/'))),
    );
  }
}
