// src/routes/dashboard.ts
import { Router, Request, Response } from "express";
import { connectToDatabase } from "../db/mongodb.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/stats", verifyAdmin, async (req: Request, res: Response) => {
  try {
    const { db } = await connectToDatabase();

    // প্যারালালি সব কলেকশনের ডেটা কাউন্ট করা (পারফরম্যান্সের জন্য)
    const [projects, blogs, testimonials, messages] = await Promise.all([
      db.collection("projects").countDocuments(),
      db.collection("blogs").countDocuments(),
      db.collection("testimonials").countDocuments(),
      db.collection("contacts").countDocuments(),
    ]);

    res.status(200).json({
      projects,
      blogs,
      testimonials,
      messages,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

export default router;