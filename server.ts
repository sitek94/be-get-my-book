import express from "express";
import { scrapePage } from "./scrape-page";

const app = express();

const url =
  "https://lubimyczytac.pl/ksiazka/4909770/milczacy-przewodnicy-jak-rozumiec-i-doskonalic-swoj-umysl";

// Simple CORS middleware
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });

  next();
});

app.get("/", async (req, res) => {
  const { url } = req.query;

  // TODO: add validation function or middleware
  if (!url) {
    res.status(400).json("Invalid or missing URL");
  }

  try {
    const book = await scrapePage(String(url));
    res.json(book);
  } catch (error: any) {
    res.status(400).send({
      message: error?.message,
    });
  }
});

app.listen(5000);
