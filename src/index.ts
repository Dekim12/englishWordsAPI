import Application from './app';

const options = {
  host: 'localhost',
  port: 8080,
  dbConnectionUrl: '',
};

const app = new Application(options);

app.run();
