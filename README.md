# fullstackarap

The objective of this project is to show how to create a fullstack app with Rust, Nuxt, gRPC, and TypeScript.

The pain of keeping types in sync between frontend and backend is a problem that I personally wanted to solve. I'm not a fan of "isomorphic" javascript frameworks (Next, Nuxt), mainly because I don't want to write servers in Javascript. 

This allows me to write the backend in Rust and the frontend in Nuxt without sacrificing type safety and ergonomics.

## Architecture

- **Backend**: Rust with gRPC server using [Tonic](https://github.com/hyperium/tonic) and [Prost](https://github.com/tokio-rs/prost)
- **Frontend**: Nuxt.js/Vue.js with TypeScript using [ConnectRPC](https://connectrpc.com/)
- **Communication**: gRPC with Protocol Buffers

### Backend Stack
- **Tonic**: A gRPC implementation for Rust built on async/await
- **Prost**: Protocol buffer implementation for Rust with serialization support
- **Tonic-Web**: Enables gRPC-Web for browser compatibility

### Frontend Stack
- **ConnectRPC**: Type-safe gRPC-Web client for TypeScript
- **Buf**: Protocol buffer toolchain for code generation
- **Generated TypeScript types**: Automatically generated from `.proto` files

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
