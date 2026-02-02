/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { Module } from '@nestjs/common';
import { HttpResponseService } from '../../services/common/http-response.service';

@Module({
  providers: [
    {
      provide: 'IHttpResponseService',
      useClass: HttpResponseService,
    },
  ],
  exports: ['IHttpResponseService'],
})
export class HttpResponseModule {}
