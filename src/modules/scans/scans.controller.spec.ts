import { getQueueToken } from '@nestjs/bull';
import {
  CACHE_MANAGER,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { EventQueueProducer } from 'src/message-queue/event-queue.producer';
import { repositoryMockFactory } from 'src/mock/repository.mock.factory';
import { queueMock } from 'src/mock/queue.mock';
import { ScanEventContext } from './contexts/scan-event.context';
import { ScanEvent } from './entities/scan-event.entity';
import { Vulnerability } from './entities/vulnerability.entity';
import { ScansController } from './scans.controller';
import { ScansService } from './scans.service';
import { ViewInterceptor } from 'src/common/interceptors/view.interceptor';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { MockType } from 'src/mock/common.mock';
import { Repository } from 'typeorm';
import { CacheWrapperService } from '../../cache/cache-wrapper.service';
import { cacheMock } from '../../mock/cache.mock';

describe('ScansController', () => {
  let app: INestApplication;
  let scanEventRepositoryMock: MockType<Repository<ScanEvent>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScansController],
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

    scanEventRepositoryMock = module.get(getRepositoryToken(ScanEvent));
    cacheMock.get.mockReturnValue(Promise.resolve(null));

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ViewInterceptor(app.get(Reflector)));
    await app.init();
  });

  describe('When call create API', () => {
    describe('And valid data', () => {
      beforeEach(() => {
        const event = plainToInstance(ScanEvent, {
          uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
          repsositoryName: 'test_repo',
          status: 'queued',
          queuedAt: '2023-02-06T14:48:00.000Z',
        });
        scanEventRepositoryMock.save.mockReturnValue(Promise.resolve(event));
      });

      it('Should be success', () => {
        return request(app.getHttpServer())
          .post('/api/scan')
          .send({ repsositoryName: 'test_repo' })
          .expect(201);
      });
    });

    describe('And miss repositoryName', () => {
      it('Should be failed', () => {
        return request(app.getHttpServer())
          .post('/api/scan')
          .send({})
          .expect(400);
      });
    });
  });

  describe('When call get event detail API', () => {
    beforeEach(() => {
      const vulnerability = plainToInstance(Vulnerability, {
        id: 1,
        path: 'root/path',
        line: 1,
      });

      const event = plainToInstance(ScanEvent, {
        uuid: '8426fdcb-6837-4da1-9956-c4864025758c',
        repsositoryName: 'test_repo',
        status: 'queued',
        queuedAt: '2023-02-06T14:48:00.000Z',
        vulnerabilities: [vulnerability],
      });
      scanEventRepositoryMock.findOne.mockReturnValue(Promise.resolve(event));
    });

    it('Should be success', () => {
      return request(app.getHttpServer())
        .get(`/api/scan/8426fdcb-6837-4da1-9956-c4864025758c`)
        .expect(200);
    });
  });
});
