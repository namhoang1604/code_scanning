import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/mock/common.mock';
import { plainToInstance } from 'class-transformer';
import { repositoryMockFactory } from 'src/mock/repository.mock.factory';
import { Repository } from 'typeorm';
import { CreateScanRequestDto } from '../dto/create-scan.dto';
import { ScanEvent } from '../entities/scan-event.entity';
import { Vulnerability } from '../entities/vulnerability.entity';
import { ScanEventContext } from './scan-event.context';

describe('ScanEventContext', () => {
  let context: ScanEventContext;
  let scanEventRepositoryMock: MockType<Repository<ScanEvent>>;
  let vulnerabilityRepositoryMock: MockType<Repository<Vulnerability>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        ScanEventContext,
        {
          provide: getRepositoryToken(ScanEvent),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Vulnerability),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    context = module.get<ScanEventContext>(ScanEventContext);
    scanEventRepositoryMock = module.get(getRepositoryToken(ScanEvent));
    vulnerabilityRepositoryMock = module.get(getRepositoryToken(Vulnerability));
  });

  describe('When create menthod is called', () => {
    beforeEach(() => {
      const event = plainToInstance(ScanEvent, {
        repsositoryName: 'test_repo',
      });
      scanEventRepositoryMock.save.mockReturnValue(Promise.resolve(event));
    });

    it('should be return a scan event', async () => {
      const createScanDto = new CreateScanRequestDto();
      createScanDto.repsositoryName = 'test_repo';

      const event = await context.create(createScanDto);
      expect(event instanceof ScanEvent).toBe(true);
    });
  });

  describe('When processEvent menthod is called', () => {
    beforeEach(() => {
      scanEventRepositoryMock.update.mockReturnValue(Promise.resolve({}));
    });

    it('should not throw', async () => {
      const event = plainToInstance(ScanEvent, {
        uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
        repsositoryName: 'test_repo',
        status: 'queued',
        queuedAt: '2023-02-06T14:48:00.000Z',
      });

      await expect(context.processEvent(event)).resolves.not.toThrow();
    });
  });

  describe('When completeEvent menthod is called', () => {
    beforeEach(() => {
      scanEventRepositoryMock.update.mockReturnValue(Promise.resolve({}));
    });

    it('should not throw', async () => {
      const event = plainToInstance(ScanEvent, {
        uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
        repsositoryName: 'test_repo',
        status: 'processing',
        queuedAt: '2023-02-06T14:48:00.000Z',
        processedAt: '2023-02-06T14:50:00.000Z',
      });

      await expect(context.completeEvent(event)).resolves.not.toThrow();
    });
  });

  describe('When markAsFailedEvent menthod is called', () => {
    beforeEach(() => {
      scanEventRepositoryMock.update.mockReturnValue(Promise.resolve({}));
    });

    it('should not throw', async () => {
      const event = plainToInstance(ScanEvent, {
        uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
        repsositoryName: 'test_repo',
        status: 'processing',
        queuedAt: '2023-02-06T14:48:00.000Z',
        processedAt: '2023-02-06T14:50:00.000Z',
      });

      await expect(context.markAsFailedEvent(event)).resolves.not.toThrow();
    });
  });

  describe('When findOne menthod is called', () => {
    describe('And the uuid existing', () => {
      beforeEach(() => {
        const event = plainToInstance(ScanEvent, {
          uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
          repsositoryName: 'test_repo',
        });
        scanEventRepositoryMock.findOne.mockReturnValue(Promise.resolve(event));
      });

      it('should be return a scan event', async () => {
        const event = await context.findOne(
          '8426fdcb-6837-4da1-9956-c4864025758c',
        );
        expect(event instanceof ScanEvent).toBe(true);
      });
    });

    describe('And the uuid not existing', () => {
      beforeEach(() => {
        scanEventRepositoryMock.findOne.mockReturnValue(
          Promise.resolve(undefined),
        );
      });

      it('should be return a scan event', async () => {
        const event = await context.findOne('unknown_uuid');
        expect(event).toBeUndefined();
      });
    });
  });

  describe('When createVulnerability menthod is called', () => {
    beforeEach(() => {
      const event = plainToInstance(ScanEvent, {
        uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
        repsositoryName: 'test_repo',
        status: 'processing',
        queuedAt: '2023-02-06T14:48:00.000Z',
        processedAt: '2023-02-06T14:50:00.000Z',
      });

      const vulnerability = plainToInstance(Vulnerability, {
        id: 1,
        path: 'root/path',
        line: 1,
        scanEvent: event,
      });

      vulnerabilityRepositoryMock.save.mockReturnValue(
        Promise.resolve(vulnerability),
      );
    });

    it('should return Vulnerability entity', async () => {
      const event = plainToInstance(ScanEvent, {
        uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
        repsositoryName: 'test_repo',
        status: 'processing',
        queuedAt: '2023-02-06T14:48:00.000Z',
        processedAt: '2023-02-06T14:50:00.000Z',
      });

      const vulnerability = {
        path: 'root/path',
        line: 1,
      };

      const result = await context.createVulnerability(event, vulnerability);
      expect(result instanceof Vulnerability).toBe(true);
    });
  });
});
