// src/routes/blogs.ts
import { Router, Request, Response } from "express";
import { connectToDatabase } from "../db/mongodb.js";
import { BlogPost } from "../types/blog.js";

const router = Router();

// সব ব্লগের লিস্ট
router.get("/", async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  // কন্টেন্ট ছাড়া বাকি সব ডেটা পাঠাব (পারফরম্যান্সের জন্য)
  const blogs = await db
    .collection<BlogPost>("blogs")
    .find({}, { projection: { content: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
    
  res.status(200).json(blogs);
});

// নির্দিষ্ট একটি ব্লগ (slug দিয়ে)
router.get("/:slug", async (req: Request<{ slug: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const blog = await db.collection<BlogPost>("blogs").findOne({ slug: req.params.slug });

  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }
  
  res.status(200).json(blog);
});

export default router;