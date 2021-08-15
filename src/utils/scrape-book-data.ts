import puppeteer, { ElementHandle, Page } from "puppeteer";

import { Book } from "../types/books";

/**
 * Xpaths to the elements with the book data that can be found on lubimyczytać.pl
 */
const lubimyCzytac = {
  title: `//h1[contains(@class, "book__title")]`,
  author: `//span[contains(@class, "author")]`,
  pagesCount: `//span[contains(@class, "book__pages")]`,
  tags: `//div[contains(@class, "book__desc")]//a[contains(@class, "tag")]`,
};

/**
 * Scrapes the url looking for a book data.
 */
export async function scrapeBookData(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const book = await getBook(page);

  await browser.close();

  return book;
}

/**
 * Gets book's data from the page.
 */
async function getBook(page: Page) {
  const [title, author, pages] = await Promise.all([
    getProperty(page, lubimyCzytac.title),
    getProperty(page, lubimyCzytac.author),
    getProperty(page, lubimyCzytac.pagesCount),
  ]);
  const tags = await getProperties(page, lubimyCzytac.tags);
  const book: Book = {
    title,
    author,
    pagesCount: getPagesNumber(pages),
    tags,
  };
  return book;
}

/**
 * Get first property that matches `xpath`
 */
async function getProperty(page: Page, xpath: string) {
  const [element] = await page.$x(xpath);
  return await getTextValue(element);
}

/**
 * Get all properties that match `xpath`
 */
async function getProperties(page: Page, xpath: string) {
  const elements = await page.$x(xpath);
  return await Promise.all(elements.map(getTextValue));
}

/**
 * Extract text value from DOM element
 */
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
