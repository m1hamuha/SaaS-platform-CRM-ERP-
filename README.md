# Unified CRM/ERP SaaS Platform

A multi-tenant CRM and ERP platform with role-based access, integrated payments, and automated reporting.

## Technology Stack

- **Backend**: NestJS (Node.js) with TypeScript
- **Frontend**: Next.js 14 (React 18) with TypeScript
- **Database**: PostgreSQL 16 with Row-Level Security (RLS)
- **Cache**: Redis
- **Message Queue**: RabbitMQ / AWS SQS
- **Payment Processing**: Stripe Connect
- **Infrastructure**: Docker, AWS (ECS Fargate, RDS), Vercel
- **CI/CD**: GitHub Actions

## Project Structure

```
├── backend/          # NestJS API
├── frontend/         # Next.js application
├── docker/           # Docker configurations
├── scripts/          # Utility scripts
├── docs/             # Documentation
├── pep.md            # Project Execution Plan
├── tech.md           # Technical Specification
└── wbs.md            # Work Breakdown Structure
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 16
- Redis

### Development Setup

1. Clone the repository
2. Run `docker-compose up -d` to start PostgreSQL and Redis
3. Set up backend: `cd backend && npm install && npm run start:dev`
4. Set up frontend: `cd frontend && npm install && npm run dev`
5. Access the application at http://localhost:3000

## Key Features

- Multi-tenancy with database-level isolation (PostgreSQL RLS)
- Role-Based Access Control (RBAC) with hierarchical permissions
- OAuth 2.0 authentication with JWT and refresh token rotation
- Stripe Connect integration for payment processing
- Async report generation with PDF/Excel/CSV exports
- Comprehensive monitoring and observability

## Documentation

- [Technical Specification](tech.md)
- [Project Execution Plan](pep.md)
- [Work Breakdown Structure](wbs.md)

## License

Proprietary