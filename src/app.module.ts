import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import configuration from './configuration';
import { EventQueueModule } from './message-queue/event-queue.module';
import { ScansModule } from './modules/scans/scans.module';
import { CacheWrapperModule } from './cache/cache-wrapper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database').host,
          port: configService.get('database').port,
          username: configService.get('database').username,
          password: configService.get('database').password,
          database: configService.get('database').database,
          poolSize: configService.get('database').poolSize,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('queue').host,
            port: configService.get('queue').port,
          },
        };
      },
      inject: [ConfigService],
    }),
    CacheWrapperModule,
    EventQueueModule,
    ScansModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
