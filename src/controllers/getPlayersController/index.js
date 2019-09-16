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
  // const dbResponse = dbConnector.query("SELECT * from public.players") (err, data) => {
  //   console.log("wave");
  //   console.log;
  //   // db pool requires a release, run it right after query has been made to minimize connections according to docs.
  //   release();
  //   if (err) {
  //     console.error("error executing query", err.stack);
  //     return res.status(500).send();
  //   }
  //   const rowsOfData = data.rows;
  //   rowsOfData.length === 0
  //     ? res.status(204).send()
  //     : res.status(200).send(rowsOfData);
  // });
};
