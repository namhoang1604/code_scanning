import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheWrapperService } from './cache-wrapper.service';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('queue').host,
          port: configService.get('queue').port,
          isGlobal: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [CacheWrapperService],
  exports: [CacheWrapperService],
})
export class CacheWrapperModule {}
