export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DBNAME,
    poolSize: process.env.DATABASE_POOL_SIZE,
  },
  queue: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
