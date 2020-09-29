import * as express from "express";
import { Server } from "http";
import { MongoClient, Db } from "mongodb";
import * as passport from "passport";

import initPassport from "./auth/passport";
import { wordsRouter, authRouter } from "./routes";

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
  private static dbConnection: Db;

  constructor(private options: AppOptions) {
    this.server = express();
  }

  public static get getDbConnection(): Db {
    return Application.dbConnection;
  }

  private configure(): void {
    initPassport(passport);
    this.server.use(passport.initialize());

    this.server.use(express.json());
    this.server.use("/user", authRouter);
    this.server.use("/words", wordsRouter);

    this.server.get(
      "/user/protected",
      passport.authenticate("jwt", { session: false }, (req, res, next) =>
        res.status(200).json({ message: "Passport works" })
      )
    );

    this.server.use((err, req, res, next) => {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.data);
      } else {
        res.send(err);
      }
    });
  }

  private async connectToDB(): Promise<void> {
    const { dbConnectionUrl } = this.options;

    try {
      const client: MongoClient = await MongoClient.connect(dbConnectionUrl, {
        useUnifiedTopology: true,
      });

      Application.dbConnection = client.db();
      console.log("Connect!");
    } catch (err) {
      console.log("DB connection error!", err);
    }
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
    this.serverInstance.close(() => console.log("server was stopped"));
  }
}
