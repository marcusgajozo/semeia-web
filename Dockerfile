FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm
RUN corepack prepare pnpm@10.26.1 --activate

FROM base AS local
WORKDIR /agendei-web
CMD ["pnpm", "dev"]

FROM base AS deps
WORKDIR /agendei-web
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile


FROM base AS builder
WORKDIR /agendei-web
COPY --from=deps /agendei-web/node_modules ./node_modules
COPY . .
RUN pnpm run build


FROM base AS runner
WORKDIR /agendei-web
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /agendei-web/public ./public
COPY --from=builder --chown=nextjs:nodejs /agendei-web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /agendei-web/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]