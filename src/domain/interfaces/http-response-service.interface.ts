import { HttpResponse } from './http-response.interface';

export interface IHttpResponseService {
  generate<T>(status: number, data: T, message?: string, description?: string): HttpResponse<T>;
}
