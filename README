# Falconi Fullstack Test - Complete Solution

<p align="center">
  <img style="width: 13%" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img style="width: 12%" src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS">
  <img style="width: 12%" src="https://img.shields.io/badge/Next.js-000000?logo=nextjs&logoColor=white" alt="Next.js">
  <img style="width: 14%" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" alt="React">
  <img style="width: 14%" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img style="width: 11%" src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img style="width: 10%" src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker">
  <img style="width: 10%" src="https://img.shields.io/badge/Redis-DD0031?logo=redis&logoColor=white" alt="Redis">
</p>

A complete fullstack web application for managing users and profiles, demonstrating best practices in modern web development with TypeScript, NestJS, Next.js, and enterprise-level architecture patterns.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Challenge Requirements](#-challenge-requirements)
- [Project Structure](#-project-structure)
- [Core Technologies](#-core-technologies)
- [Key Features](#-key-features)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Architecture & Design Decisions](#-architecture--design-decisions)
- [Future Improvements](#-future-improvements)

---

## 🎯 Project Overview

This is a fullstack solution to a technical challenge that evaluates:
- ✅ RESTful API architecture and best practices
- ✅ Frontend consumption of backend APIs
- ✅ Project organization and code clarity
- ✅ Consistent use of TypeScript across the stack

The application provides complete user and profile management with a modern, responsive interface and a robust backend API with enterprise-level features like caching, distributed tracing, and database migrations.

---

## 📋 Challenge Requirements

### Functional Requirements ✅

#### User Management
- ✅ **Create** users with first name, last name, email, and profile assignment
- ✅ **Read** users individually (by ID) or as a list
- ✅ **Update** user information
- ✅ **Delete** users permanently
- ✅ **Activate/Inactivate** users without deletion

#### Profile Management
- ✅ **List** all available profiles
- ✅ **Retrieve** profiles by ID

#### Filtering & Search
- ✅ **Filter** users by profile ID
- ✅ **Search** users by name or email (client-side)

### Data Model ✅

```typescript
User {
  id: string (UUID)
  firstName: string
  lastName: string
  email: string (unique)
  isActive: boolean (default: true)
  profileId: string (FK to Profile)
  profile: Profile (relationship)
  createdAt: Date
  updatedAt: Date
}

Profile {
  id: string (UUID)
  name: string
  users: User[] (one-to-many relationship)
  createdAt: Date
  updatedAt: Date
}
```

### Technical Requirements ✅

- ✅ **100% TypeScript** - All code written in TypeScript with strict mode
- ✅ **NestJS Backend** - Enterprise-grade REST API framework
- ✅ **Next.js Frontend** - React framework with SSR and optimization
- ✅ **PostgreSQL Database** - Persistent data storage with TypeORM
- ✅ **RESTful API** - Proper HTTP methods and status codes
- ✅ **Appropriate Status Codes** - 201 (Created), 204 (No Content), 200 (OK), 400 (Bad Request), etc.

### Differentials Implemented ✅

- ✅ **Clear Project Structure** - Clean architecture with separated layers
- ✅ **Clean Code Practices** - SOLID principles, design patterns, type safety
- ✅ **Comprehensive Documentation** - This README with all requirements covered
- ✅ **Docker Support** - Containerization for development and production
- ✅ **Redis Caching** - Performance optimization layer
- ✅ **Distributed Tracing** - Jaeger & OpenTelemetry for observability
- ✅ **Database Migrations** - Version-controlled schema evolution
- ✅ **Database Seeding** - Pre-populated test data
- ✅ **Testing** - Unit and E2E tests with Jest
- ✅ **Swagger Documentation** - Interactive API documentation

---

## 🗂️ Project Structure

```
falconi-fullstack-test/
│
├── backend/                          # NestJS REST API Server
│   ├── src/
│   │   ├── app.module.ts            # Root application module
│   │   ├── main.ts                  # Application entry point
│   │   ├── instrumentation.ts       # OpenTelemetry setup
│   │   │
│   │   ├── core/                    # Domain layer (business logic)
│   │   │   ├── common/
│   │   │   │   ├── base.entity.ts
│   │   │   │   └── abstraction/
│   │   │   ├── users/
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.entity.ts
│   │   │   │   ├── builder/
│   │   │   │   │   └── user.builder.ts
│   │   │   │   └── abstraction/
│   │   │   │       └── user-repository.interface.ts
│   │   │   └── profiles/
│   │   │       ├── entities/
│   │   │       │   └── profile.entity.ts
│   │   │       └── abstraction/
│   │   │           └── profiles-repository.interface.ts
│   │   │
│   │   ├── application/              # Application layer (use cases)
│   │   │   ├── application.module.ts
│   │   │   ├── users/
│   │   │   │   ├── services/
│   │   │   │   │   └── users.service.ts
│   │   │   │   ├── contracts/
│   │   │   │   │   ├── createUser.request.ts
│   │   │   │   │   └── updateUser.request.ts
│   │   │   │   └── dtos/
│   │   │   └── profiles/
│   │   │       └── services/
│   │   │           └── profiles.service.ts
│   │   │
│   │   ├── infrastructure/           # Infrastructure layer (external services)
│   │   │   ├── infrastructure.module.ts
│   │   │   └── persistence/
│   │   │       ├── config/
│   │   │       │   ├── data-source.config.ts
│   │   │       │   └── database-seed.config.ts
│   │   │       ├── migrations/
│   │   │       │   └── 1763130915317-StartDatabaseStructure.ts
│   │   │       ├── repositories/
│   │   │       │   ├── users/
│   │   │       │   │   └── users.repository.ts
│   │   │       │   └── profiles/
│   │   │       │       └── profiles.repository.ts
│   │   │       ├── factories/
│   │   │       │   └── profile.factory.ts
│   │   │       └── seeds/
│   │   │           └── 01-CreateProfiles.seeder.ts
│   │   │
│   │   └── presentation/             # Presentation layer (HTTP controllers)
│   │       ├── presentation.module.ts
│   │       └── controllers/
│   │           ├── users/
│   │           │   └── users.controller.ts
│   │           └── profile/
│   │               └── profile.controller.ts
│   │
│   ├── test/                         # End-to-End tests
│   │   ├── app.e2e-spec.ts
│   │   ├── fixtures/
│   │   ├── mocks/
│   │   └── jest-e2e.json
│   │
│   ├── Dockerfile                    # Production Docker image
│   ├── docker-compose.development.yaml
│   ├── docker-compose.yaml
│   ├── docker-entrypoint.sh
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── README.md
│
├── frontend/                          # Next.js React Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.tsx              # App wrapper and global setup
│   │   │   ├── _document.tsx         # Custom HTML document
│   │   │   ├── index.tsx             # Home page (user manager)
│   │   │   └── api/
│   │   │       └── hello.ts
│   │   │
│   │   ├── components/               # Reusable React components
│   │   │   ├── Header.tsx            # App header
│   │   │   ├── UserList.tsx          # Users table display
│   │   │   ├── UserFormModal.tsx     # Create/Edit user modal
│   │   │   ├── ConfirmationModal.tsx # Delete confirmation modal
│   │   │   └── UserListSkeleton.tsx  # Loading skeleton
│   │   │
│   │   ├── services/
│   │   │   └── api.ts                # API client with all endpoints
│   │   │
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript type definitions
│   │   │
│   │   └── styles/
│   │       └── globals.css           # Global CSS and Tailwind imports
│   │
│   ├── public/                        # Static assets
│   │   ├── favicon.ico
│   │   └── ...
│   │
│   ├── Dockerfile                    # Production Docker image
│   ├── docker-compose.yml            # Full stack orchestration
│   ├── next.config.ts                # Next.js configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── package.json
│   └── README.md
│
├── README.md                          # This file (project overview)
└── docker-compose.yml                # Full-stack orchestration (at root)
```

---

## 🛠️ Core Technologies

### Backend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **NestJS** | 11.0.1 | REST API framework with DI and modular architecture |
| **TypeScript** | 5.7.3 | Static typing and modern JS features |
| **TypeORM** | 0.3.27 | Object-relational mapping with migrations |
| **PostgreSQL** | 14+ | Relational database |
| **Redis** | 7.0+ | Caching and performance optimization |
| **Pino** | Latest | Structured JSON logging |
| **Swagger** | 11.2.1 | Interactive API documentation |
| **OpenTelemetry** | Latest | Distributed tracing and observability |
| **Jest** | 29.7.0 | Unit and E2E testing |

### Frontend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.0.3 | React framework with SSR and optimization |
| **React** | 19.2.0 | UI component library |
| **TypeScript** | 5 | Static typing |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Heroicons** | 2.2.0 | Icon library |
| **React Hot Toast** | 2.6.0 | Toast notifications |
| **ESLint** | 9 | Code linting |

### DevOps & Tools

| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **pnpm** | Fast, disk space efficient package manager |
| **Jaeger** | Distributed tracing UI |

---

## ✨ Key Features

### Backend Features

- 🏗️ **Clean Architecture** - Separated layers (Core, Application, Infrastructure, Presentation)
- 🔄 **RESTful API** - Proper HTTP methods and status codes
- 🏷️ **Entity Relationships** - User-Profile one-to-many relationship with TypeORM
- 🔍 **Data Validation** - Class-validator and class-transformer for DTO validation
- 💾 **Database Migrations** - Version-controlled schema evolution with TypeORM
- 🌱 **Database Seeding** - Pre-populated profiles with typeorm-seeding
- 🔐 **Structured Logging** - Pino with JSON output
- 📚 **Swagger Documentation** - Interactive API docs at `/docs`
- ⚡ **Redis Caching** - Performance optimization with cache-manager
- 🔍 **Distributed Tracing** - Jaeger & OpenTelemetry integration
- 🧪 **Testing** - Unit tests with Jest and E2E test suite

### Frontend Features

- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔌 **API Integration** - Complete integration with backend REST API
- 🎯 **User Management** - Create, read, update, delete, and filter users
- 👤 **Profile Filtering** - Filter users by associated profiles
- 🔍 **Real-time Search** - Client-side search by name or email
- 📋 **Status Management** - Activate/deactivate users
- 🎨 **Interactive Modals** - Create, edit, and delete confirmation flows
- 🔔 **Toast Notifications** - User-friendly feedback with React Hot Toast
- ⚡ **Loading States** - Skeleton loaders during data fetching
- ♿ **Type Safety** - 100% TypeScript for better DX and safety

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0+
- **pnpm** v8.0.0+
- **Docker** and **Docker Compose** (optional)
- **PostgreSQL** 14+ (or use Docker)

### Quick Start with Docker Compose

The easiest way to run the entire stack:

```bash
# Clone the repository
git clone <repository-url>
cd falconi-fullstack-test

# Start all services (Frontend, Backend, PostgreSQL, Redis, Jaeger)
docker-compose -f docker-compose.yml up

# Access the application
# Frontend:  http://localhost:3001
# Backend:   http://localhost:3000
# API Docs:  http://localhost:3000/docs
# Jaeger UI: http://localhost:16686
```

### Manual Setup

#### Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
pnpm migration:run

# Seed initial data
pnpm seed:run

# Start development server
pnpm start:dev

# Server will be available at http://localhost:3000
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Configure environment
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF

# Start development server
pnpm start:dev

# Application will be available at http://localhost:3000
```

### Build for Production

```bash
# Backend
cd backend
pnpm build
pnpm start:prod

# Frontend
cd frontend
pnpm build
pnpm start
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Interactive Documentation
```
http://localhost:3000/docs
```

### User Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|---------|
| `POST` | `/users` | Create a new user | 201, 400 |
| `GET` | `/users` | List all users (optional filter by profile) | 200 |
| `GET` | `/users/:userId` | Get user by ID | 200, 404 |
| `PUT` | `/users/:userId` | Update user information | 204, 400, 404 |
| `PUT` | `/users/:userId/inactivate` | Inactivate a user | 204, 404 |
| `DELETE` | `/users/:userId` | Delete a user | 204, 404 |

### Profile Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|---------|
| `GET` | `/profile` | List all profiles | 200 |
| `GET` | `/profile/:id` | Get profile by ID | 200, 404 |

### Example Requests

**Create User**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "profileId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**List Users with Profile Filter**
```bash
curl http://localhost:3000/users?profile=550e8400-e29b-41d4-a716-446655440000
```

**Update User**
```bash
curl -X PUT http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com"
  }'
```

---

## 🏗️ Architecture & Design Decisions

### Backend Architecture

#### Clean Architecture Layers

1. **Core Layer** (`/src/core`)
   - Pure business logic and domain entities
   - Defines interfaces for repositories
   - No dependencies on external frameworks

2. **Application Layer** (`/src/application`)
   - Orchestrates use cases and business logic
   - Services implementing application workflows
   - Request/Response DTOs for validation

3. **Infrastructure Layer** (`/src/infrastructure`)
   - Implements repository interfaces
   - Database configuration and migrations
   - External services and adapters

4. **Presentation Layer** (`/src/presentation`)
   - HTTP controllers and route handlers
   - Request parsing and response formatting
   - Swagger documentation

#### Design Patterns Used

- **Repository Pattern** - Abstract data access through interfaces
- **Builder Pattern** - Flexible object construction (UserBuilder)
- **Dependency Injection** - Leveraging NestJS DI container
- **DTO Pattern** - Data validation at boundary layer
- **Service Layer** - Encapsulation of business logic

### Frontend Architecture

#### Component Structure

- **Page Components** - Route handlers in `/pages`
- **UI Components** - Reusable components in `/components`
- **Services** - API client layer in `/services`
- **Types** - TypeScript definitions for type safety

#### State Management

- **React Hooks** - useState and useEffect for local state
- **Custom Hooks** - Potential for extracting logic (future improvement)
- **Toast Notifications** - Non-intrusive feedback mechanism

### Key Decisions

1. **TypeScript Everywhere** - Strict mode for maximum type safety across the stack

2. **PostgreSQL Instead of In-Memory** - While the challenge allowed in-memory data, we used PostgreSQL for:
   - Real-world applicability
   - Demonstrating ORM skills
   - Migration and seeding capabilities

3. **Docker Compose for Development** - Unified environment setup for all developers

4. **Redis Caching** - Performance optimization layer for frequently accessed data

5. **Distributed Tracing** - OpenTelemetry & Jaeger for observability in production

6. **Comprehensive Testing** - Jest for unit and E2E tests

---

## 🔮 Future Improvements & Suggestions

### Backend Enhancements

- [ ] **Authentication & Authorization** - JWT-based auth with role-based access control
- [ ] **Pagination** - Implement cursor or offset pagination for large datasets
- [ ] **Advanced Filtering** - Complex query filters and full-text search
- [ ] **Soft Deletes** - Archive users instead of permanent deletion
- [ ] **Audit Logging** - Track all changes with timestamp and user info
- [ ] **GraphQL** - Add GraphQL API alongside REST
- [ ] **Rate Limiting** - Protect endpoints from abuse
- [ ] **API Versioning** - Support multiple API versions
- [ ] **Webhook Support** - Event-driven architecture with webhooks
- [ ] **File Upload** - User profile pictures or document uploads

### Frontend Enhancements

- [ ] **State Management** - Redux or Zustand for complex state
- [ ] **Form Validation** - React Hook Form with advanced validation
- [ ] **Internationalization** - i18n support for multiple languages
- [ ] **Dark Mode** - Theme switcher for dark/light modes
- [ ] **Accessibility** - WCAG compliance improvements
- [ ] **Performance** - Code splitting and lazy loading
- [ ] **PWA Features** - Service workers and offline support
- [ ] **Advanced Search** - Debounced API-based search
- [ ] **Bulk Operations** - Multi-select and bulk actions
- [ ] **Export/Import** - CSV export and bulk user import

### DevOps & Infrastructure

- [ ] **CI/CD Pipeline** - GitHub Actions or GitLab CI
- [ ] **Kubernetes** - K8s deployment manifests
- [ ] **Database Replication** - High availability setup
- [ ] **Load Balancing** - Nginx or HAProxy configuration
- [ ] **Environment-Specific Config** - Dev, staging, production configs
- [ ] **Health Checks** - Liveness and readiness probes
- [ ] **Monitoring Dashboard** - Grafana dashboards with Prometheus
- [ ] **Log Aggregation** - ELK Stack or similar
- [ ] **Backup Strategy** - Automated database backups
- [ ] **Security Scanning** - Container scanning and code analysis

### Documentation

- [ ] **API Postman Collection** - For API testing
- [ ] **Architecture Decision Records** - ADRs for major decisions
- [ ] **Deployment Guide** - Step-by-step production deployment
- [ ] **Video Tutorial** - Walkthrough of the application
- [ ] **Database Schema Diagram** - Visual ER diagram
- [ ] **Architecture Diagram** - System design visualization

---

## 📦 Project Structure in Brief

```
Backend:   NestJS + TypeORM + PostgreSQL + Redis
Frontend:  Next.js + React + Tailwind CSS
DevOps:    Docker + Docker Compose + Jaeger
Testing:   Jest for unit and E2E tests
```

---

## 🔗 Quick Links

- **Backend README** - [./backend/README.md](./backend/README.md)
- **Frontend README** - [./frontend/README.md](./frontend/README.md)
- **API Documentation** - http://localhost:3000/docs (when running)
- **Jaeger Tracing** - http://localhost:16686 (when running)

---

## 📝 License

Unlicensed - Technical Challenge Project

## 👥 Author

- **Miguel Pombo** - [GitHub](https://github.com/miguelpombodev)

---

## ✅ Checklist - Requirements Covered

- ✅ RESTful API with proper HTTP methods and status codes
- ✅ Frontend consuming backend API
- ✅ Well-organized project structure
- ✅ 100% TypeScript with strict mode
- ✅ NestJS for backend
- ✅ Next.js for frontend
- ✅ User and Profile entity management
- ✅ Create, Read, Update, Delete operations
- ✅ User activation/deactivation
- ✅ Profile filtering
- ✅ Comprehensive README
- ✅ Docker support
- ✅ Database persistence
- ✅ Clean code and best practices
- ✅ Testing infrastructure
- ✅ Swagger documentation
- ✅ Redis caching
- ✅ Distributed tracing with Jaeger
- ✅ Future improvements suggestions

---

<p align="center">
  <strong>Built with ❤️ using TypeScript, NestJS, and Next.js</strong>
</p>
