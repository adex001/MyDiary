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
  userId serial PRIMARY KEY,
  username varchar(50),
  email varchar(80),
  password varchar(400),
  sex varchar(10),
  firstname varchar(50),
  lastname varchar(50), 
  timeRegistered TIMESTAMP

)`;

const createTableEntries = `CREATE TABLE IF NOT EXISTS entries (
  entriesId serial PRIMARY KEY,
  entryTitle varchar(50) NOT NULL,
  entry varchar(1000) NOT NULL,
  userId int,
  visibility varchar(10) NOT NULL,
  timeCreated varchar(30),
  timeModified varchar(30)
)`;
// eslint-disable-next-line
pool.query(`${createTableUsers}; ${createTableEntries};`, (err, response) => {

  if (err) {
    // eslint-disable-next-line
    return console.error('Users and Entries Table cannot be created');
  }
  console.log('Users and Entries Table Created!!');
});

export default pool;
