export interface SaveBookCommand {
  id: number | null;
  title: string;
  cover: string;
  content: string;
  genre: string;
  author: string;
}
