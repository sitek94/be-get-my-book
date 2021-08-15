import { RequestHandler } from "express";

import config from "../config";

const { CLIENT_URL } = config;

const cors: RequestHandler = (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": CLIENT_URL,
    "Access-Control-Allow-Headers": "Content-Type",
  });

  next();
};

export default cors;
