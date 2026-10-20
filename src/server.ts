// src/server.ts
import "dotenv/config"; // এটি সরাসরি dotenv.config() রান করবে, সবার আগে

import app from "./app.js";
import { connectToDatabase } from "./db/mongodb.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();