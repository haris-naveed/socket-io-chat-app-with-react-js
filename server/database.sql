CREATE DATABASE message_db;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    room VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    time VARCHAR(255) NOT NULL
);