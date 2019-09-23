const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");
// filter by: position

exports.getPlayersController = async (req, res) => {
  const { query } = req;
  const defaultQuery = sql`SELECT * from public.players`;
  defaultQuery.append(sql` WHERE selected = 'false'`);
  defaultQuery.append(sql` ORDER BY rating desc LIMIT 25`);

  try {
    const { rows } = await dbConnector
      .query(defaultQuery)
      .then(res => res)
      .catch(e => {
        throw e;
      });
    return res.status(200).send(rows);
  } catch (e) {
    console.error("error executing query", e.stack);
    return res.status(500).send();
  }
};
