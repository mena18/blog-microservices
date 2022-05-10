export interface Article {
  id: number;
  title: string;
  image: string;
  body: string;
  likes: number;
  num_comments: number;
  date: Date;
}

export interface Comment {
  id: number;
  email: string;
  user: number;
  body: string;
  date: Date;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  likes: number;
}
