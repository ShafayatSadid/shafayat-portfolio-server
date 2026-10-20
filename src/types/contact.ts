// src/types/contact.ts
import { ObjectId } from "mongodb";

export interface Contact {
  _id?: ObjectId;
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}