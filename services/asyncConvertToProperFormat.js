const { playerHashMap } = require("../data/playerHashMap");
const csvConvertor = require("csvtojson");
const path = require("path");
const fs = require("fs");
const { parseAsync } = require("json2csv");

const csvPath = path.resolve(process.cwd(), "data/playerG60Aggregate.csv");
const knownOptions = { fields: ["id", "gamesPlayed", "timeOnIce", "garSixty"] };
const unknownOptions = { fields: ["Player"] };

const convert = async () => {
  const csv = csvConvertor();
  try {
    const jsonArray = await csv.fromFile(csvPath);
    const jsonArrayWithIds = jsonArray.reduce(
      (objectWithArrays, currentPlayerObject) => {
        // lowercase, split by periods, join with spaces.
        const transformedPlayerName = currentPlayerObject.Player.toLowerCase()
          .split(".")
          .join(" ");
        const playerId = playerHashMap[transformedPlayerName];
        if (playerId) {
          const object = {
            id: playerId,
            gamesPlayed: currentPlayerObject["GP"],
            timeOnIce: currentPlayerObject["TOI"],
            garSixty: currentPlayerObject["GAR/60"],
          };
          objectWithArrays.known.push(object);
          return objectWithArrays;
        }
        objectWithArrays.unknown.push({ ...currentPlayerObject });
        return objectWithArrays;
      },
      { known: [], unknown: [] }
    );
    const { known, unknown } = jsonArrayWithIds;
    const csvString = await parseAsync(known, knownOptions)
      .then(csv => csv)
      .catch(e => e);
    await fs.writeFile(
      "./db-seed/aggregateStats.csv",
      csvString,
      {
        encoding: "utf-8",
      },
      (err, success) => {
        if (err) throw err;
      }
    );
    const unknownCsvString = await parseAsync(unknown, unknownOptions)
      .then(csv => csv)
      .catch(e => e);
    await fs.writeFile(
      "./unknownPlayers.csv",
      unknownCsvString,
      {
        encoding: "utf-8",
      },
      (err, success) => {
        if (err) throw err;
      }
    );
  } catch (e) {
    console.error(e);
  }
};

convert();
