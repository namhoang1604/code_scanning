import { getQueueToken } from '@nestjs/bull';
import { TestingModule, Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { queueMock } from 'src/mock/queue.mock';
import { ScanEvent } from 'src/modules/scans/entities/scan-event.entity';
import { EventQueueProducer } from './event-queue.producer';

describe('EventQueueProducer', () => {
  let producer: EventQueueProducer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        EventQueueProducer,
        {
          provide: getQueueToken('scan_event'),
          useValue: queueMock,
        },
      ],
    }).compile();

    producer = module.get<EventQueueProducer>(EventQueueProducer);
    queueMock.add.mockReturnValue(Promise.resolve({}));
  });

  describe('When call addEvent', () => {
    it('should not throw', async () => {
      const data = plainToInstance(ScanEvent, {
        uuid: '87c8dbdf-2610-4dc1-b17e-d963b8e9aa29',
        repsositoryName: 'test_repo',
      });

      await expect(producer.addEvent(data)).resolves.not.toThrow();
    });
  });
});
