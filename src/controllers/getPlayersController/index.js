const { dbConnector } = require("../../db/db");

exports.getPlayersController = (req, res) => {
  dbConnector.connect((err, client, release) => {
    // when we add error handling we can poke at this more
    if (err) {
      console.error("error connecting client", err.stack);
      return res.status(500).send();
    }

    client.query("SELECT * from public.players", (err, data) => {
      // db pool requires a release, run it right after query has been made to minimize connections according to docs.
      release();
      if (err) {
        console.error("error executing query", err.stack);
        return res.status(500).send();
      }
      const rowsOfData = data.rows;
      rowsOfData.length === 0
        ? res.status(204).send()
        : res.status(200).send(rowsOfData);
    });
  });
};
