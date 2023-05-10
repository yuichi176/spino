# refer to https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ARG bff_protocol
ARG bff_base_domain
ARG be_protocol
ARG be_base_domain

ENV NEXT_PUBLIC_BFF_PROTOCOL=${bff_protocol}
ENV NEXT_PUBLIC_BFF_BASE_DOMAIN=${bff_base_domain}
ENV NEXT_PUBLIC_BE_PROTOCOL=${be_protocol}
ENV NEXT_PUBLIC_BE_BASE_DOMAIN=${be_base_domain}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# openapi-generator-cliを実行用にjreをインストール
RUN apt-get -y install default-jre

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]