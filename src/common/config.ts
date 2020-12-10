interface Config {
  host: string;
  port: number;
  dbConnectionUrl: string;
}

const config: Config = {
  host: 'localhost',
  port: +process.env.PORT!,
  dbConnectionUrl: process.env.DB_CONNECTION_URL!,
};

export default config;
