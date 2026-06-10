# Unified CRM/ERP SaaS Platform

[![CI](https://github.com/m1hamuha/SaaS-platform-CRM-ERP-/actions/workflows/ci.yml/badge.svg)](https://github.com/m1hamuha/SaaS-platform-CRM-ERP-/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A modern, multi-tenant CRM and ERP platform with role-based access, integrated payments, and a CI/CD pipeline. Built with NestJS (backend), Next.js (frontend), PostgreSQL, Redis, and Docker.

## ✨ Features

- **Multi-tenancy**: Database-level isolation using PostgreSQL Row-Level Security (RLS)
- **Role-Based Access Control (RBAC)**: Hierarchical permissions with fine-grained access control
- **Authentication**: JWT-based auth with refresh token rotation
- **Payment Processing**: Stripe Connect integration for handling payments
- **Async Operations**: Background job processing with Bull queues (Redis)
- **Monitoring**: Comprehensive observability with logging and metrics
- **CI/CD**: GitHub Actions workflows for automated testing and deployment
- **Containerized**: Docker Compose for local development and production deployment

### 🗺️ Roadmap (not yet implemented)

- OAuth 2.0 / social login providers
- Automated reporting with PDF/Excel/CSV exports
- RabbitMQ-based event processing (currently Bull/Redis)
- Multi-factor authentication (MFA)

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend"
        FE[Next.js 14 App]
    end
    
    subgraph "Backend"
        API[NestJS API]
        Auth[JWT Auth Service]
        RBAC[RBAC Service]
        Org[Organization Service]
        Cust[Customer Service]
    end
    
    subgraph "Infrastructure"
        DB[(PostgreSQL)]
        Cache[(Redis)]
        MQ[(Bull Queues / Redis)]
        Stripe[Stripe API]
    end
    
    FE --> API
    API --> Auth
    API --> RBAC
    API --> Org
    API --> Cust
    API --> DB
    API --> Cache
    API --> MQ
    Cust --> Stripe
```

## 📁 Project Structure

```
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── auth/              # Authentication & authorization
│   │   ├── config/            # Configuration management
│   │   ├── customers/         # Customer management
│   │   ├── organizations/     # Multi-tenant organization management
│   │   ├── users/             # User management
│   │   ├── database/          # Database configuration
│   │   └── middleware/        # HTTP middleware
│   ├── test/                  # Backend tests
│   │   ├── smoke/             # Smoke tests
│   │   └── acceptance/        # Acceptance tests
│   └── package.json
├── frontend/                  # Next.js 14 application
│   ├── app/                   # App Router pages
│   ├── test/                  # Frontend tests
│   └── package.json
├── docker/                    # Docker configurations
│   └── postgres/              # PostgreSQL setup with RLS
├── scripts/                   # Utility scripts
│   ├── health-check/          # Infrastructure health checks
│   ├── run-bvt.sh             # Build Verification Test runner
│   └── run-bvt.ps1            # BVT runner for Windows
├── docs/                      # Documentation
│   ├── bvt-quickstart.md      # BVT quick start guide
│   ├── bvt-runbook.md         # BVT runbook
│   └── bvt-smoke-testing-design.md
├── .github/workflows/         # CI/CD workflows
│   ├── ci.yml                 # Continuous integration
│   └── bvt.yml                # Build Verification Tests
├── docker-compose.yml         # Local development environment
├── LICENSE                    # MIT License
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm/yarn
- **Docker & Docker Compose** (for local development)
- **Git** (for version control)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/m1hamuha/SaaS-platform-CRM-ERP-.git
   cd SaaS-platform-CRM-ERP-
   ```

2. **Start infrastructure services**
   ```bash
   docker-compose up -d
   ```
   This starts PostgreSQL, Redis, and RabbitMQ (RabbitMQ is provisioned for future use; the backend currently uses Bull/Redis for queues).

3. **Set up the backend**
   ```bash
   cd backend
   npm install
   npm run seed       # create demo organization + admin user + sample data
   npm run start:dev
   ```
   The seeder prints demo login credentials (default: `admin@demo.local` / `Demo1234!`,
   override with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).
   The API will be available at `http://localhost:3001`.

4. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

5. **Run tests** (optional)
   ```bash
   # Backend tests
   cd backend
   npm test
   
   # Frontend tests
   cd ../frontend
   npm test
   ```

## ⚙️ Configuration

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories. Use the provided examples:

**Backend (.env.example):**
```env
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=crm_erp
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=900
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_REFRESH_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Frontend (.env.example):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

Copy the examples:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Database Setup

The PostgreSQL container includes Row-Level Security (RLS) policies for multi-tenancy. Initial schema and seed data are applied automatically via Docker initialization scripts.

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Jest for backend, React Testing Library for frontend
- **Integration Tests**: End-to-end API tests
- **Smoke Tests**: Infrastructure and basic functionality verification
- **Acceptance Tests**: Business requirement validation
- **Build Verification Tests (BVT)**: Automated validation of the complete system

Run the BVT suite locally:
```bash
./scripts/run-bvt.sh
# or on Windows
./scripts/run-bvt.ps1
```

## 🔧 Development

### Code Quality

- **TypeScript**: Strict type checking across both backend and frontend
- **ESLint**: Code linting with custom rules
- **Prettier**: Consistent code formatting

### Available Scripts

**Backend:**
```bash
cd backend
npm run start:dev      # Start development server
npm run build          # Build for production
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:smoke     # Run smoke tests
npm run lint           # Lint code
npm run format         # Format code
```

**Frontend:**
```bash
cd frontend
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run test           # Run tests
npm run lint           # Lint code
```

## 📊 CI/CD

GitHub Actions workflows automate the development pipeline:

- **CI Pipeline** (`ci.yml`): Runs on every push/PR
  - Linting and formatting checks
  - Unit and integration tests
  - Security scanning
  - Build verification

- **BVT Pipeline** (`bvt.yml`): Runs on schedule and manual trigger
  - Full infrastructure deployment
  - Smoke and acceptance tests
  - Performance and health checks

## 🐳 Docker Deployment

### Production Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d --build
```

### Customizing Deployment

Edit `docker-compose.yml` or create environment-specific compose files to adjust:
- Database configuration
- Resource limits
- Network settings
- Volume mounts

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- Code of Conduct
- How to submit issues
- Pull request process
- Development guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

- [Technical Specification](docs/planning/tech.md) - Detailed technical architecture and design decisions
- [Project Execution Plan](docs/planning/pep.md) - Project planning and execution details
- [Work Breakdown Structure](docs/planning/wbs.md) - Task breakdown and scheduling
- [BVT Quick Start](docs/bvt-quickstart.md) - Build Verification Test guide
- [BVT Runbook](docs/bvt-runbook.md) - Operational runbook for BVT

## 🆘 Support

- **Issues**: Use the [GitHub Issues](https://github.com/m1hamuha/SaaS-platform-CRM-ERP-/issues) page
- **Discussions**: Join the [GitHub Discussions](https://github.com/m1hamuha/SaaS-platform-CRM-ERP-/discussions) for questions and ideas

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [Next.js](https://nextjs.org/) - The React framework for production
- [PostgreSQL](https://www.postgresql.org/) - The world's most advanced open-source database
- [Docker](https://www.docker.com/) - Container platform
- [Stripe](https://stripe.com/) - Payments infrastructure

---

**Note**: This is a demonstration project for educational purposes. Not intended for production use without proper security review and customization.