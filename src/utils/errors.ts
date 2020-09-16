export interface ErrorInterface {
  statusCode: number;
  data: Error | string;
}

class Error400 extends Error implements ErrorInterface {
  public statusCode;
  public data;

  constructor(error: Error) {
    super(error.message);

    this.statusCode = 400;
    this.data = error;
  }
}

export const Error400Handler = (err, next): void => next(new Error400(err));
