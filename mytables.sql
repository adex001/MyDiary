CREATE TABLE users (
  userId serial PRIMARY KEY,
  username varchar(30) NOT NULL,
  email varchar(80) NOT NULL,
  password varchar(400) NOT NULL,
  sex varchar(10),
  firstname varchar(50),
  lastname varchar(50), 
  timeRegistered TIMESTAMP

)

CREATE TABLE entries (
  entriesId serial PRIMARY KEY,
  entryTitle varchar(30) NOT NULL,
  entry varchar(1000) NOT NULL,
  userId int NOT NULL,
  visibility varchar(10) NOT NULL,
  timeCreated TIMESTAMP NOT NULL,
  timeModified TIMESTAMP

)
CREATE TABLE reminders (
  reminderId serial PRIMARY KEY,
  userId int NOT NULL,
  reminderTime TIMESTAMP ,


)