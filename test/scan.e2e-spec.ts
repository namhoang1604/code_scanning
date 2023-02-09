import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ViewInterceptor } from '../src/common/interceptors/view.interceptor';

describe('ScanController (e2e)', () => {
  let app: INestApplication;
  const mockData = { repsositoryName: 'test_repo' };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ViewInterceptor(app.get(Reflector)));
    await app.init();
  });

  it('/api/scan (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/scan')
      .send(mockData)
      .expect(201)
      .expect((response: request.Response) => {
        const { statusCode, data } = response.body;
        expect(statusCode).toEqual(201);

        expect(data.repsositoryName).toEqual(mockData.repsositoryName);
        expect(data.uuid).not.toBeNull();
        expect(data.status).toEqual('queued');
        expect(data.queuedAt).not.toBeNull();
      });
  });

  describe('/api/scan/:id (GET)', () => {
    let scanUuid;
    beforeEach(async () => {
      request(app.getHttpServer())
        .post('/api/scan')
        .send(mockData)
        .expect(201)
        .expect((response: request.Response) => {
          const { data } = response.body;
          scanUuid = data.uuid;
        });
    });

    it('Wait 5s, should get status different queued', () => {
      setTimeout(() => {
        request(app.getHttpServer())
          .get(`/api/scan/${scanUuid}`)
          .expect(200)
          .expect((response: request.Response) => {
            const { statusCode, data } = response.body;
            expect(statusCode).toEqual(200);
            expect(data.repsositoryName).toEqual(mockData.repsositoryName);
            expect(data.uuid).toEqual(scanUuid);
            expect(data.status).not.toEqual('queued');
          });
      }, 5000);
    });
  });
});
