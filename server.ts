import express from "express";
import { scrapePage } from "./scrape-page";

const app = express();

const url =
  "https://lubimyczytac.pl/ksiazka/4909770/milczacy-przewodnicy-jak-rozumiec-i-doskonalic-swoj-umysl";

app.get("/", async (req, res) => {
  const book = await scrapePage(url);

  res.json(book);
});

app.listen(5000);
