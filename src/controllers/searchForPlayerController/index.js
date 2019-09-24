const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

exports.searchForPlayerController = async (req, res) => {
  const { query } = req;
  try {
    const searchQuery = `${query.q}:*`;
    const { rows } = await dbConnector.query(
      sql`SELECT * from public.players WHERE to_tsvector(name) @@ plainto_tsquery(${searchQuery}) ORDER BY name asc`
    );
    return res.status(200).json(rows);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};
