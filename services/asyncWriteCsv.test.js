const fs = require("fs");
const { asyncParseCsv } = require("./asyncWriteCsv");
const mockData = {
  name: "Connor McDavid",
  position: "C",
  team: "EDM",
  rank: 1,
  rating: 89.34,
};
jest.mock("fs");

describe("asyncWriteCsv", () => {
  it("works as expected", async () => {
    const result = await asyncParseCsv([mockData]);
    expect(result).toMatchSnapshot();
  });
});
