// this should probably be a class but we'll
const fs = require("fs").promises;
const path = require("path");
const { parseAsync } = require("json2csv");
// when/if necessary need to use config obj when DRYing it up. let's not worry for now.
const options = { fields: ["name", "position", "team", "rank", "rating"] };
// this goes to an underlying transformed, is from a writeable/readable chunk
// https://nodejs.org/api/stream.html#stream_readable_readablehighwatermark
// https://nodejs.org/api/stream.html#stream_writable_writablehighwatermark
const transformOptions = { highWaterMark: 8192 };

// const output = createWriteStream(__dirname + "/db-seed/test.csv", {
//   encoding: "utf8",
// });

// const asyncParser = new AsyncParser(options, transformOptions);

exports.asyncParseCsv = async jsonData => {
  const csvString = await parseAsync(jsonData, options)
    .then(csv => csv)
    .catch(e => {
      throw e;
    });
  return csvString;
};
exports.asyncWriteCsv = async csvString => {
  //   const workingDirectory = process.cwd();
  //   const writeLocation = path.resolve(
  //     workingDirectory,
  //     `${__dirname}/db-seed/test.csv`
  //   );
  //   console.log(writeLocation);
  try {
    await fs.writeFile("./db-seed/test.csv", csvString, { encoding: "utf-8" });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
