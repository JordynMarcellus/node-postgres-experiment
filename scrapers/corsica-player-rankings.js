const puppeteer = require("puppeteer");
const URL =
  "https://www.corsicahockey.com/nhl/players/nhl-player-ratings-rankings";
const WAIT_OPTIONS = { waitUntil: "networkidle2" };

const grabTextContent = node => node.textContent;

const PLAYER_NAME = 0;
const PLAYER_POSITION = 2;
const PLAYER_RATING = 3;
const PLAYER_RANKING = 4;

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

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const browserPage = await browser.newPage();
    await browserPage.goto(URL);
    await browserPage.click('a[data-position="forwards"]');
    await browserPage.waitFor(1000 * 10);
    await browserPage.select("select#filter_limits_select", "4000");
    // i am being lazy with my scraper - ten seconds to load data then we'll traverse the tables rows.
    await browserPage.waitFor(1000 * 10);
    const forwardTableRows = await browserPage.$$(
      ".player-ratings-table.frozen-table tbody > tr"
    );
    // have forwards ✅
    const forwards = await getDataFromTableRows(forwardTableRows);
    console.log(forwards);
    await browserPage.click('a[data-position="defence"]');
    await browserPage.waitFor(1000 * 10);
    const defenceTableRows = await browserPage.$$(
      ".player-ratings-table.frozen-table tbody > tr"
    );
    const defence = await getDataFromTableRows(defenceTableRows);
    console.log(defence);
    // we have data, so let's create some data
  } catch (e) {
    console.error("shutting down due to", e.message);
    console.error(e.stack);
  } finally {
    console.log("closing...");
    browser.close();
    // should we process.exit here?
  }
})();
