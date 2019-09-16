// With the nature of this kind of data, to protect against sql injection we'll use sql-template-strings for paramaterized queries like this!
const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

const addPlayerQuery = name => {
  return sql`INSERT 
        into 
        public.players (name)
        VALUES (${name})
        RETURNING *`;
};

exports.addPlayerSingleController = async (req, res) => {
  try {
    const { name } = req.body;
    const { rows } = await dbConnector.query(addPlayerQuery(name));
    return res.status(201).send(rows);
  } catch (e) {
    console.error("error adding new player", e.stack);
    return res.status(500).send();
  }
};
