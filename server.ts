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
  const book = await scrapePage(url);

  res.json(book);
});

app.listen(5000);
