import express from "express";
import { scrapePage } from "./scrape-page";
import { Client } from "@notionhq/client";
import { Book } from "models";
import dotenv from "dotenv";

dotenv.config();

const databaseId = process.env.DB_ID;
const notionToken = process.env.MY_NOTION_TOKEN;

if (!databaseId || !notionToken) {
  console.error("Missing env variable(s)");
  process.exit(1);
}

// Initializing a client
const notion = new Client({
  auth: notionToken,
});

const db = {
  async addBook({ title, author, pagesCount, tags }: Book) {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: title,
              },
            },
          ],
        },
        Author: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: author,
              },
            },
          ],
        },
        Pages: {
          type: "number",
          number: pagesCount,
        },
        Tags: {
          type: "multi_select",
          multi_select: tags.map((tag) => ({
            name: tag,
          })),
        },
      },
    });
    console.log(response);
    return response;
  },
};

const app = express();

// Simple CORS middleware
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  next();
});

app.use(express.json());

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

app.post("/book", async (req, res) => {
  const book = req.body as Book;
  console.log(book, req.body);
  try {
    await db.addBook(book);
    res.json({ message: "Success" });
  } catch (error: any) {
    res.status(400).send({
      message: error?.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on PORT: 5000");
});
