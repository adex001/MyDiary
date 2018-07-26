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

const createTableUsers = `CREATE TABLE IF NOT EXISTS users (
  userId INTEGER PRIMARY KEY,
  username varchar(30) NOT NULL,
  email varchar(80) NOT NULL,
  password varchar(400) NOT NULL,
  sex varchar(10),
  firstname varchar(50),
  lastname varchar(50), 
  timeRegistered TIMESTAMP

)`;

pool.query(createTableUsers, (err, response) => {
  // eslint-disable-next-line
  console.log(response);
  if (err) {
    // eslint-disable-next-line
    console.error(err);
  }
});
pool.end();
export default pool;
