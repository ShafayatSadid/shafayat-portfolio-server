// src/db/mongodb.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.DB_NAME as string;

if (!uri) {
  throw new Error("MONGODB_URI is missing in .env file");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}