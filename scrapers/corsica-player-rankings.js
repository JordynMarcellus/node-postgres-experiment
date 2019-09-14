const puppeteer = require("puppeteer");
const URL =
  "https://www.corsicahockey.com/nhl/players/nhl-player-ratings-rankings";
const WAIT_OPTIONS = { waitUntil: "networkidle2" };

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const browserPage = await browser.newPage();
    await browserPage.goto(URL);
    await browserPage.select("select#filter_limits_select", "4000");
    await browserPage.click('a[data-position="skaters"]');
    await browserPage.waitFor(1000 * 60);
    // double bang here is to explicitly coerce to true or false...
    // potentially using this here in case we need to load the data
    // await page.waitFor(() => !!document.querySelector('.foo'))
  } catch (e) {
    console.error("shutting down due to", e.message);
    console.error(e.stack);
  } finally {
    browser.close();
    // should we process.exit here?
  }
})();
