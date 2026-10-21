// src/types/project.ts
import { ObjectId } from "mongodb";

export interface Project {
  _id?: ObjectId;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  challenges?: string;
  improvements?: string;
  createdAt?: Date;
}