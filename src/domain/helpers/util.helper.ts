/* eslint-disable @typescript-eslint/ban-types */
/**
 * Author Moeid Heidari
 * Date 17 May 2022
 */
import { validate } from 'class-validator';
import { HttpException } from '../exceptions';
import { ILoggerService, IHttpResponseService } from '../interfaces';
import { HttpStatus } from '../enums';

interface MicroserviceError {
  response: {
    _body?: {
      data?: unknown;
      message?: string;
      description?: string;
    };
    data?: unknown;
    statusCode?: number;
    message?: string;
    description?: string;
  };
}

//==================================================================================================
/**
 * processes http error that was throwed by service
 * @param error error (exception or string)
 * @param logger logger service
 */
interface ErrorBody {
  data?: unknown;
  message?: string;
  description?: string;
}

export function processMicroserviceHttpError(error: MicroserviceError | Error | string, logger: ILoggerService) {
  let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  let message: string | undefined = undefined;
  let description: string | undefined = undefined;
  let data: unknown = {};
  let body: unknown = {};

  if (typeof error === 'object' && 'response' in error && error.response) {
    if ('_body' in error.response) body = error.response._body;
    if ('data' in error.response) body = error.response;
    if ('statusCode' in error.response && error.response.statusCode) statusCode = error.response.statusCode;
    if (typeof body === 'object' && body && 'data' in body) data = (body as ErrorBody).data;
    if (typeof body === 'object' && body && 'message' in body) message = (body as ErrorBody).message;
    if (typeof body === 'object' && body && 'description' in body) description = (body as ErrorBody).description;
    return { statusCode, message, description, data };
  }

  if (typeof error == 'string') logger.error(error);

  if (error instanceof Error) logger.error(error.message, error);

  return { statusCode, message, description, data };
}

//==================================================================================================
/**
 * processes http error that was throwed by service
 * @param error error (exception or string)
 * @param logger logger service
 */
export function processHttpError(error: HttpException | Error | string, logger: ILoggerService) {
  if (error instanceof HttpException) throw error;

  if (typeof error == 'string') logger.error(error);

  if (error instanceof Error) logger.error(error.message, error);
}

//==================================================================================================
/**
 * validates dto and returns bad request if it is wrong
 * @param dto dto
 * @param httpResponseGenerator http response service
 */
export async function validateDTO(dto: object): Promise<void> {
  const errors = await validate(dto);

  if (errors.length) throw new HttpException(HttpStatus.BAD_REQUEST, errors.toString());
}

//==================================================================================================
/**
 * validates output dto and throws an error if it is wrong
 * @param dto dto
 * @param logger logger service
 */
export async function validateOutputDTO(dto: object, logger: ILoggerService): Promise<object> {
  const errors = await validate(dto);

  if (errors.length) {
    for (const i in errors) {
      logger.error(String(errors[i]));
    }
  }

  return dto;
}

//==================================================================================================
