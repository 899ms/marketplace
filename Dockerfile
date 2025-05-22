# 1) Pull a minimal Node.js image
FROM node:18-alpine

# 2) Create app directory
WORKDIR /usr/src/app

# 3) Declare build-time args for Supabase keys
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG SUPABASE_SERVICE_ROLE_KEY

# 4) Export them as env vars so Next.js can pick them up during `next build`
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# 5) Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
  && pnpm install --frozen-lockfile

# 6) Copy source & build
COPY . .
RUN pnpm build

# 7) Expose & start
EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "start"]