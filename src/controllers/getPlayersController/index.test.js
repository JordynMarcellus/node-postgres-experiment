const { getPlayersController } = require("./");
const { dbConnector } = require("../../db/db");

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
      "SELECT * from public.players"
    );
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.send).toBeCalledWith(mockRow.rows);
  });
  //   it('handles errors')
  // optional -- it ('handles empty state')
});
