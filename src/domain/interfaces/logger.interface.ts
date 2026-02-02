export interface ILoggerService {
  log(message: string, ...args: any[]): void;
  error(message: string, error?: string | Error, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
  verbose(message: string, ...args: any[]): void;
}

export interface ILoggerServiceStatic {
  createlogger(context: string): ILoggerService;
}
