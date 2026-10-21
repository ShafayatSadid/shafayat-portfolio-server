// src/routes/testimonials.ts
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db/mongodb.js";
import { Testimonial } from "../types/testimonial.js";
import { verifyAdmin } from "../middleware/auth.js"; // নতুন ইমপোর্ট

const router = Router();

// ১. GET: সব রিভিউ দেখা (পাবলিক)
router.get("/", async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const testimonials = await db.collection<Testimonial>("testimonials").find().sort({ createdAt: -1 }).toArray();
  res.status(200).json(testimonials);
});

// ২. POST: নতুন রিভিউ তৈরি (শুধু অ্যাডমিন)
router.post("/", verifyAdmin, async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const body = req.body as Omit<Testimonial, "_id" | "createdAt">;
  
  const newTestimonial: Testimonial = {
    ...body,
    createdAt: new Date(),
  };

  const result = await db.collection<Testimonial>("testimonials").insertOne(newTestimonial);
  res.status(201).json({ ...newTestimonial, _id: result.insertedId });
});

// ৩. PUT: রিভিউ আপডেট (শুধু অ্যাডমিন)
router.put("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const body = req.body as Partial<Testimonial>;
  const result = await db.collection<Testimonial>("testimonials").updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  res.status(200).json({ message: "Updated successfully", modifiedCount: result.modifiedCount });
});

// ৪. DELETE: রিভিউ ডিলিট (শুধু অ্যাডমিন)
router.delete("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const result = await db.collection<Testimonial>("testimonials").deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ message: "Deleted successfully", deletedCount: result.deletedCount });
});

export default router;