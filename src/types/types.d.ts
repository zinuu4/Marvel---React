declare module "*.png";

interface Comic {
  title?: string;
  thumbnail?: string;
  price?: string;
  pageCount?: string;
  language?: string;
  id?: string;
  description?: string;
}

interface CharComic {
  resourceURI?: string;
  name?: string;
}

interface Char {
  name?: string;
  thumbnail?: string;
  id: number;
  description?: string;
  wiki?: string;
  homepage?: string;
  comics?: CharComic[];
}
