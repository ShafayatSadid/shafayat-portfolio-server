// src/routes/contact.ts
import { Router, Request, Response } from "express";
import { connectToDatabase } from "../db/mongodb.js";
import { Contact } from "../types/contact.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // ১. MongoDB-তে সেভ করা
    const { db } = await connectToDatabase();
    const newContact: Contact = { name, email, message, createdAt: new Date() };
    await db.collection<Contact>("contacts").insertOne(newContact);

    // ২. Web3Forms দিয়ে ইমেইলে পাঠানো
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

export default router;