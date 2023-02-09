import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

/**
 * The scan services
 */
@Injectable()
export class CacheWrapperService {
  /**
   * The constructor for the scan service
   *
   * @param eventQueueProducer The event producer
   * @param cacheManager The cache mananger
   */
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * To cache the value with the key
   *
   * @param key The string
   * @param value Any value want to cache
   * @param ttl The time to live in millisecond
   */
  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  /**
   * To get the cached value by the key
   *
   * @param key the string
   * @returns The cached value or null
   */
  get<T>(key: string): Promise<T> {
    return this.cacheManager.get(key);
  }

  /**
   * To delete the cache by the key
   *
   * @param key The string
   */
  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  /**
   * To clear all caches
   */
  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  /**
   * To cache the value at the first time, another time it will get the cached value
   *
   * @param key The string
   * @param fn The fetch data function need to wrap up
   * @param ttl The time to live
   * @returns The cached value
   */
  wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
    return this.cacheManager.wrap(key, fn, ttl);
  }
}
