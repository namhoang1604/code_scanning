import { CACHE_MANAGER } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { cacheMock } from '../mock/cache.mock';
import { CacheWrapperService } from './cache-wrapper.service';

describe('CacheWrapperService', () => {
  let cacheService: CacheWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CacheWrapperService,
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock,
        },
      ],
    }).compile();

    cacheService = module.get<CacheWrapperService>(CacheWrapperService);
    cacheMock.get.mockReturnValue(Promise.resolve(null));
    cacheMock.set.mockRestore();
    cacheMock.reset.mockRestore();
    cacheMock.del.mockRestore();
    cacheMock.wrap.mockReturnValue(Promise.resolve(null));
  });

  describe('When call set menthod', () => {
    it('should not throw', async () => {
      await expect(cacheService.set('key', 'value')).resolves.not.toThrow();
    });
  });

  describe('When call get menthod', () => {
    it('should not throw', async () => {
      await expect(cacheService.get('key')).resolves.not.toThrow();
    });
  });

  describe('When call reset menthod', () => {
    it('should not throw', async () => {
      await expect(cacheService.reset()).resolves.not.toThrow();
    });
  });

  describe('When call del menthod', () => {
    it('should not throw', async () => {
      await expect(cacheService.del('key')).resolves.not.toThrow();
    });
  });
  describe('When call wrap menthod', () => {
    it('should not throw', async () => {
      await expect(
        cacheService.wrap('key', () => Promise.resolve(null)),
      ).resolves.not.toThrow();
    });
  });
});
