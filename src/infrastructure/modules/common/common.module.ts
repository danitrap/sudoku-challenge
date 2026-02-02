/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpResponseModule } from './http-response.module';
import { LoggerModule } from './logger.module';

@Module({
  imports: [HttpResponseModule, LoggerModule],
  providers: [
    {
      provide: 'IConfigService',
      useExisting: ConfigService,
    },
  ],
  exports: [HttpResponseModule, LoggerModule, 'IConfigService'],
})
export class CommonModule {}
