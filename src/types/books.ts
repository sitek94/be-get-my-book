export type Title = string;
export type Author = string;
export type PagesCount = number;
export type Tag = string;
export type Tags = Tag[];

export interface Book {
  title: Title;
  author: Author;
  pagesCount: PagesCount;
  tags: Tags;
}
