# Falconi Fullstack Test - Backend
<p align="center">
<img style="width: 12%" src="https://img.shields.io/badge/nestjs-E0234E?logo=nestjs&logoColor=white" alt="NestJS">
<img style="width: 15%" src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="PostgreSQL">
<img style="width: 11%" src="https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white" alt="Redis">
</p>
A robust NestJS backend application demonstrating enterprise-level architecture patterns with TypeORM, PostgreSQL, Redis and comprehensive API documentation.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Management](#database-management)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Scripts](#scripts)

## 🎯 Overview

This is a NestJS-based REST API that manages users and profiles with the following core features:

- **User Management**: Create, read, update, and delete users
- **Profile Management**: Organize users by profiles
- **Database Migrations**: Version-controlled database schema evolution
- **Database Seeding**: Pre-populated test data
- **Swagger Documentation**: Interactive API documentation
- **Logging**: Structured logging with Pino
- **Validation**: Request validation using class-validator
- **Testing**: Unit and E2E test coverage

## 🏗️ Architecture

This project follows clean architecture principles with a layered structure:

```
src/
├── core/              # Business logic and domain entities
│   ├── common/        # Shared abstractions
│   ├── profiles/      # Profile domain
│   └── users/         # User domain
├── application/       # Use cases and business rules
│   ├── profiles/      # Profile services
│   └── users/         # User services
├── infrastructure/    # External services and data access
│   ├── persistence/   # Database config, migrations, seeds, repositories
│   └── ...
└── presentation/      # API controllers and endpoints
    └── controllers/   # HTTP request handlers
```

### Key Architectural Patterns

- **Repository Pattern**: Abstract data access through interfaces
- **Builder Pattern**: Flexible object construction (UserBuilder)
- **Dependency Injection**: Leveraging NestJS built-in DI container
- **DTOs & Requests**: Data validation at the boundary layer

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | NestJS 11 |
| **Language** | TypeScript 5.7 |
| **Database** | PostgreSQL 14+ |
| **ORM** | TypeORM 0.3 |
| **Package Manager** | pnpm |
| **API Docs** | Swagger/OpenAPI |
| **Logging** | Pino |
| **Testing** | Jest, Supertest |
| **Validation** | class-validator, class-transformer |
| **Linting** | ESLint |
| **Formatting** | Prettier |

## 📦 Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher
- **PostgreSQL**: v14 or higher
- **Docker** (optional, for containerized development)

## 🚀 Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd backend
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

### 3. Database Setup

```bash
# Run migrations
pnpm migration:run

# Seed database with initial data
pnpm seed:run
```

## 🔐 Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=falconi_test
```

### Environment-Specific Notes

- **Development**: `synchronize: true` allows automatic schema updates (use with caution)
- **Production**: `synchronize: false` requires explicit migrations

## ▶️ Running the Application

### Development Mode

```bash
# Watch mode with hot reload
pnpm start:dev
```

The API will be available at `http://localhost:3000`  
Swagger docs at `http://localhost:3000/docs`

### Debug Mode

```bash
# With Node debugger
pnpm start:debug
```

### Production Mode

```bash
# Build the project
pnpm build

# Start the compiled application
pnpm start:prod
```

### Using Docker Compose

```bash
# Start services in development mode
docker-compose -f docker-compose.development.yaml up

# Start services in production mode
docker-compose up
```

## 🗄️ Database Management

### Migrations

Migrations are version-controlled database schema changes.

```bash
# Generate a new migration
pnpm migration:generate "CreateNewTable"

# Run pending migrations
pnpm migration:run

# Revert the last migration
pnpm migration:revert
```

**Location**: `src/infrastructure/persistence/migrations/`

### Database Seeding

Pre-populate the database with initial test data.

```bash
# Run all seeders
pnpm seed:run
```

**Seeders**:
- `01-CreateProfiles.seeder.ts` - Creates default profiles

**Location**: `src/infrastructure/persistence/seeds/`

## 📚 API Documentation

Interactive Swagger documentation is available at `/docs`

### Key Endpoints

#### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users (with optional profile filter)
- `GET /users/:userId` - Get user by ID
- `PUT /users/:userId` - Update user information
- `PUT /users/:userId/inactivate` - Inactivate a user
- `DELETE /users/:userId` - Delete a user

#### Profiles

- `GET /profile` - Retrieve all profiles
- `GET /profile/:id` - Retrieve profile by ID

### Request/Response Examples

**Create User**
```json
POST /users
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "profileId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Update User**
```json
PUT /users/550e8400-e29b-41d4-a716-446655440000
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com"
}
```

## 📁 Project Structure

### Core Domain

```
src/core/
├── common/
│   ├── abstraction/
│   │   └── base-repository.interface.ts
│   └── base.entity.ts
├── profiles/
│   ├── abstraction/
│   │   └── profiles-repository.interface.ts
│   └── entities/
│       └── profile.entity.ts
└── users/
    ├── abstraction/
    │   └── user-repository.interface.ts
    ├── builder/
    │   └── user.builder.ts
    └── entities/
        └── user.entity.ts
