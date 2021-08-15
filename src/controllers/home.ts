import { Request, Response } from "express";

/**
 * Home page
 * @route GET /
 *
 * TODO: add homepage with some basic documentation
 */

export async function index(req: Request, res: Response) {
  res.send({
    message: "Server is running",
  });
}
