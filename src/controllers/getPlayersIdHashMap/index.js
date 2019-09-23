const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

exports.getPlayersIdHashMapController = async (req, res) => {
  const defaultQuery = sql`SELECT * from public.players ORDER BY name`;
  try {
    const { rows } = await dbConnector
      .query(defaultQuery)
      .then(res => res)
      .catch(e => {
        throw e;
      });
    const responseObj = {};
    rows.forEach(row => {
      responseObj[row.name.toLowerCase()] = row.id;
    });
    return res.status(200).send(responseObj);
  } catch (e) {
    console.error("error executing query", e.stack);
    return res.status(500).send();
  }
};
