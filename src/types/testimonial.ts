// src/types/testimonial.ts
import { ObjectId } from "mongodb";

export interface Testimonial {
  _id?: ObjectId;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  createdAt?: Date;
}