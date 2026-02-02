/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Module } from '@nestjs/common';
import { HttpResponseModule } from './http-response.module';
import { LoggerModule } from './logger.module';

@Module({
  imports: [HttpResponseModule, LoggerModule],
  exports: [HttpResponseModule, LoggerModule],
})
export class CommonModule {}
