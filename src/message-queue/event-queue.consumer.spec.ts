import { HttpModule } from '@nestjs/axios';
import { getQueueToken } from '@nestjs/bull';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from 'bull';
import { queueMock } from 'src/mock/queue.mock';
import { repositoryMockFactory } from 'src/mock/repository.mock.factory';
import { ScanEventContext } from 'src/modules/scans/contexts/scan-event.context';
import { ScanEvent } from 'src/modules/scans/entities/scan-event.entity';
import { Vulnerability } from 'src/modules/scans/entities/vulnerability.entity';
import { ScanEventProcessor } from 'src/workers/scan-event.processor';
import { EventQueueConsumer } from './event-queue.consumer';

describe('EventQueueConsumer', () => {
  let consumer: EventQueueConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        EventQueueConsumer,
        {
          provide: getQueueToken('scan_event'),
          useValue: queueMock,
        },
        ScanEventProcessor,
        {
          provide: getRepositoryToken(ScanEvent),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Vulnerability),
          useFactory: repositoryMockFactory,
        },
        ScanEventContext,
      ],
    }).compile();

    consumer = module.get<EventQueueConsumer>(EventQueueConsumer);
    queueMock.add.mockReturnValue(Promise.resolve({}));
  });

  describe('When trigger transcode function', () => {
    it('Should be success', async () => {
      const job = { data: {} };

      expect(consumer.transcode(job as Job));
    });
  });
});
