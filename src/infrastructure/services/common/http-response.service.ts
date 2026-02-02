import { Injectable } from '@nestjs/common';
import {
  HttpResponseDescriptions,
  HttpResponseMessages,
  HttpResponseTypes,
  HttpResponseTypesCodes,
} from '../../../domain/enums/httpResponse';
import { HttpResponse, IHttpResponseService } from '../../../domain/interfaces';
import { HttpStatus } from '../../../domain/enums';

@Injectable()
export class HttpResponseService implements IHttpResponseService {
  private getMessage(status: number): string {
    return HttpResponseMessages[HttpStatus[status].toString() as keyof typeof HttpResponseMessages];
  }

  private getDescription(status: number): string {
    return HttpResponseDescriptions[HttpStatus[status].toString() as keyof typeof HttpResponseMessages];
  }

  private getType(status: number): string {
    return HttpResponseTypes[
      HttpResponseTypesCodes[Math.floor(status / 100)].toString() as keyof typeof HttpResponseTypes
    ];
  }

  generate<T>(
    status: number,
    data: T,
    message: string = this.getMessage(status),
    description: string = this.getDescription(status)
  ): HttpResponse<T> {
    const response: HttpResponse<T> = {
      type: this.getType(status),
      status: status,
      message: message,
      description: description,
      data: data,
    };

    return response;
  }
}