```

### Application Layer

```
src/application/
├── profiles/
│   └── services/
│       └── profiles.service.ts
└── users/
    ├── contracts/
    │   ├── createUser.request.ts
    │   └── updateUser.request.ts
    ├── dtos/
    │   └── findOneUserParam.dto.ts
    └── services/
        └── users.service.ts
```

### Infrastructure Layer

```
src/infrastructure/
└── persistence/
    ├── config/
    │   ├── data-source.config.ts
    │   └── database-seed.config.ts
    ├── factories/
    │   └── profile.factory.ts
    ├── migrations/
    └── repositories/
        ├── profiles/
        └── users/
    └── seeds/
        └── 01-CreateProfiles.seeder.ts
```

### Presentation Layer

```
src/presentation/
└── controllers/
    ├── profile/
    │   └── profile.controller.ts
    └── users/
        └── users.controller.ts
```

## 💻 Development

### Code Generation

Use NestJS CLI to scaffold new components:

```bash
# Generate a new service
pnpm gen-service

# Generate a new controller
pnpm gen-controller

# Generate a new module
pnpm gen-module
```

### Code Formatting & Linting

```bash
# Format code with Prettier
pnpm format

# Lint and fix with ESLint
pnpm lint
```

### Code Style

- **Language**: TypeScript with strict mode enabled
- **Formatter**: Prettier (configured in `package.json`)
- **Linter**: ESLint with TypeScript support
- **Class Naming**: PascalCase (e.g., `UsersController`, `UsersService`)
- **File Naming**: kebab-case for files with entity/interface name

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Watch mode for development
pnpm test:watch

# Generate coverage report
pnpm test:cov

# Debug mode
pnpm test:debug
```

### E2E Tests

```bash
# Run end-to-end tests
pnpm test:e2e
```

**Test Location**: `test/app.e2e-spec.ts`

### Test Configuration

- **Framework**: Jest
- **Coverage Directory**: `coverage/`
- **Test Pattern**: `*.spec.ts`

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `pnpm start` | Start the application |
| `pnpm start:dev` | Start with file watching and hot reload |
| `pnpm start:debug` | Start with debugger enabled |
| `pnpm start:prod` | Run production build |
| `pnpm build` | Build the project |
| `pnpm format` | Format code with Prettier |
| `pnpm lint` | Lint and fix code with ESLint |
| `pnpm test` | Run all unit tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:cov` | Run tests with coverage report |
| `pnpm test:debug` | Debug tests with Node inspector |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm migration:generate` | Generate a new database migration |
| `pnpm migration:run` | Run pending migrations |
| `pnpm migration:revert` | Revert the last migration |
| `pnpm seed:run` | Run database seeders |
| `pnpm gen-service` | Generate a new service with NestJS CLI |
| `pnpm gen-controller` | Generate a new controller with NestJS CLI |
| `pnpm gen-module` | Generate a new module with NestJS CLI |

## 🔍 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Swagger/OpenAPI Specification](https://swagger.io)

## 📝 License

Unlicensed - Internal Project

## 👥 Contributing

This is a test project. For questions or contributions, please contact me.
