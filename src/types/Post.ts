export interface PostProps {
  postId: string;
  title: string;
  content: string;
  slug: string;
  categories: string[];
  createdAt: string;
  modifiedAt: string | null;
  authorId: string;
  comments: string[];
  published: boolean;
  thumb: string;
}