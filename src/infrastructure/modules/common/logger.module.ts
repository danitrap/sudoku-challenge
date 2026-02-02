/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Module } from '@nestjs/common';
import { LoggerService } from '../../services/common/logger.service';

@Module({
  providers: [
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
  ],
  exports: ['ILoggerService'],
})
export class LoggerModule {}
