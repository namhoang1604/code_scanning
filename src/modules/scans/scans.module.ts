import { forwardRef, Module } from '@nestjs/common';
import { ScansService } from './scans.service';
import { ScansController } from './scans.controller';
import { ScanEventContext } from './contexts/scan-event.context';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScanEvent } from './entities/scan-event.entity';
import { Vulnerability } from './entities/vulnerability.entity';
import { EventQueueModule } from '../../message-queue/event-queue.module';
import { CacheWrapperModule } from '../../cache/cache-wrapper.module';

@Module({
  imports: [
    CacheWrapperModule,
    forwardRef(() => EventQueueModule),
    TypeOrmModule.forFeature([ScanEvent, Vulnerability]),
  ],
  controllers: [ScansController],
  providers: [ScansService, ScanEventContext],
  exports: [ScanEventContext],
})
export class ScansModule {}
