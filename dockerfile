FROM node:22-alpine AS deps
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY backend ./backend
COPY frontend ./frontend

RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app

WORKDIR /app/backend
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "server.js"]