# Shafayat Sadid — Portfolio Backend API

This is the backend API server for my personal portfolio website. It is a robust, production-ready Express.js application that powers the admin dashboard and public content (Projects, Blogs, Testimonials, Contact Messages) of my portfolio.

## 🔗 Live Links
- **Backend API Base URL:** [https://shafayat-portfolio-server.vercel.app/](https://shafayat-portfolio-server.vercel.app/) *(Replace with your actual backend URL)*
- **Frontend Client Repository:** [https://github.com/ShafayatSadid/shafayat-portfolio](https://github.com/ShafayatSadid/shafayat-portfolio)

## 📝 Project Overview
This backend serves as the REST API for my portfolio. It interacts with MongoDB Atlas using the native MongoDB driver (without Mongoose) for high performance. Security is a top priority here: all mutating endpoints (POST, PUT, DELETE) are protected by a custom JWT verification middleware that validates tokens against the Next.js Better Auth JWKS endpoint.

## ✨ Key Features
- **JWT Authentication & Authorization:** Verifies JWT tokens using `jose` and checks for an `admin` role before allowing any data mutations.
- **Native MongoDB Driver:** Utilizes the official MongoDB Node.js driver with TypeScript interfaces for strict type safety and fast queries.
- **Vercel Serverless Optimization:** Implements MongoDB connection caching (global scope) to prevent connection limits and cold-start issues on Vercel.
- **Email Integration:** Automatically forwards contact form submissions to my personal email using Web3Forms API.
- **Full CRUD Operations:** Complete RESTful endpoints for Blogs, Projects, Testimonials, and Contact Messages.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express v5
- **Language:** TypeScript (Strict Mode, ES Modules)
- **Database:** MongoDB Atlas (Native Driver)
- **Authentication:** Better Auth (JWKS verification via `jose`)
- **Deployment:** Vercel (Serverless Functions)
- **Email:** Web3Forms API

## 🚀 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShafayatSadid/shafayat-portfolio-server.git
   cd shafayat-portfolio-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Server Config
   PORT="5000"
   CLIENT_URL="http://localhost:3000"

   # Database
   MONGODB_URI="your_mongodb_connection_string"
   DB_NAME="shafayatSadid"

   # Auth & Email
   BETTER_AUTH_SECRET="your_shared_better_auth_secret"
   WEB3FORMS_ACCESS_KEY="your_web3forms_access_key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📍 API Endpoints Summary

### 🟢 Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Check server health status |
| `GET` | `/api/projects` | Get all projects |
| `GET` | `/api/projects/:id` | Get a single project details |
| `GET` | `/api/blogs` | Get all blogs (content excluded) |
| `GET` | `/api/blogs/:slug` | Get a single blog post by slug |
| `GET` | `/api/testimonials` | Get all client testimonials |
| `POST` | `/api/contact` | Submit a contact form (saves to DB & sends email) |

### 🔒 Protected Endpoints (Requires Admin JWT Token)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/stats` | Get total counts for dashboard overview |
| `POST` | `/api/projects` | Create a new project |
| `PUT` | `/api/projects/:id` | Update an existing project |
| `DELETE` | `/api/projects/:id` | Delete a project |
| `POST` | `/api/blogs` | Create a new blog |
| `PUT` | `/api/blogs/:id` | Update an existing blog |
| `DELETE` | `/api/blogs/:id` | Delete a blog |
| `POST` | `/api/testimonials` | Add a new testimonial |
| `PUT` | `/api/testimonials/:id` | Update a testimonial |
| `DELETE` | `/api/testimonials/:id` | Delete a testimonial |
| `GET` | `/api/contact` | View all contact messages |
| `DELETE` | `/api/contact/:id` | Delete a contact message |

## 📁 Project Structure
```text
├── api/
│   └── index.ts          # Vercel serverless entry point
├── src/
│   ├── app.ts            # Express app initialization & middleware
│   ├── server.ts         # Local development entry point
│   ├── db/
│   │   ├── mongodb.ts    # MongoDB connection caching
│   │   └── seed.ts       # Dummy data seeding script
│   ├── middleware/
│   │   └── auth.ts       # JWT verification & Admin role guard
│   ├── routes/           # Express API routes
│   │   ├── blogs.ts
│   │   ├── contact.ts
│   │   ├── dashboard.ts
│   │   ├── projects.ts
│   │   └── testimonials.ts
│   └── types/            # TypeScript interfaces
├── vercel.json           # Vercel deployment config
└── package.json
```

## 👨‍💻 Author
**Shafayat Sadid (Shafayat Hossain)**
- GitHub: [@ShafayatSadid](https://github.com/ShafayatSadid)
- LinkedIn: [Md Shafayat Hossain Sadid](https://www.linkedin.com/in/md-shafayat-hossain-sadid)
