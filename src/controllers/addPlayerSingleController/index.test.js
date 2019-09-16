const { addPlayerSingleController } = require("./");
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

const expectedQuery = sql`INSERT 
        into 
        public.players (name)
        VALUES (${"Connor McDavid"})
        RETURNING *`;

jest.mock("../../db/db");

describe("addPlayerSingleController", () => {
  it("successfully inserts into the DB", async () => {
    const mockRes = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const mockReq = {
      body: { name: "Connor McDavid" },
    };
    dbConnector.query = jest.fn().mockResolvedValue(mockRow);
    const calledFunction = await addPlayerSingleController(mockReq, mockRes);
    expect(dbConnector.query).toHaveBeenCalledWith(expectedQuery);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalled();
    expect(mockRes.send).toHaveBeenCalledWith(mockRow.rows);
  });
  it("handles errors gracefully", async () => {
    const mockRes = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    const mockReq = {
      body: { name: "Connor McDavid" },
    };
    const error = new Error("can't find value");
    dbConnector.query = jest.fn().mockRejectedValue(error);
    const calledFunction = await addPlayerSingleController(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
