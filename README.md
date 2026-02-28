# Project Setup Guide

## 📋 Prerequisites

- Node.js (v22.14.0 or higher) - strict min version showed inside `.nvmrc`
- npm as a package manager (don't use yarn in order to avoid error)
- Running Docker Desktop for testing app in dev mode (PostgreSQL is inside container)

## 🚀 Quick Start

### Development Mode with Docker (Recommended)

This setup runs PostgreSQL in Docker and NestJS locally for development:

```bash
# Start the development environment
npm run start:docker
```

This command runs two processes concurrently:

- `docker:start` - Starts PostgreSQL in Docker container
- `start:dev` - Starts NestJS in watch mode with hot-reload

### Other Docker Commands

```bash
# Start only Docker containers (PostgreSQL)
npm run docker:start

# Stop and remove Docker containers
npm run docker:stop
```

### Production Mode with Local Database

For production with locally hosted PostgreSQL:

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Standard Development (Local Database)

If you have PostgreSQL running locally:

```bash
# Start development server with hot-reload
npm run start:dev

# Start with debug mode
npm run start:debug
```

## 🔧 Environment Configuration

### Environment Files

The project uses different environment files based on the `NODE_ENV`:

- `.env.dev` - Used with `start:dev` and `start:docker`
- `.env` - Used with `start:prod`

### Environment Variables

Contact the author to get the required environment variables for:

- Database configuration
- API keys
- Other sensitive configuration

## 🐘 Database Setup

### With Docker (Development)

PostgreSQL will automatically start when you run `npm run docker:start` or `npm run start:docker`

## 📞 Support

For environment variables and configuration details, please contact the project author directly.

---

**Note**: Make sure to never commit sensitive environment variables to version control. All `.env` files should be in `.gitignore`.

### With Docker (Development)

PostgreSQL will automatically start when you run `npm run docker:start` or `npm run start:docker`

## 📞 Support

For environment variables and configuration details, please contact the project author directly.

📚 API Documentation

### Swagger UI

This project includes Swagger documentation for easy API testing and exploration.

Once the application is running, access the Swagger documentation at:

text
`http://localhost:3000/doc`

The Swagger UI provides:

- Interactive API testing interface

- Request/response schemas

- Authentication requirements

- Available endpoints and methods
