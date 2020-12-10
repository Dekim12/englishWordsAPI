import { Request, Response, NextFunction } from 'express';

import { Error500, ErrorInterface } from '../errors';

const errorHandler = (err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message }: ErrorInterface = err?.statusCode ? err : new Error500();

  res.status(statusCode).json({ success: false, message });
};

process
  .on('uncaughtException', (err) => {
    console.error('\nUncaught Exception: ', err, '\n');

    process.exit(1);
  })
  .on('unhandledRejection', (reason, promise) =>
    console.error('\nUnhandled Rejection at:', promise, 'reason:', reason, '\n')
  );

export default errorHandler;
