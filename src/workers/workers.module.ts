import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScansModule } from '../modules/scans/scans.module';
import { ScanEventProcessor } from './scan-event.processor';

@Module({
  imports: [HttpModule, ScansModule],
  providers: [ScanEventProcessor],
  exports: [ScanEventProcessor],
})
export class WorkersModule {}
