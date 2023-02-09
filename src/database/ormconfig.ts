require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * Data source of postgres from the environment
 */
const dataSource = {
  host: process.env.DATABASE_HOST as string,
  port: +(process.env.DATABASE_PORT as string),
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  poolSize: +(process.env.DATABASE_POOL_SIZE as string),
  type: 'postgres',
  entities: [],
  synchronize: false,
  logging: false,
  migrations: [`${__dirname}/migrations/*.ts`],
};

/**
 * Declare the data source
 */
export default new DataSource(dataSource as DataSourceOptions);
