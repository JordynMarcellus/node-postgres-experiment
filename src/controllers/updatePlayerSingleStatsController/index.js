const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");

// PUT -- we're straight up replacing the data that's sent to us
/* {
    year: 2019 -> one of "aggregate", "2017", "2018", "2019"
    stats: {
        gp: int
        toi: float
        goalsAgainstReplacementSixty: float
        ...rest
    }
} */

// alternate design: PUT but for a year like /:playerId/stats/aggregate
// alternate design: PUT but for a year like /:playerId/stats/2017
// alternate design: PUT but for a year like /:playerId/stats/2018
// alternate design: PUT but for a year like /:playerId/stats/2019

const getTable = year => {
  switch (year) {
    case "aggregate":
      return "public.aggregateStats";
    case "2017":
      return "public.stats2017";
    case "2018":
      return "public.stats2018";
    case "2019":
      return "public.stats2019";
    default:
      throw new Error("Bad request");
      break;
  }
};

const buildQuery = statsObject => {
  return Object.keys(statsObject).reduce(
    (accumulator, statsObjectKey) => {
      const immutableObject = { ...accumulator };
      console.log(immutableObject);
      immutableObject.keys.push(statsObjectKey);
      immutableObject.values.push(statsObject[statsObjectKey]);
      return immutableObject;
    },
    { values: [], keys: [] }
  );
};

exports.updatePlayerSingleStatsController = async (req, res) => {
  const { body, params } = req;
  const { playerId } = params;
  try {
    const tableToInsert = getTable(req.body.year);
    const query = buildQuery(req.body.stats);
    await dbConnector.query(
      sql`INSERT into public.aggregateStats (id, ${query.keys}) VALUES (${playerId} ${query.values})`
    );
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.msg);
  }
};
