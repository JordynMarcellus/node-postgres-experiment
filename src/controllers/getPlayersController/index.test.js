const { getPlayersController } = require("./");
const { dbConnector } = require("../../db/db");
const sql = require("sql-template-strings");
const mockRow = {
  rows: [
    {
      player_id: "54bba2f0-e09b-40c6-a0ec-99c06c2e639e",
      player_name: "Connor McDavid",
    },
  ],
};

jest.mock("../../db/db.js");

describe("getPlayersController", () => {
  afterEach(() => jest.clearAllMocks());
  it("grabs data from the db ", async () => {
    dbConnector.query = jest.fn().mockResolvedValue(mockRow);
    const mockRes = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const mockReq = {};
    const calledFunction = await getPlayersController(mockReq, mockRes);
    expect(dbConnector.query).toHaveBeenCalled();
    expect(dbConnector.query).toHaveBeenCalledWith(
      sql`SELECT * from public.players WHERE selected = 'false' ORDER BY rating desc LIMIT 25`
    );
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.send).toBeCalledWith(mockRow.rows);
  });
  it("builds a dynamic query from params ", async () => {
    dbConnector.query = jest.fn().mockResolvedValue(mockRow);

    const mockRes = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    const mockReq = { query: { filter: "RD,C,LW", sort: "ASC" } };
    const calledFunction = await getPlayersController(mockReq, mockRes);
    expect(dbConnector.query).toHaveBeenCalled();
    expect(dbConnector.query).toHaveBeenCalledWith(
      sql`SELECT * from public.players WHERE selected = 'false' AND position = ANY('{${[
        "RD",
        "C",
        "LW",
      ]}}') ORDER BY rating ${"asc"} LIMIT 25`
    );
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.send).toBeCalledWith(mockRow.rows);
  });
  //   it('handles errors')
  // optional -- it ('handles empty state')
});
