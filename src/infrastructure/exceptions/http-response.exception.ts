/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { HttpException as NestHttpException } from '@nestjs/common';
import { HttpResponse } from '../../domain/interfaces';
import { HttpException } from '../../domain/exceptions';

export class HttpResponseException extends NestHttpException {
  constructor(data: HttpResponse<unknown>) {
    super(NestHttpException.createBody(data, data.description, data.status), data.status);
  }
}
