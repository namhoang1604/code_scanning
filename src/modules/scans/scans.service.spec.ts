import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventQueueProducer } from 'src/message-queue/event-queue.producer';
import { MockType } from 'src/mock/common.mock';
import { repositoryMockFactory } from 'src/mock/repository.mock.factory';
import { queueMock } from 'src/mock/queue.mock';
import { Repository } from 'typeorm';
import { ScanEventContext } from './contexts/scan-event.context';
import { CreateScanRequestDto } from './dto/create-scan.dto';
import { ScanEvent } from './entities/scan-event.entity';
import { Vulnerability } from './entities/vulnerability.entity';
import { ScansService } from './scans.service';
import { CacheWrapperService } from '../../cache/cache-wrapper.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { cacheMock } from '../../mock/cache.mock';

describe('ScansService', () => {
  let service: ScansService;
  let scanEventRepositoryMock: MockType<Repository<ScanEvent>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ScansService,
        {
          provide: getRepositoryToken(ScanEvent),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Vulnerability),
          useValue: {},
        },
        {
          provide: getQueueToken('scan_event'),
          useValue: queueMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock,
        },
        ScanEventContext,
        EventQueueProducer,
        CacheWrapperService,
      ],
    }).compile();

    service = module.get<ScansService>(ScansService);
    scanEventRepositoryMock = module.get(getRepositoryToken(ScanEvent));
  });

  describe('Trigger scan', () => {
    beforeEach(() => {
      const event = new ScanEvent();
      scanEventRepositoryMock.save.mockReturnValue(Promise.resolve(event));
    });

    it('should return ScanEvent entity', async () => {
      const createScanDto = new CreateScanRequestDto();
      createScanDto.repsositoryName = 'test_repo';

      const event = await service.create(createScanDto);
      expect(event instanceof ScanEvent).toBe(true);
    });
  });

  describe('Get a scan event by uuid', () => {
    beforeEach(() => {
      const event = new ScanEvent();
      event.uuid = 'existing_id';
      scanEventRepositoryMock.findOne.mockReturnValue(Promise.resolve(event));
    });

    describe('And the uuid is existing', () => {
      describe('And not cached yet', () => {
        beforeEach(() => {
          const event = new ScanEvent();
          event.status = 'success';
          event.uuid = 'existing_id';
          scanEventRepositoryMock.findOne.mockReturnValue(
            Promise.resolve(event),
          );
          cacheMock.get.mockReturnValue(Promise.resolve(null));
        });
        it('should return success ScanEvent', async () => {
          const event = await service.findOne('existing_id');
          expect(event.status).toEqual('success');
        });
      });

      describe('And cached before', () => {
        beforeEach(() => {
          const event = new ScanEvent();
          event.status = 'success';
          event.uuid = 'existing_id';
          cacheMock.get.mockReturnValue(Promise.resolve(event));
        });
        it('should return success ScanEvent from cache', async () => {
          const event = await service.findOne('existing_id');
          expect(event.status).toEqual('success');
        });
      });
    });

    describe('And the uuid is not existing', () => {
      beforeEach(() => {
        scanEventRepositoryMock.findOne.mockReturnValue(
          Promise.resolve(undefined),
        );
        cacheMock.get.mockReturnValue(Promise.resolve(null));
      });

      it('should return undefined', async () => {
        const event = await service.findOne('unknown_uuid');
        expect(event).toBeUndefined;
      });
    });
  });
});
