import Application, { AppOptions, AppInterface } from './app';
import config from './common/config';

const options: AppOptions = {
  host: config.host,
  port: config.port,
  dbConnectionUrl: config.dbConnectionUrl,
};

const app: AppInterface = new Application(options);

app.run();
