const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

exports.searchForPlayerController = async (req, res) => {
  const { query } = req;
  console.log(query.q);
  try {
    const searchQuery = `${query.q}:*`;
    const response = await dbConnector.query(
      sql`SELECT * from public.players WHERE to_tsvector(name) @@ to_tsquery(${searchQuery}) ORDER BY name asc`
    );
    const { rows } = response;
    return res.status(200).json({ data: rows });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};
