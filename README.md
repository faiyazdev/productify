## 👋 About This Project

I built this full-stack e-commerce platform as part of my journey to become a proficient full-stack developer. This project represents my deep dive into modern web development practices, focusing on **end-to-end type safety**, **advanced state management**, and **scalable architecture**.

As a developer passionate about React, Next.js, Express, and modern ORMs like Drizzle and Prisma, I designed this application to challenge myself and showcase production-ready code that I'd be proud to share with fellow developers and potential employers.

> 💡 **Moving on to the next part...**
## ✨ Features

### 🔐 Authentication & Authorization
- **Clerk Integration** - I implemented seamless user management with `clerk-react` and `clerk-express`
- **Webhook-Based User Sync** - I used Clerk webhooks to automatically register users in my database
- **Secure API Communication** - I created Axios interceptors that automatically inject authorization tokens into every request

### 🛍️ E-Commerce Core
- **Product Management** - Full CRUD operations that I built from scratch
- **Interactive Comments** - Commenting system I designed for product engagement
- **Type-Safe Database** - I architected a fully typed relational schema using Drizzle ORM

### 🏗️ Architecture Highlights
- **Full TypeScript** - I ensured complete type safety across both client and server
- **Optimized Data Fetching** - I leveraged TanStack Query for efficient server state management
- **Serverless Database** - I integrated Neon serverless PostgreSQL for scalability
- **Type-Safe ORM** - I chose Drizzle ORM for its zero runtime overhead and excellent TypeScript support

&nbsp;
<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" />
</div>


<h2 align="center">🛠️ Tech Stack ⚡️ Frontend + Backend</h2>

* **Frontend Library**: React.js
* **Frontend + Backend**: TypeScript
* **Database**: PostgreSQL (Neon Serverless)
* **ORM**: Drizzle ORM
* **Backend Framework**: Express.js
* **Styling**: Tailwind CSS
* **State Management**: TanStack Query (React Query)
* **Authentication**: Clerk (React + Express)
* **HTTP Client**: Axios
* **UI Components**: DaisyUI
* **Icons**: Lucide React
* **Routing**: React Router
* **Build Tool**: Vite
* **Schema Validation**: Zod

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" />
</div>

## 📌 What I Learned

I built this project with specific learning goals in mind:

- ✅ **Mastered TanStack Query** - I now understand advanced caching strategies, optimistic updates, and complex data synchronization patterns
- ✅ **Achieved Full-Stack Type Safety** - I successfully implemented TypeScript across the entire stack, from database schemas to UI components
- ✅ **Gained Drizzle ORM Expertise** - I learned how to design efficient, type-safe database schemas and queries
- ✅ **Implemented Production-Ready Webhooks** - I built a robust Clerk webhook system for user synchronization

</br>

### ⚡️ Key Takeaways

**Type Safety is Game-Changing** - Having types flow from the database to the frontend caught countless bugs before runtime.

**TanStack Query Transformed My Approach** - I learned how to think about server state differently, leveraging caching and background refetching.

**Webhooks Require Careful Design** - I discovered the importance of idempotency and error handling in webhook systems.

**ORMs Can Be Beautiful** - Drizzle's approach to type inference made database work actually enjoyable.

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" />
</div>

<h1 align="center">🐛 Challenges & Solutions</h1>

## 1. TypeScript + Node ESM + Drizzle Import Issue

Maybe you’ve run into this before — I recently ran into a tricky issue when using TypeScript with Node ESM (`moduleResolution: NodeNext`) together with Drizzle. The problem is that Node wants `.js` extensions in relative imports, but Drizzle’s CLI breaks if those `.js` files don’t exist yet because it executes the TypeScript source. Essentially, Node ESM and Drizzle expect incompatible import styles, and TypeScript can’t satisfy both at the same time.

## How I handled it

A practical workaround I found was to **compile the project first** and then let Drizzle operate on the compiled output:

1. Add an `outDir` to your `tsconfig`:

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

2. Update `package.json` scripts to build before running Drizzle:

```json
{
  "scripts": {
    "build": "tsc",
    "db:migrate": "pnpm build && drizzle-kit generate",
    "db:push": "pnpm build && drizzle-kit push"
  }
}
```

3. Point Drizzle to the compiled files in your `dist` folder:

```ts
export default defineConfig({
  schema: "./dist/src/**/*.schema.js",
});
```

This isn’t perfect, and you might need to tweak it depending on your project, but it worked well for me.

For more discussion and context, check out this Reddit thread:
[https://www.reddit.com/r/node/comments/1lltzpq/having_a_headache_with-typescript_node_esm/](https://www.reddit.com/r/node/comments/1lltzpq/having_a-headache-with-typescript_node_esm/)

</br>


## 🗺️ What's Next

### 🎯 Features I'm Adding Soon

- [ ] **Stripe Integration** - I'm planning to implement complete payment processing
- [ ] **Cloudinary for Media** - I'll be adding image upload and optimization (I already know Cloudinary, just need to integrate it)
- [ ] **Advanced Search & Filters** - Full-text search with category filtering
- [ ] **Complete Order Flow** - Cart, checkout, and order history
- [ ] **Admin Dashboard** - Analytics and inventory management panel

### 💡 Future Learning Goals

- Implement real-time features with WebSockets
- **Framer Motion Animations** - I want to add smooth, professional animations throughout
- Add comprehensive testing (Jest, React Testing Library)

## 🤝 Let's Connect

I'm always excited to connect with fellow developers, discuss this project, or collaborate on new ideas! </br>
If you found this project interesting or helpful, I'd appreciate a star! ⭐


<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=0:3b82f6,100:8b5cf6&height=2"/>

<table align="center">
  <tr>
    <td>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="https://www.linkedin.com/in/faiyazdev"><img src="https://skillicons.dev/icons?i=linkedin" /></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="https://x.com/faiyazdev"><img src="https://skillicons.dev/icons?i=twitter" /></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="mailto:faiyazsarkar06@email.com"><img src="https://skillicons.dev/icons?i=gmail" /></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </td>
    <td>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="https://www.linkedin.com/in/faiyazdev"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="https://x.com/faiyazdev"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href="mailto:faiyazsarkar06@email.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </td>
  </tr>
</table>

<!-- <p align="center">
  <img src="https://skillicons.dev/icons?i=react,nextjs,express,postgres" />
</p> -->
  
