import puppeteer from "puppeteer";

const url =
  "https://lubimyczytac.pl/ksiazka/4909770/milczacy-przewodnicy-jak-rozumiec-i-doskonalic-swoj-umysl";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const element = await page.$("span.author");

  const text = await page.evaluate((element) => element.textContent, element);
  console.log(text.trim());

  await browser.close();
})();
