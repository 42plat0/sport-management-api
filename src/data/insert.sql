IF DATABASE NOT EXISTS
CREATE DATABASE "sport-management"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    ONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS sports(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    popularityRank INT
);

CREATE TABLE IF NOT EXISTS players(
    id INT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    age INT,
    position VARCHAR(30),
    sport_id INT REFERENCES sports(id)
);

