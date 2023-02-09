import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WorkersModule } from '../workers/workers.module';
import { EventQueueConsumer } from './event-queue.consumer';
import { EventQueueProducer } from './event-queue.producer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scan_event',
    }),
    WorkersModule,
  ],
  controllers: [],
  providers: [EventQueueProducer, EventQueueConsumer],
  exports: [EventQueueProducer],
})
export class EventQueueModule {}
