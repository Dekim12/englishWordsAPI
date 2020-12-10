import * as express from 'express';
import { Server } from 'http';

import connectToDB from './db';
import { wordsRouter } from './resources';
import { errorHandler, Error404 } from './errors';

export interface AppOptions {
  readonly host: string;
  readonly port: number;
  readonly dbConnectionUrl: string;
}

export interface AppInterface {
  run(): void;
  stop(): void;
}

export default class Application implements AppInterface {
  private server: express.Application;
  private serverInstance: Server;

  constructor(private options: AppOptions) {
    this.server = express();
  }

  private configure(): void {
    this.server.use(express.json());
    this.server.use('/words', wordsRouter);
    this.server.use((req: express.Request, res: express.Response, next: express.NextFunction) =>
      next(new Error404('Incorrect URL!'))
    );

    this.server.use(errorHandler);
  }

  private async startServer(): Promise<void> {
    const { host, port } = this.options;

    this.configure();

    this.serverInstance = this.server.listen(port, host, () => {
      console.log(`Server is listening on ${port}`);
    });
  }

  public run(): void {
    const { dbConnectionUrl } = this.options;

    connectToDB(dbConnectionUrl).then(() => this.startServer());
  }

  public stop(): void {
    this.serverInstance.close(() => {
      console.log('server was stopped');
      process.exit(0);
    });
  }
}
