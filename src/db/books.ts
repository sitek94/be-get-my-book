import { Client } from '@notionhq/client';

import config from '../config';
import { Book } from '../types/books';

// Initializing a client
const notion = new Client({
  auth: config.NOTION_TOKEN,
});

const db = {
  async addBook({ title, author, pagesCount, tags }: Book) {
    const response = await notion.pages.create({
      parent: {
        database_id: config.DATABASE_ID,
      },
      properties: {
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: title,
              },
            },
          ],
        },
        Author: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: author,
              },
            },
          ],
        },
        Pages: {
          type: 'number',
          number: pagesCount,
        },
        Tags: {
          type: 'multi_select',
          multi_select: tags.map(tag => ({
            name: tag,
          })),
        },
      },
    });
    console.log(response);
    return response;
  },
};

export default db;
