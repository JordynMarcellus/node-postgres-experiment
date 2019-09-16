const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

exports.updatePlayerSingle = async (req, res) => {
  const { playerId } = req.params;
  const { selected } = req.body;
  try {
    const dbValue = await dbConnector
      .query(
        sql`UPDATE public.players SET selected = ${selected} WHERE id = ${playerId}`
      )
      .then(res => res)
      .catch(e => {
        throw e;
      });
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};
