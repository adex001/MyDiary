import pg from 'pg';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

// Create configurations for database
const dataConfig = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const testConfig = {
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_HOST_TEST,
  user: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  port: process.env.DB_PORT_TEST,
};

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(testConfig) : new pg.Pool(dataConfig);

export default pool;
