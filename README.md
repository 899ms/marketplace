<p align="center">
  <a href="https://alignui.com">
    <img src="./public/images/logo.svg" height="96">
    <h3 align="center">AlignUI Design System</h3>
  </a>
  <p align="center">The Design System You Need</p>
</p>

[Join the AlignUI Community](https://discord.gg/alignui)

# AlignUI Starter Template with Next.js + Docker + Supabase

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), Dockerized for production and connected to a self-hosted [Supabase](https://supabase.com) backend.

---

## ✨ Features

- ⚡ Dockerized Next.js frontend
- 🎨 Pre-configured Tailwind CSS & dark mode toggle
- 🧩 Includes base components & utility classes
- 🔐 Supabase client integration (auth, db, etc.)
- 🧱 Supports environment-based configuration
- 🚀 Production-ready build setup

---

## 🛠️ Environment Variables

Create a `.env` file in the root of your project and add the following values:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

⚠️ These values should match the Supabase backend instance you are connecting to (self-hosted or cloud).




## 🚀 Getting Started (Local Development)
Install dependencies:

```
pnpm install
```

Run the development server:

```
pnpm dev
```

Visit: http://localhost:3000

## 🐳 Running with Docker

1. Build the Docker image
2. 
```
docker build -t alignui-next-app .
```

2. Run the container
```
docker compose up -d
```

By default, the app will be available at:
http://localhost:3000

3. Stop the container
```
docker compose down
```

You can modify the exposed ports or other settings in docker-compose.yml.

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation/using-vite)
- [AlignUI](https://alignui.com/)
