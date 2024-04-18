CREATE TABLE users (
name       text NOT NULL,
email      text NOT NULL,
password   text NOT NULL,
PRIMARY KEY (email)
);

CREATE TABLE taks (
tittle text NOT NULL,
status boolean NOT NULL,
id     SERIAL PRIMARY KEY,
date   date NOT NULL,
user_email  text NOT NULL,
FOREIGN KEY (user_email) REFERENCES users(email)

);

