# fullstackarap

A full-stack application using gRPC and Protocol Buffers for client-server communication.

## Architecture

- **Backend**: Rust with gRPC server
- **Frontend**: Nuxt.js/Vue.js with TypeScript
- **Communication**: gRPC with Protocol Buffers

## Prerequisites

Install the following dependencies:

- [Protocol Compiler (protoc)](https://grpc.io/docs/protoc-installation/)
- [Buf CLI](https://buf.build/docs/installation)
- [Rust](https://rustup.rs/)
- [Bun](https://bun.sh)

## Installation

```bash
bun install
```

## Running the Application

Start all services in development mode:

```bash
bun run dev
```

Or run services individually:

```bash
# Backend API server
bun run dev:backend

# gRPC server
bun run dev:grpc

# Frontend development server
bun run dev:frontend
```
