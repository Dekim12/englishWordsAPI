export interface ErrorInterface {
  statusCode: number;
  message: string;
}

class ApplicationError extends Error implements ErrorInterface {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}

export class Error400 extends ApplicationError implements ErrorInterface {
  constructor() {
    super(400, 'Bad request');
  }
}

export class Error401 extends ApplicationError implements ErrorInterface {
  constructor() {
    super(401, 'Unauthorized user');
  }
}

export class Error403 extends ApplicationError implements ErrorInterface {
  constructor() {
    super(403, 'Incorrect login or password');
  }
}

export class Error404 extends ApplicationError implements ErrorInterface {
  constructor(message: string) {
    super(404, message);
  }
}

export class Error500 extends ApplicationError implements ErrorInterface {
  constructor() {
    super(500, 'Internal Server Error');
  }
}
