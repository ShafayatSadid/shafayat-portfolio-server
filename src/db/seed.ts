// src/db/seed.ts
import "dotenv/config";
import { connectToDatabase } from "./mongodb.js";
import { Testimonial } from "../types/testimonial.js";
import { Project } from "../types/project.js";
import { BlogPost } from "../types/blog.js";

const dummyTestimonials: Omit<Testimonial, "_id">[] = [
    {
        name: "Tanvir Ahmed",
        role: "Founder, Monohor",
        feedback: "Shafayat delivered our e-commerce platform ahead of schedule. His attention to detail, especially with server-side validation and the Steadfast courier integration, was exceptional. Highly recommended!",
        rating: 5,
        createdAt: new Date(),
    },
    {
        name: "Sarah Rahman",
        role: "Managing Partner, Legit Assist",
        feedback: "Working with Shafayat on our legal platform was a breeze. He handled the complex role-based dashboards and Stripe integration perfectly. The platform is secure and incredibly fast.",
        rating: 5,
        createdAt: new Date(Date.now() - 86400000),
    },
    {
        name: "Imam Abdullah",
        role: "Director, Al-Quran Education",
        feedback: "He built exactly what we needed. The admin dashboard is very easy to use, and the Web3Forms integration for free trials works flawlessly. A very dedicated developer.",
        rating: 5,
        createdAt: new Date(Date.now() - 172800000),
    },
    {
        name: "Mahmudul Hasan",
        role: "Administrator, Markazul Lisan",
        feedback: "Our institute's CMS is now extremely manageable. Shafayat's use of Better Auth and Cloudinary made the site secure and fast. He is patient and solves problems quickly.",
        rating: 4,
        createdAt: new Date(Date.now() - 259200000),
    },
    {
        name: "Fahim Faisal",
        role: "Startup Founder",
        feedback: "I hired Shafayat for a custom web app. His TypeScript skills are solid, and he communicates very clearly. He doesn't over-engineer things, which saved us both time and money.",
        rating: 5,
        createdAt: new Date(Date.now() - 345600000),
    },
];

const dummyProjects: Omit<Project, "_id">[] = [
    {
        title: "Monohor",
        description: "A production-ready, full-stack e-commerce platform built for a real Bengali heritage brand. Features guest checkout, secure server-side price validation, Steadfast courier integration, and automated email notifications.",
        techStack: ["Next.js 16", "React 19", "HeroUI", "Tailwind CSS 4", "Zustand", "Express.js", "MongoDB", "Better Auth", "Cloudinary", "Resend"],
        liveUrl: "https://monohor.com.bd",
        githubUrl: "https://github.com/ShafayatSadid/monohor-client",
        image: "/images/projects/monohor.webp",
        createdAt: new Date(),
    },
    {
        title: "Legit Assist",
        description: "A modern online lawyer hiring platform connecting clients with legal experts. Features role-based dashboards (Client/Lawyer/Admin), Stripe payment integration, and secure authentication with Google OAuth.",
        techStack: ["Next.js 16", "React 19", "HeroUI", "Tailwind CSS 4", "Better Auth", "Motion", "Stripe", "Cloudinary", "MongoDB"],
        liveUrl: "https://legit-assist.vercel.app",
        githubUrl: "https://github.com/ShafayatSadid/legit-assist",
        image: "/images/projects/legit-assist.webp",
        createdAt: new Date(Date.now() - 86400000),
    },
    {
        title: "Al-Quran Education",
        description: "An Islamic education platform for learning Quran with Tajweed, Tafseer, and Arabic. Features courses, teacher profiles, student reviews, and a secure admin dashboard.",
        techStack: ["Next.js 16", "React 19", "HeroUI", "Tailwind CSS 4", "Better Auth", "Express.js", "MongoDB", "Web3Forms"],
        liveUrl: "https://al-quran-education.vercel.app",
        githubUrl: "https://github.com/ShafayatSadid/al-quran-education",
        image: "/images/projects/alquraneducation.webp",
        createdAt: new Date(Date.now() - 172800000),
    },
    {
        title: "Markazul Lisan",
        description: "An online Islamic education platform for expatriate Bangladeshis, featuring course listings, teacher profiles, blog, books, admission forms, and a secure admin dashboard with full CRUD operations.",
        techStack: ["Next.js 16", "React 19", "Tailwind CSS 4", "HeroUI", "Better Auth", "Express v5", "MongoDB Atlas", "Cloudinary"],
        liveUrl: "https://markazul-lisan.vercel.app",
        githubUrl: "https://github.com/ShafayatSadid/markazul-lisan",
        image: "/images/projects/markazul-lisan.webp",
        createdAt: new Date(Date.now() - 259200000),
    },
];

const dummyBlogs: Omit<BlogPost, "_id">[] = [
    {
        title: "Why I Switched from WordPress to Full-Stack Development",
        slug: "why-i-switched-from-wordpress",
        excerpt: "WordPress felt like using Canva. I wanted to build real things from scratch. Here's my story.",
        content: "# Introduction\n\nWhen I first started, I used WordPress. It was easy, but I didn't feel like a developer. I felt like a designer using Canva.\n\n## The Turning Point\n\nI decided to learn **C and C++** to understand how computers actually work. Then I joined Programming Hero...\n\n> Now, I build full-stack apps with Next.js and Express.\n\nIt's a completely different feeling.",
        image: "/images/projects/code-bg.webp",
        createdAt: new Date(),
    },
    {
        title: "How to Secure Your Express APIs",
        slug: "secure-express-apis",
        excerpt: "Security is not an option; it's a requirement. Learn how to protect your API using JWT and Better Auth.",
        content: "# Why Security Matters\n\nFrontend can be manipulated. You must always validate on the backend.\n\n## Best Practices\n1. Never trust client-side data.\n2. Use **JWT** for authentication.\n3. Validate prices and roles on the server.",
        image: "/images/projects/security-bg.webp",
        createdAt: new Date(Date.now() - 86400000),
    },
];

async function seedDatabase() {
    try {
        console.log("⏳ Connecting to database for seeding...");
        const { db } = await connectToDatabase();

        // ১. সিড টেস্টিমোনিয়াল
        const testimonialCollection = db.collection<Testimonial>("testimonials");
        await testimonialCollection.deleteMany({});
        await testimonialCollection.insertMany(dummyTestimonials);
        console.log(`✅ Inserted ${dummyTestimonials.length} testimonials!`);

        // ২. সিড প্রজেক্টস
        const projectCollection = db.collection<Project>("projects");
        await projectCollection.deleteMany({});
        await projectCollection.insertMany(dummyProjects);
        console.log(`✅ Inserted ${dummyProjects.length} projects!`);

        // ৩. সিড ব্লগস (এখন এটি ফাংশনের ভেতরে আছে)
        const blogCollection = db.collection<BlogPost>("blogs");
        await blogCollection.deleteMany({});
        await blogCollection.insertMany(dummyBlogs);
        console.log(`✅ Inserted ${dummyBlogs.length} blogs!`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();