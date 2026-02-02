export class HttpException extends Error {
  constructor(public readonly status: number, public readonly description: string) {
    super(description);
  }
}
