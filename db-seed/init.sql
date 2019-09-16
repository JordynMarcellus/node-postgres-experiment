CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS players(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name varchar(45) NOT NULL,
  selected boolean DEFAULT false,
  position varchar(4) NOT NULL,
  team varchar(4) NOT NULL,
  rank smallint NOT NULL,
  rating real NOT NULL

);

INSERT INTO players (name, position, team, rank, rating) VALUES ('Connor McDavid', 'C', 'EDM', 1, 89.34 );