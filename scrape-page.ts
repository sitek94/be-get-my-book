import puppeteer, { ElementHandle, Page } from "puppeteer";

const lubimyCzytac = {
  title: `//h1[contains(@class, "book__title")]`,
  author: `//span[contains(@class, "author")]`,
  pages: `//span[contains(@class, "book__pages")]`,
  tags: `//div[contains(@class, "book__desc")]//a[contains(@class, "tag")]`,
};

async function scrapeBook(page: Page) {
  const [title, author, pages] = await Promise.all([
    scrapeProperty(page, lubimyCzytac.title),
    scrapeProperty(page, lubimyCzytac.author),
    scrapeProperty(page, lubimyCzytac.pages),
  ]);
  const tags = await scrapeProperties(page, lubimyCzytac.tags);

  return {
    title,
    author,
    pages: getPagesNumber(pages),
    tags,
  };
}

export async function scrapePage(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const book = await scrapeBook(page);

  await browser.close();

  return book;
}

async function scrapeProperty(page: Page, xpath: string) {
  const [element] = await page.$x(xpath);

  return await getTextValue(element);
}

async function scrapeProperties(page: Page, xpath: string) {
  const elements = await page.$x(xpath);

  return await Promise.all(elements.map(getTextValue));
}

async function getTextValue(element: ElementHandle<Element>) {
  const text = await element.getProperty("textContent");

  if (!text) {
    return "";
  }

  const textValue = await text.jsonValue();

  return String(textValue).trim();
}

/**
 * Extract pages number from the string that looks like this: "300 str."
 * `"300str" -> 300`
 */
function getPagesNumber(str: string): number {
  const [numberPart] = str.split(" ");
  return Number(numberPart);
}
