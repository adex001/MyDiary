CREATE TABLE IF NOT EXISTS users (
  userId serial PRIMARY KEY,
  username varchar(50) UNIQUE,
  email varchar(80) UNIQUE,
  password varchar(400),
  sex varchar(10),
  firstname varchar(50),
  lastname varchar(50), 
  timeRegistered TIMESTAMP NOT NULL DEFAULT NOW()

CREATE TABLE IF NOT EXISTS entries (
  entriesId serial PRIMARY KEY,
  entryTitle varchar(50) NOT NULL,
  entry varchar(1000) NOT NULL,
  userId serial REFERENCES users(userId),
  visibility varchar(10) NOT NULL,
  timeCreated TIMESTAMP NOT NULL DEFAULT NOW(),
  timeModified TIMESTAMP
)
CREATE TABLE IF NOT EXISTS reminders (
  reminderId serial PRIMARY KEY,
  userId serial REFERENCES users(userId),
  reminderTime TIMESTAMP 
)