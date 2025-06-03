<p align="center">
  <a href="https://alignui.com">
    <img src="./public/images/logo.svg" height="96">
    <h3 align="center">AlignUI Design System</h3>
  </a>
  <p align="center">The Design System You Need</p>
</p>


[Join the AlignUI Community](https://discord.gg/alignui)

# AlignUI Starter Template with Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 🔸 Includes all styles
- 🔸 Ready-to-use Tailwind setup
- 🔸 All base components included
- 🔸 All utils included
- 🔸 Inter font setup
- 🔸 Dark mode toggle included

## Getting Started

**Setup environment variables**

Copy the environment example file and configure your environment variables:

```bash
cp .env.example .env
```

**Install dependencies**

```bash
pnpm i
```

**Run the development server:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Docker Deployment

This project includes Docker support for easy deployment. The application runs on port 3000 by default unless the port is mapped to a domain.

**Build and run with Docker Compose:**

```bash
docker compose up -d --build
```

This command will:
- Build the Docker image
- Start the container in detached mode
- Make the application available on port 3000

**Stop and remove the service:**

```bash
docker compose down
```

This will stop the running containers and remove them along with the associated networks.
