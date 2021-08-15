import { Request, Response } from "express";

import { scrapeBookData } from "../utils/scrape-book-data";

/**
 * @route GET /scrape
 */
export async function getBook(req: Request, res: Response) {
  const { url } = req.query;

  // TODO: add validation function or middleware
  if (!url) {
    res.status(400).json("Invalid or missing URL");
  }

  try {
    const book = await scrapeBookData(String(url));
    res.json(book);
  } catch (error: any) {
    res.status(400).send({
      message: error?.message,
    });
  }
}
