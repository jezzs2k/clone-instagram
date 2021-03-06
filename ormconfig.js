const rootDir = process.env.APP_ENV == 'dev' ? 'src' : 'build';

module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  insecureAuth: true,
  synchronize: true,
  logging: false,
  entities: [rootDir + '/entity/index.{js,ts}'],
  migrations: [rootDir + '/migration/**/*.{js,ts}'],
  subscribers: [rootDir + '/subscriber/**/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
