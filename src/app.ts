// src/app.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import testimonialRoutes from "./routes/testimonials.js";
import contactRoutes from "./routes/contact.js";
import projectRoutes from "./routes/projects.js";
import blogRoutes from "./routes/blogs.js";
import dashboardRoutes from "./routes/dashboard.js"; // নতুন ইমপোর্ট

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Server is healthy!" });
});

app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes); // রাউট যুক্ত করা হলো

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: err.message || "Internal Server Error" });
});

export default app;