// With the nature of this kind of data, to protect against sql injection we'll use sql-template-strings for paramaterized queries like this!

const sql = require("sql-template-strings");

const query = name => {
  return sql`INSERT 
        into 
        public.players (player_name)
        VALUES (${name})`;
};

exports.addPlayerSingleController = async (req, res) => {
  return res.status(500);
};
