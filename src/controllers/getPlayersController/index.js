const { dbConnector } = require("../../db/db");

exports.getPlayersController = async (req, res) => {
  try {
    const { rows } = await dbConnector
      .query("SELECT * from public.players")
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
