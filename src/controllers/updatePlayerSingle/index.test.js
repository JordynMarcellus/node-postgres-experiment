const { dbConnector } = require("../../db/db");
const { updatePlayerSingle } = require("./");
const sql = require("sql-template-strings");

jest.mock("../../db/db");

// next up we'll use query factory functions to
const expectedQuery = sql`UPDATE public.players SET selected = ${true} WHERE id = ${"unique-identifier"}`;

describe("updatePlayerSingle", () => {
  it("successfully updates the db", async () => {
    const mockRes = {
      send: jest.fn(),
      sendStatus: jest.fn().mockReturnThis(),
    };
    const mockReq = {
      body: {
        selected: true,
      },
      params: { playerId: "unique-identifier" },
    };
    dbConnector.query = jest.fn().mockResolvedValue(true);
    await updatePlayerSingle(mockReq, mockRes);
    expect(dbConnector.query).toBeCalledWith(expectedQuery);
    expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
  });
});
