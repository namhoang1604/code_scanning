import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/mock/common.mock';
import { repositoryMockFactory } from 'src/mock/repository.mock.factory';
import { ScanEventContext } from 'src/modules/scans/contexts/scan-event.context';
import { ScanEvent } from 'src/modules/scans/entities/scan-event.entity';
import { Vulnerability } from 'src/modules/scans/entities/vulnerability.entity';
import { Repository } from 'typeorm';
import { ScanEventProcessor } from './scan-event.processor';

describe('ScanEventProcessor', () => {
  let processor: ScanEventProcessor;
  let scanEventRepositoryMock: MockType<Repository<ScanEvent>>;
  let vulnerabilityRepositoryMock: MockType<Repository<Vulnerability>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
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

    processor = module.get<ScanEventProcessor>(ScanEventProcessor);
    scanEventRepositoryMock = module.get(getRepositoryToken(ScanEvent));
    vulnerabilityRepositoryMock = module.get(getRepositoryToken(Vulnerability));
  });

  describe('When call process method', () => {
    beforeEach(() => {
      const event = new ScanEvent();
      scanEventRepositoryMock.save.mockReturnValue(Promise.resolve(event));
      scanEventRepositoryMock.update.mockReturnValue(Promise.resolve({}));
      scanEventRepositoryMock.findOne.mockReturnValue(Promise.resolve(event));

      const vulnerability = new Vulnerability();
      vulnerabilityRepositoryMock.save.mockReturnValue(
        Promise.resolve(vulnerability),
      );
      vulnerabilityRepositoryMock.update.mockReturnValue(Promise.resolve({}));
      vulnerabilityRepositoryMock.findOne.mockReturnValue(
        Promise.resolve(vulnerability),
      );
    });

    jest.setTimeout(30000);
    it('should not throw', async () => {
      const event = {
        eventId: '87c8dbdf-2610-4dc1-b17e-d963b8e9aa29',
        repsositoryName: 'test_repo',
        action: 'scan',
      };
      await expect(processor.process(event)).resolves.not.toThrow();
    });

    describe('And no vulnerability found', () => {
      beforeEach(() => {
        processor.utilsService.randomInteger = () => 0;
      });
      it('should not throw', async () => {
        const event = {
          eventId: '87c8dbdf-2610-4dc1-b17e-d963b8e9aa29',
          repsositoryName: 'test_repo',
          action: 'scan',
        };
        await expect(processor.process(event)).resolves.not.toThrow();
      });
    });

    describe('And has some vulnerabilities found', () => {
      beforeEach(() => {
        processor.utilsService.randomInteger = () => 3;
      });
      it('should not throw', async () => {
        const event = {
          eventId: '87c8dbdf-2610-4dc1-b17e-d963b8e9aa29',
          repsositoryName: 'test_repo',
          action: 'scan',
        };
        await expect(processor.process(event)).resolves.not.toThrow();
      });
    });
  });
});
