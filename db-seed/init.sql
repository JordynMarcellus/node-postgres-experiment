CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS players(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name varchar(45) NOT NULL,
  selected boolean DEFAULT false,
  position varchar(4) NOT NULL,
  team varchar(50) NOT NULL,
  rank smallint NOT NULL,
  rating numeric NOT NULL
);

CREATE TABLE IF NOT EXISTS aggregateStats(
  gamesPlayed numeric,
  timeOnIce numeric,
  garSixty numeric NOT NULL,
  goalsForPercentage numeric,
  pdo numeric,
  individualExpectedGoalsFor numeric,
  playerId uuid references players(id)
);

CREATE TABLE IF NOT EXISTS stats2017(
  gamesPlayed numeric,
  timeOnIce numeric,
  garSixty numeric NOT NULL,
  goalsForPercentage numeric,
  pdo numeric,
  individualExpectedGoalsFor numeric,
  playerId uuid references players(id)
);

CREATE TABLE IF NOT EXISTS stats2018(
  gamesPlayed numeric,
  timeOnIce numeric,
  garSixty numeric NOT NULL,
  goalsForPercentage numeric,
  pdo numeric,
  individualExpectedGoalsFor numeric,
  playerId uuid references players(id)
);

CREATE TABLE IF NOT EXISTS stats2019(
  gamesPlayed numeric,
  timeOnIce numeric,
  garSixty numeric NOT NULL,
  goalsForPercentage numeric,
  pdo numeric,
  individualExpectedGoalsFor numeric,
  playerId uuid references players(id)
);

COPY public.players(name, position, team, rank, rating)
FROM '/docker-entrypoint-initdb.d/test.csv' DELIMITER ',' CSV HEADER;