# Mid Falconi Fullstack Test - Backend

<p align="center">
<img style="width: 12%" src="https://img.shields.io/badge/nestjs-E0234E?logo=nestjs&logoColor=white" alt="NestJS">
<img style="width: 15%" src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="PostgreSQL">
<img style="width: 11%" src="https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white" alt="Redis">
<img style="width: 12%" src="https://img.shields.io/badge/TypeORM-FDB813?logo=typeorm&logoColor=white" alt="TypeORM">
<img style="width: 15%" src="https://img.shields.io/badge/OpenTelemetry-4B8BBE?logo=opentelemetry&logoColor=white" alt="OpenTelemetry">
<img style="width: 12%" src="https://img.shields.io/badge/Jaeger-00B4CC?logo=jaeger&logoColor=white" alt="Jaeger">
<img style="width: 11%" src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker">
</p>

A robust NestJS REST API backend application that manages users and profiles with enterprise-level architecture patterns, comprehensive observability, and production-ready features including caching, distributed tracing, and database persistence.

## Table of Contents

- [Application Overview](#application-overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Starting with Docker Compose](#starting-with-docker-compose)
- [Manual Setup](#manual-setup)
- [Environment Variables](#environment-variables)
- [Understanding OpenTelemetry & Jaeger](#understanding-opentelemetry--jaeger)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Available Commands](#available-commands)
- [Project Architecture](#project-architecture)

## Application Overview

This backend API serves as the core of the Falconi Fullstack Test application. It provides a comprehensive REST API for managing users and profiles with the following capabilities:

- User management (create, read, update, delete, activate/deactivate)
- Profile management with one-to-many user relationships
- Database persistence with automatic migrations
- Redis-based caching for performance optimization
- Structured logging with Pino
- Comprehensive API documentation with Swagger
- Request validation using class-validator and class-transformer
- Distributed tracing and observability with OpenTelemetry and Jaeger
- Unit and end-to-end testing with Jest

The application follows clean architecture principles with clear separation of concerns across Core, Application, Infrastructure, and Presentation layers.

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Node.js | 18+ | JavaScript runtime environment |
| Framework | NestJS | 11.0.1 | REST API framework with DI and modules |
| Language | TypeScript | 5.7.3 | Static typing and modern JavaScript |
| Database | PostgreSQL | 14+ | Relational database |
| ORM | TypeORM | 0.3.27 | Object-relational mapping with migrations |
| Cache | Redis | Latest | In-memory data store for caching |
| Cache Manager | @nestjs/cache-manager | Latest | Abstraction layer for caching |
| Logging | Pino | Latest | Structured JSON logging |
| API Docs | Swagger/OpenAPI | 11.2.1 | Interactive API documentation |
| Observability | OpenTelemetry | Latest | Distributed tracing instrumentation |
| Tracing UI | Jaeger | Latest | Visualization of distributed traces |
| Testing | Jest | 29.7.0 | Unit and E2E testing framework |
| Validation | class-validator | 0.14.2 | DTO validation decorators |
| Transformation | class-transformer | 0.5.1 | Object transformation |
| Linting | ESLint | 9 | Code quality and style |
| Formatting | Prettier | 3.4.2 | Code formatter |
| Package Manager | pnpm | 8+ | Fast, efficient package management |

## Prerequisites

- Node.js v18.0.0 or higher
- pnpm v8.0.0 or higher
- Docker and Docker Compose (recommended for development)
- PostgreSQL 14+ (or Docker)
- Redis (or Docker)

## Quick Start with Docker

The fastest way to get the application running:

```bash
# Build Docker image
docker build -t falconi-backend:latest .

# Run the application with PostgreSQL and Redis
docker run -d \
  --name falconi-app \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=development \
  -e DB_HOST=postgres \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e DB_DATABASE=falconi_test \
  -e REDIS_HOST=redis \
  -e REDIS_PORT=6379 \
  falconi-backend:latest
```

The API will be available at http://localhost:3000

## Starting with Docker Compose

Recommended for development as it orchestrates all services:

```bash
# Start all services in development mode
docker-compose -f docker-compose.development.yaml up

# Or start in production mode
docker-compose -f docker-compose.yaml up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

Services will be available at:
- API: http://localhost:3000
- Swagger Docs: http://localhost:3000/docs
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- Jaeger UI: http://localhost:16686

The Docker Compose configuration includes:
- Backend NestJS application
- PostgreSQL database with health checks
- Redis cache
- Jaeger tracing with OpenTelemetry receiver
- Pre-configured networking and volumes

## Manual Setup

For local development without Docker:

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env

# Start PostgreSQL (if not already running)
# On macOS with Homebrew: brew services start postgresql

# Start Redis (if not already running)
# On macOS with Homebrew: brew services start redis

# Run database migrations
pnpm migration:run

# Seed initial data
pnpm seed:run

# Start development server
pnpm start:dev
```

The API will be available at http://localhost:3000

## Environment Variables

Create a `.env` file in the backend root directory with the following configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=falconi_test

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# OpenTelemetry Configuration
OTEL_SDK_ENABLED=true
OTEL_SERVICE_NAME=falconi-backend
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
OTEL_TRACES_EXPORTER=otlp
```

For Docker Compose deployments, environment variables are defined in the docker-compose.yaml file and override local .env settings.

Development defaults will be used if variables are not provided. In production, ensure all database and tracing endpoints are properly configured.

## Understanding OpenTelemetry & Jaeger

### Why Observability Matters

OpenTelemetry (OTEL) and Jaeger are critical components for production systems:

**OpenTelemetry** provides:
- Automatic instrumentation of HTTP requests, database queries, and service calls
- Standard way to collect traces, metrics, and logs
- Vendor-neutral approach to observability
- Performance insights with minimal code changes

**Jaeger** provides:
- Visual interface to explore distributed traces
- Identify performance bottlenecks and latency issues
- Debug complex request flows across services
- Understand service dependencies and communication patterns

### What Gets Traced

The application automatically tracks:
- Incoming HTTP requests and responses
- Database queries to PostgreSQL
- Cache operations
- Service method calls
- Errors and exceptions with full stack traces

### Accessing Traces

Once the application is running, open Jaeger UI:

```
http://localhost:16686
```

Search for traces by:
- Service name: falconi-backend
- Operation name: POST /users, GET /users, etc.
- Tags: user.id, error status, duration
- Trace duration: Find slow operations

### Instrumentation Setup

The file `src/instrumentation.ts` is automatically loaded before the application starts and configures:
- OTEL SDK initialization
- Trace exporters to Jaeger
- Automatic HTTP instrumentation
- Custom span attributes and error handling

No additional code is needed - all instrumentation is automatic through decorators and middleware.

### Performance Monitoring

Use Jaeger to:
- Measure endpoint latency percentiles (p50, p99)
- Identify which operations consume the most time
- Track error rates and root causes
- Visualize service call chains
- Monitor resource usage patterns

### Production Considerations

For production deployments:
- Enable sampling to reduce storage costs (e.g., sample 10% of traces)
- Use dedicated Jaeger collectors for high-traffic systems
- Configure trace retention policies
- Set up alerts for error rates and latency thresholds
- Monitor Jaeger storage capacity

## API Documentation

Interactive API documentation is available at http://localhost:3000/docs when the application is running.

The Swagger interface provides:
- Complete endpoint listing with request/response schemas
- Parameter documentation and validation rules
- Try-it-out functionality to test endpoints directly
- Real-time API testing without external tools

### Core Endpoints

**User Management**
- POST /users - Create a new user (returns 201)
- GET /users - List all users (supports ?profile filter)
- GET /users/:userId - Get user by ID
- PUT /users/:userId - Update user information (returns 204)
- PUT /users/:userId/inactivate - Deactivate user (returns 204)
- DELETE /users/:userId - Delete user (returns 204)

**Profile Management**
- GET /profile - List all profiles
- GET /profile/:id - Get profile by ID

All endpoints return appropriate HTTP status codes (200, 201, 204, 400, 404) and include validation error details.

## Running Tests

The project includes comprehensive test coverage with Jest for unit tests and E2E tests.

### Unit Tests

Run unit tests for services, controllers, and utilities:

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode (re-run on file changes)
pnpm test:watch

# Generate coverage report
pnpm test:cov

# Run tests with debugging
pnpm test:debug
```

Test files are located alongside source files with `.spec.ts` extension.

### End-to-End Tests

Test the complete API flow including database and external services:

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with watch mode
pnpm test:e2e --watch
```

E2E tests are located in `test/app.e2e-spec.ts` and include:
- User creation and validation
- Profile filtering
- Database persistence
- Error handling and edge cases

### Test Coverage

Generate and review test coverage:

```bash
# Generate coverage report
pnpm test:cov

# View coverage report in browser
# Coverage output is in coverage/ directory
```

Test infrastructure includes:
- Jest configuration for unit and E2E testing
- Fixtures for test data generation
- Mocks for external dependencies
- TypeORM test database setup
- Transaction rollback between tests for isolation

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install project dependencies |
| `pnpm start:dev` | Start development server with hot reload |
| `pnpm start:debug` | Start with Node debugger attached |
| `pnpm start:prod` | Start production build |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm format` | Format code with Prettier |
| `pnpm lint` | Lint and fix code with ESLint |
| `pnpm test` | Run unit tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:cov` | Run tests with coverage report |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm migration:generate "Name"` | Generate new database migration |
| `pnpm migration:run` | Apply pending migrations |
| `pnpm migration:revert` | Rollback last migration |
| `pnpm seed:run` | Populate database with seed data |
| `pnpm gen-service` | Generate new NestJS service |
| `pnpm gen-controller` | Generate new NestJS controller |
| `pnpm gen-module` | Generate new NestJS module |

## Project Architecture

The application follows clean architecture with clear separation of concerns:

**Core Layer** (`src/core/`)
- Domain entities and business logic
- Repository interfaces for abstraction
- No external framework dependencies

**Application Layer** (`src/application/`)
- Use cases and business workflows
- Service layer orchestration
- Request/Response DTOs with validation

**Infrastructure Layer** (`src/infrastructure/`)
- Repository implementations using TypeORM
- Database configuration and migrations
- External service adapters

**Presentation Layer** (`src/presentation/`)
- HTTP controllers and route handlers
- Request parsing and response formatting
- Swagger documentation

**Design Patterns Used:**
- Repository Pattern for data access abstraction
- Builder Pattern for complex object construction
- Dependency Injection for loose coupling
- DTO Pattern for request/response validation
- Service Layer for business logic encapsulation

This architecture ensures testability, maintainability, and scalability by keeping layers independent and allowing for easy modifications without affecting other components.

---

<p align="center">
<strong>Built with NestJS, TypeORM, PostgreSQL, Redis, and OpenTelemetry</strong>
</p>
