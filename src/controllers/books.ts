import { Request, Response } from 'express';

import db from '../db/books';
import { Book } from '../types/books';

/**
 * @route POST /books
 */
export async function postBook(req: Request, res: Response) {
  const book = req.body as Book;
  console.log(book, req.body);
  try {
    await db.addBook(book);
    res.json({ message: 'Success' });
  } catch (error: any) {
    res.status(400).send({
      message: error?.message,
    });
  }
}
