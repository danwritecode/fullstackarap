# Stage 1: Planner - Generate dependency recipe
FROM rust:1.85 AS planner
WORKDIR /app

# Install cargo-chef
RUN cargo install cargo-chef

# Copy backend source files to generate recipe
COPY backend/ .

# Generate recipe.json for dependency caching
RUN cargo chef prepare --recipe-path recipe.json

# Stage 2: Builder - Build dependencies and application
FROM rust:1.85 AS builder
WORKDIR /app

# Install cargo-chef and protobuf compiler
RUN cargo install cargo-chef && \
    apt-get update && \
    apt-get install -y protobuf-compiler && \
    rm -rf /var/lib/apt/lists/*

# Copy the recipe from planner
COPY --from=planner /app/recipe.json recipe.json

# Build dependencies only (this layer will be cached)
RUN cargo chef cook --release --recipe-path recipe.json

# Copy the rest of the backend source code
COPY backend/ .

# Copy protobuf files (needed for build.rs)
COPY protos/ /protos

# Build the gRPC server binary
RUN cargo build --release --bin grpc-server

# Stage 3: Runtime - Minimal runtime image
FROM debian:bookworm-slim AS runtime
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates libssl3 && \
    rm -rf /var/lib/apt/lists/*

# Copy the binary from builder
COPY --from=builder /app/target/release/grpc-server /usr/local/bin/grpc-server

# Expose gRPC port
EXPOSE 50051

# Run the gRPC server
CMD ["grpc-server"]
