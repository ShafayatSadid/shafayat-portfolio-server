// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import * as jose from "jose";

const AUTH_URL = process.env.CLIENT_URL as string;
const JWKS_URL = `${AUTH_URL}/api/auth/jwks`;

// JWKS ক্যাশ করার জন্য
let jwks: jose.JSONWebKeySet | null = null;

// হেল্পার ফাংশন: JWKS ফেচ করবে, না পেলে এরর দেবে
async function getJwks(): Promise<jose.JSONWebKeySet> {
  if (jwks) return jwks;

  const response = await fetch(JWKS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch JWKS");
  }
  
  const data = await response.json();
  jwks = data;
  return data;
}

export async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: Missing token" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // ১. JWKS ফেচ করা (এখন আর null হবে না)
    const currentJwks = await getJwks();

    // ২. পাবলিক কি তৈরি করা
    const keys = jose.createLocalJWKSet(currentJwks);

    // ৩. টোকেন ভেরিফাই করা
    const { payload } = await jose.jwtVerify(token, keys);

    // ৪. রোল চেক করা
    if (payload.role !== "admin") {
      res.status(403).json({ error: "Forbidden: Admin access required" });
      return;
    }

    // ভেরিফাই সফল হলে রিকোয়েস্টে ইউজার ডেটা যুক্ত করা
    (req as any).user = payload;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}