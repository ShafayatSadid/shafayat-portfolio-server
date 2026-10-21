// src/routes/contact.ts
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../db/mongodb.js";
import { Contact } from "../types/contact.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = Router();

// ১. POST: কন্ট্যাক্ট ফর্ম সাবমিট (পাবলিক)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const { db } = await connectToDatabase();
    const newContact: Contact = { name, email, message, createdAt: new Date() };
    await db.collection<Contact>("contacts").insertOne(newContact);

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY as string;
    if (web3formsKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          message,
        }),
      });

      if (!response.ok) {
        console.error("Web3Forms failed:", await response.text());
      }
    }

    res.status(201).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ২. GET: সব মেসেজ দেখা (শুধু অ্যাডমিন)
router.get("/", verifyAdmin, async (req: Request, res: Response) => {
  const { db } = await connectToDatabase();
  const messages = await db.collection<Contact>("contacts").find().sort({ createdAt: -1 }).toArray();
  res.status(200).json(messages);
});

// ৩. DELETE: মেসেজ ডিলিট (শুধু অ্যাডমিন)
router.delete("/:id", verifyAdmin, async (req: Request<{ id: string }>, res: Response) => {
  const { db } = await connectToDatabase();
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ObjectId" });
    return;
  }

  const result = await db.collection<Contact>("contacts").deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({ message: "Deleted successfully", deletedCount: result.deletedCount });
});

export default router;