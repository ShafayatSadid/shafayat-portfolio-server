// src/types/blog.ts
import { ObjectId } from "mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt?: Date;
}