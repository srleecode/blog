export interface PostCard {
  title: string;
  route: string;
  description: string;
  tags?: string[];
  category?: string;
  publishedDate?: string;
  published: boolean;
}
