// src/routes/projects.ts
import { Router, Request, Response } from "express";
import { connectToDatabase } from "../db/mongodb.js";
import { Project } from "../types/project.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const projects = await db
    .collection<Project>("projects")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
    
  res.status(200).json(projects);
});

export default router;