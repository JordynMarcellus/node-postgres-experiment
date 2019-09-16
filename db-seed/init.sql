CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS players(
  id uuid DEFAULT uuid_generate_v4(),
  name varchar(45) NOT NULL,
  selected boolean DEFAULT false,
  PRIMARY KEY (id)
);

INSERT INTO players (name) VALUES ('Connor McDavid');