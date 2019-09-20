const puppeteer = require("puppeteer");
const { asyncParseCsv, asyncWriteCsv } = require("../services/asyncWriteCsv");
const URL =
  "https://www.corsicahockey.com/nhl/players/nhl-player-ratings-rankings";
const WAIT_OPTIONS = { waitUntil: "networkidle2" };
const teamMap = require("./teamMap");
const grabTextContent = node => node.textContent;

const PLAYER_NAME_INDEX = 0;
const PLAYER_TEAM_INDEX = 1;
const PLAYER_POSITION_INDEX = 2;
const PLAYER_RATING_INDEX = 3;
const PLAYER_RANK_INDEX = 4;

const getDataFromTableRows = async tableRows => {
  const data = Promise.all(
    tableRows.map(async element => {
      const playerName = await element.$$eval("td", rowOfTableCells =>
        rowOfTableCells.map(node => node.textContent)
      );
      return playerName;
    })
  );
  return data;
};
// Additional improvements: using readable streams to throw it to csv parsing/writing right away...
// Would be MUCH better for memory
(async () => {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const browserPage = await browser.newPage();
    await browserPage.goto(URL);
    await browserPage.click('a[data-position="skaters"]');
    await browserPage.waitFor(1000 * 10);
    await browserPage.select("select#filter_limits_select", "4000");
    // i am being lazy with my scraper - ten seconds to load data then we'll traverse the tables rows.
    await browserPage.waitFor(1000 * 10);
    const forwardTableRows = await browserPage.$$(
      ".player-ratings-table.frozen-table tbody > tr"
    );
    // have skaters ✅
    const skaters = await getDataFromTableRows(forwardTableRows);
    const skatersArray = skaters.map(skater => ({
      name: skater[PLAYER_NAME_INDEX],
      position: skater[PLAYER_POSITION_INDEX],
      team: teamMap[skater[PLAYER_TEAM_INDEX]],
      rank: skater[PLAYER_RANK_INDEX],
      rating: skater[PLAYER_RATING_INDEX],
    }));
    const csvString = await asyncParseCsv(skatersArray);
    await asyncWriteCsv(csvString);
    console.log("DONE");
  } catch (e) {
    console.error("shutting down due to", e.message);
    console.error(e.stack);
  } finally {
    console.log("closing...");
    browser.close();
  }
})();
