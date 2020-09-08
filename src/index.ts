import Application from "./app";

const options = {
  host: "localhost",
  port: 8080,
  dbConnectionUrl: process.env.DB_CONNECTION_URL!,
};

const app = new Application(options);

app.run();
