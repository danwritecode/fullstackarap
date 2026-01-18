# Stage 1: Builder - Install dependencies and build application
FROM oven/bun:1 AS builder
WORKDIR /app

# Accept build argument for backend URL (defaults to Docker service name)
ARG BACKEND_URL=http://lifemanual-backend:50051
ENV BACKEND_URL=${BACKEND_URL}

# Copy package files for dependency installation
COPY frontend/package.json frontend/bun.lockb ./

# Install dependencies (this layer will be cached)
RUN bun install --frozen-lockfile

# Copy application source code and configuration
COPY frontend/ .

# Copy protobuf files (needed for buf generation)
COPY protos/ /protos

# Generate protobuf TypeScript/JavaScript code
RUN bun generate

# Build the Nuxt application for production
RUN bun run build

# Stage 2: Runtime - Minimal runtime image
FROM oven/bun:1-slim AS runtime
WORKDIR /app

# Copy the built application from builder
COPY --from=builder /app/.output /app/.output

# Expose the application port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run the Nuxt server
CMD ["bun", "run", ".output/server/index.mjs"]
