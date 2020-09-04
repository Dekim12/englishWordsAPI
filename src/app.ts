import * as express from 'express';
import { MongoClient } from 'mongodb';

import {wordsRouter} from './routes';

interface AppOptions {
  host: string;
  port: number;
  dbConnectionUrl: string;
}

export default class Application {
  private server: express.Application;
  private serverInstance: any;
  private static dbConnection: MongoClient;

  constructor(private options: AppOptions) {
    this.server = express();
  }

  public static get getDbConnection(): MongoClient {
    return Application.dbConnection;
  }

  private configure(): void {
    this.server.use(express.json());
    this.server.use('/words', wordsRouter);
  }

  private connectToDB(): void {
    const { dbConnectionUrl } = this.options;

    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true })
      .then((client) => {
        console.log('Connected!');
        Application.dbConnection = client.db();
      })
      .catch((err) => console.log(err));
  }

  public run(): void {
    const { host, port } = this.options;

    this.connectToDB();
    this.configure();

    this.serverInstance = this.server.listen(port, host, () => {
      console.log(`server is listening on ${port}`);
    });
  }

  public stop(): void {
    this.serverInstance.close(() => console.log('server was stopped'));
  }
}
