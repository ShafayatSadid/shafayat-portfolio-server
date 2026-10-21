// src/routes/blogs.ts
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db/mongodb.js";
import { BlogPost } from "../types/blog.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = Router();

// ১. GET: সব ব্লগের লিস্ট (পাবলিক)
router.get("/", async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const blogs = await db
    .collection<BlogPost>("blogs")
    .find({}, { projection: { content: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
  res.status(200).json(blogs);
});

// ২. GET: নির্দিষ্ট একটি ব্লগ (পাবলিক)
router.get("/:slug", async (req: Request<{ slug: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const blog = await db.collection<BlogPost>("blogs").findOne({ slug: req.params.slug });

  if (!blog) {
    res.status(404).json({ error: "Blog not found" });
    return;
  }
  res.status(200).json(blog);
});

// ৩. POST: নতুন ব্লগ তৈরি (শুধু অ্যাডমিন)
router.post("/", verifyAdmin, async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const body = req.body as Omit<BlogPost, "_id" | "createdAt">;

  const newBlog: BlogPost = {
    ...body,
    createdAt: new Date(),
  };

  const result = await db.collection<BlogPost>("blogs").insertOne(newBlog);
  res.status(201).json({ ...newBlog, _id: result.insertedId });
});

// ৪. PUT: ব্লগ আপডেট (শুধু অ্যাডমিন)
router.put("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const body = req.body as Partial<BlogPost>;
  const result = await db.collection<BlogPost>("blogs").updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  res.status(200).json({ message: "Updated successfully", modifiedCount: result.modifiedCount });
});

// ৫. DELETE: ব্লগ ডিলিট (শুধু অ্যাডমিন)
router.delete("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const result = await db.collection<BlogPost>("blogs").deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ message: "Deleted successfully", deletedCount: result.deletedCount });
});

export default router;