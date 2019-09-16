// With the nature of this kind of data, to protect against sql injection we'll use sql-template-strings for paramaterized queries like this!
const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

const addPlayerQuery = name => {
  return sql`INSERT 
        into 
        public.players (player_name)
        VALUES (${name})
        RETURNING *`;
};

exports.addPlayerSingleController = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const dbValue = await dbConnector.query(addPlayerQuery(name));
    console.log(dbValue);
    return res.status(200);
  } catch (e) {
    console.error("error adding new player", e.stack);
    return res.status(500).send();
  }
};
