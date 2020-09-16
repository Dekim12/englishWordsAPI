import Application, { AppOptions, AppInterface } from "./app";

const options: AppOptions = {
  host: "localhost",
  port: 8080,
  dbConnectionUrl: process.env.DB_CONNECTION_URL!,
};

const app: AppInterface = new Application(options);

app.run();
