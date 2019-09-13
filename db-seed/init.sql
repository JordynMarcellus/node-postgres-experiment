CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS players(
  player_id uuid DEFAULT uuid_generate_v4(),
  player_name varchar(45) NOT NULL,
  PRIMARY KEY (player_id)
);

INSERT INTO players (player_name) VALUES ('Connor McDavid');