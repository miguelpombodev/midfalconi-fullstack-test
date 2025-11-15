# Falconi Fullstack Test - Frontend

<p align="center">
<img style="width: 12%" src="https://img.shields.io/badge/next.js-000000?logo=nextjs&logoColor=white" alt="Next.js">
<img style="width: 12%" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" alt="React">
<img style="width: 14%" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
<img style="width: 16%" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

A modern frontend application built with Next.js 16, React 19, and Tailwind CSS that manages users and profiles. This project demonstrates best practices in development with TypeScript, reusable React components, and integration with a REST API.

## 📋 Table of Contents

- [Overview](#-overview)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation and Setup](#-installation-and-setup)
- [Starting Development](#-starting-development)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Main Components](#-main-components)
- [API Services](#-api-services)
- [Docker](#-docker)
- [Docker Compose](#-docker-compose)
- [Production Build](#-production-build)
- [Available Commands](#-available-commands)
- [Additional Resources](#-additional-resources)

## 🎯 Overview

The Falconi Frontend is a complete web interface that enables:

- ✅ **Manage Users**: Create, view, update, and delete users
- ✅ **Filter by Profile**: Filter users by their associated profiles
- ✅ **Real-time Search**: Search users by name or email
- ✅ **Enable/Disable Users**: Manage user status
- ✅ **Responsive Interface**: Design adaptable for desktop and mobile
- ✅ **Toast Notifications**: Visual feedback for user actions
- ✅ **Interactive Modals**: Creation, editing, and action confirmation

## 🛠️ Technologies Used

### Core
| Technology | Version | Description |
|------------|---------|-----------|
| **Next.js** | 16.0.3 | React framework with SSR and optimizations |
| **React** | 19.2.0 | Library for building interfaces |
| **React DOM** | 19.2.0 | React integration with DOM |
| **TypeScript** | 5 | Static typing for JavaScript |

### Styling & UI
| Technology | Version | Description |
|------------|---------|-----------|
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Tailwind Forms** | 0.5.0 | Plugin for styling forms |
| **PostCSS** | 8.4.0 | Tool for transforming CSS |
| **Autoprefixer** | 10.4.0 | Automatically adds CSS prefixes |

### Components & Notifications
| Technology | Version | Description |
|------------|---------|-----------|
| **Heroicons** | 2.2.0 | High-quality SVG icons |
| **React Hot Toast** | 2.6.0 | Non-intrusive toast notifications |

### Development
| Technology | Version | Description |
|------------|---------|-----------|
| **ESLint** | 9 | Linter for JavaScript/TypeScript |
| **ESLint Config Next** | 16.0.3 | ESLint configuration for Next.js |

## 📦 Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher (recommended)
- **Docker** (optional, for containerization)
- **Docker Compose** (optional, for orchestration)

## 🚀 Installation and Setup

### 1. Clone and Install Dependencies

```bash
cd frontend
pnpm install
```

### 2. Configure Environment Variables

```bash
# Create .env file based on .env.example
cp .env.example .env
```

### 3. Verify Configuration

```bash
# The .env file should contain:
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 💻 Starting Development

### Development Mode with Hot Reload

```bash
pnpm start:dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

Any changes to the files will be automatically reflected in the browser.

### Development with Debugging

```bash
# Open React DevTools
pnpm start:dev
# Press Shift + Ctrl/Cmd + J to open React DevTools
```

## 🔐 Environment Variables

Create a `.env` or `.env.local` file in the root of the frontend project:

```env
# Backend API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Note: Variables prefixed with NEXT_PUBLIC_ are exposed to the browser
# Do NOT put sensitive information in these variables
```

### Different Environments

**Development (`.env.development.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Production (`.env.production.local`)**
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static files (images, icons, etc)
│   ├── favicon.ico
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ConfirmationModal.tsx
│   │   ├── Header.tsx
│   │   ├── UserFormModal.tsx
│   │   ├── UserList.tsx
│   │   └── UserListSkeleton.tsx
│   ├── pages/            # Pages and routes
│   │   ├── _app.tsx      # Main app and global providers
│   │   ├── _document.tsx # Custom HTML document
│   │   ├── index.tsx     # Home page (user manager)
│   │   └── api/          # API routes (if needed)
│   ├── services/         # API integration services
│   │   └── api.ts
│   ├── styles/           # Global styles
│   │   └── globals.css
│   └── types/            # TypeScript types
│       └── index.ts
├── .env                  # Environment variables
├── docker-compose.yml    # Docker orchestration
├── Dockerfile           # Docker image definition
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🧩 Main Components

### UserList
Displays all users with options to edit, delete, and enable/disable.

**Props:**
- `users`: Array of users
- `onEdit`: Callback on edit click
- `onDelete`: Callback on delete click
- `onToggleActive`: Callback on status change

### UserFormModal
Modal for creating or editing users with form validation.

**Props:**
- `isOpen`: Controls modal visibility
- `onClose`: Callback on close
- `onSubmit`: Callback on form submission
- `initialData`: Initial data (for editing)
- `profiles`: List of available profiles
- `isSubmitting`: Indicates loading state

### ConfirmationModal
Confirmation modal for destructive actions such as deletion.

**Props:**
- `isOpen`: Controls visibility
- `onClose`: Callback on cancel
- `onConfirm`: Callback on confirm
- `title`: Modal title
- `message`: Confirmation message
- `isSubmitting`: Indicates loading state

### UserListSkeleton
Loading skeleton while data is being fetched.

### Header
Application header with logo and navigation.

## 🔌 API Services

The `src/services/api.ts` file contains all functions for backend communication:

```typescript
// Fetch all profiles
getProfiles(): Promise<Profile[]>

// Fetch all users (with optional filter by profile)
getUsers(profileId?: string): Promise<User[]>

// Create new user
createUser(data: CreateUserDto): Promise<void>

// Update user
updateUser(id: string, data: UpdateUserDto): Promise<void>

// Inactivate user
inactivateUser(id: string): Promise<void>

// Activate user
activateUser(id: string): Promise<void>

// Delete user
deleteUser(id: string): Promise<void>
```

### Error Handling

All requests include automatic error handling:

```typescript
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }
  // ... rest of handling
};
```

## 🐳 Docker

### Building Docker Image

```bash
# Build the image with a tag
docker build -t falconi-frontend:latest .

# Build with a specific name
docker build -t my-username/falconi-frontend:v1.0 .
```

### Running Docker Container

```bash
# Run image as container
docker run -d \
  -p 3000:3000 \
  --name falconi-frontend \
  -e NEXT_PUBLIC_API_URL=http://localhost:3000 \
  falconi-frontend:latest

# Stop container
docker stop falconi-frontend

# Remove container
docker rm falconi-frontend

# View logs
docker logs -f falconi-frontend
```

### Dockerfile Explained

The Dockerfile uses a **two-stage build** to optimize image size:

**Stage 1: Builder**
- Uses `node:20-alpine` as base
- Installs pnpm globally
- Copies `package.json` and `pnpm-lock.yaml`
- Installs all dependencies
- Copies source code
- Compiles Next.js project

**Stage 2: Runner**
- Uses `node:20-alpine` as clean base
- Installs only production dependencies
- Creates non-root user (`appuser`) for security
- Copies `.next`, `public` and configs from builder
- Runs as non-root user
- Exposes port 3000
- Command: `pnpm start`

**Benefits:**
- Final image much smaller (~200MB vs ~1GB)
- Improved security (non-root user)
- Faster builds with caching

## 🚀 Docker Compose

### Overview

The `docker-compose.yml` file orchestrates multiple services to run the entire stack locally:

```
Frontend (port 3001) ← → API (port 3000) ← → PostgreSQL (5432)
                                          ← → Redis (6379)
                                          ← → Jaeger (16686)
```

### docker-compose.yml File

```yaml
version: "3.4"

services:
  frontend:
    build:
      context: ../frontend
      dockerfile: Dockerfile
    ports:
      - "3001:3000"        # Frontend available at localhost:3001
    environment:
      - NEXT_PUBLIC_API_URL=http://api:3000

  api:
    build:
      context: .
    ports:
      - "3000:3000"        # API available at localhost:3000
    environment:
      - DB_HOST=database   # Connects to database service
      - REDIS_HOST=redis   # Connects to redis service

  database:                # PostgreSQL
    image: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:                   # Redis Cache
    image: redis
    ports:
      - "6379:6379"

  jaeger:                  # Jaeger Tracing
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"      # UI at localhost:16686

networks:
  falconi_net:
    driver: bridge
```

### Using Docker Compose

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs in real-time
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Remove volumes (database)
docker-compose down -v

# Rebuild images
docker-compose build

# Rebuild and start
docker-compose up --build
```

### Accessing Services via Docker Compose

| Service | Local Host | Docker Host | Port |
|---------|-----------|-----------|-------|
| Frontend | http://localhost:3001 | http://frontend:3000 | 3001:3000 |
| API | http://localhost:3000 | http://api:3000 | 3000:3000 |
| PostgreSQL | localhost:5432 | database:5432 | 5432:5432 |
| Redis | localhost:6379 | redis:6379 | 6379:6379 |
| Jaeger UI | http://localhost:16686 | jaeger:16686 | 16686:16686 |

**Note:** When running via Docker Compose, use service names instead of localhost for inter-container communication.

### Environment Variables in Docker Compose

The `docker-compose.yml` file defines:

```yaml
environment:
  - NEXT_PUBLIC_API_URL=http://api:3000
```

This allows the frontend (inside the container) to communicate with the API using the service name.

### Docker Compose Troubleshooting

**Problem: "Cannot connect to api:3000"**
```bash
# Solution: Ensure containers are on the same network
docker-compose ps
docker-compose logs api
```

**Problem: "Port 3001 already in use"**
```bash
# Find process using the port
lsof -i :3001

# Change port in docker-compose.yml
ports:
  - "3002:3000"  # Use different port
```

**Problem: "Database connection refused"**
```bash
# Ensure database initialized
docker-compose logs database

# Add healthcheck and depends_on in docker-compose.yml
```

## 🏗️ Production Build

### Build Optimized Version

```bash
# Optimized build
pnpm build

# Start production server
pnpm start
```

### Verify Build

```bash
# Check generated files
ls -la .next/

# Build size
du -sh .next/
```

### Production Optimizations

Next.js automatically applies:
- Code minification
- Code splitting per route
- Asset compression
- Image optimization
- Tree-shaking of unused dependencies

## 📜 Available Commands

| Command | Description |
|---------|-------------|
| `pnpm start:dev` | Start development server with hot reload |
| `pnpm build` | Compile project for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint to check code |

## 🔍 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs) - Official documentation
- [React Documentation](https://react.dev) - React guide
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Tailwind CSS](https://tailwindcss.com/docs) - Tailwind documentation
- [Heroicons](https://heroicons.com) - Icon library
- [React Hot Toast](https://react-hot-toast.com) - Toast documentation
- [Docker Documentation](https://docs.docker.com) - Docker guide

## 📝 License

Unlicensed - Internal Project

## 👥 Contributing

This is a test project. For questions or contributions, please contact the development team.
