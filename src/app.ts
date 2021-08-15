import express from "express";
import cors from "./middleware/cors";

import * as homeController from "./controllers/home";
import * as scrapeController from "./controllers/scrape";
import * as booksController from "./controllers/books";

const app = express();

app.use(cors);
app.use(express.json());

app.get("/", homeController.index);
app.get("/scrape", scrapeController.getBook);
app.post("/books", booksController.postBook);

export default app;
