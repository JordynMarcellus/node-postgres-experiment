const { dbConnector } = require("../../db/db");

exports.getPlayersController = (req, res) => {
  dbConnector.connect((err, client, release) => {
    // when we add error handling we can poke at this more
    if (err) {
      return console.error("error connecting client", err.stack);
    }

    client.query("SELECT * from public.players", (err, data) => {
      release();
      if (err) {
        //
        console.error("error executing query", err.stack);
        return res.status(400).send();
      }
      const rowsOfData = data.rows;
      console.log(rowsOfData);
      rowsOfData.length === 0
        ? res.status(204).send()
        : res.status(200).send(rowsOfData);
    });
  });
};
