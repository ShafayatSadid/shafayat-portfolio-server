// src/routes/projects.ts
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db/mongodb.js";
import { Project } from "../types/project.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = Router();

// ১. GET: সব প্রজেক্ট (পাবলিক)
router.get("/", async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const projects = await db.collection<Project>("projects").find().sort({ createdAt: -1 }).toArray();
  res.status(200).json(projects);
});

// ২. GET: নির্দিষ্ট প্রজেক্ট (এডিটের জন্য - শুধু অ্যাডমিন)
router.get("/edit/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const project = await db.collection<Project>("projects").findOne({ _id: new ObjectId(id) });
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.status(200).json(project);
});

// ৩. POST: নতুন প্রজেক্ট (শুধু অ্যাডমিন)
router.post("/", verifyAdmin, async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const body = req.body as Omit<Project, "_id" | "createdAt">;
  const newProject: Project = { ...body, createdAt: new Date() };
  const result = await db.collection<Project>("projects").insertOne(newProject);
  res.status(201).json({ ...newProject, _id: result.insertedId });
});

// ৪. PUT: প্রজেক্ট আপডেট (শুধু অ্যাডমিন)
router.put("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const body = req.body as Partial<Project>;
  const result = await db.collection<Project>("projects").updateOne({ _id: new ObjectId(id) }, { $set: body });
  res.status(200).json({ message: "Updated successfully", modifiedCount: result.modifiedCount });
});

// ৫. DELETE: প্রজেক্ট ডিলিট (শুধু অ্যাডমিন)
router.delete("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const result = await db.collection<Project>("projects").deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ message: "Deleted successfully", deletedCount: result.deletedCount });
});

export default router;