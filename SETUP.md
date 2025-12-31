# StorySparks Local Development Setup

This guide will help you set up StorySparks for local development and testing.

## Prerequisites

### Option 1: Docker Compose (Recommended)
- **Docker** (v20 or higher)
- **Docker Compose** (v2 or higher)
- **Git**

### Option 2: Manual Setup
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher) - for background job processing
- **Git**

## Quick Start

### 🐳 Docker Compose Setup (Recommended)

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd storysparks
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

2. **Start everything with Docker**
   ```bash
   # Interactive setup script
   ./docker-setup.sh
   
   # OR manually
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Run database migrations**
   ```bash
   docker exec storysparks-web npx prisma migrate dev --name init
   ```

4. **Access applications**
   - Main App: http://localhost:3000
   - Marketing Site: http://localhost:5173
   - API Health: http://localhost:4000/health
   - Prisma Studio: http://localhost:5555

### 🛠️ Manual Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd storysparks
   npm install
   ```

2. **Set up database and Redis**
   ```bash
   # PostgreSQL (choose one)
   createdb storysparks
   # OR with Docker: docker run --name storysparks-postgres -e POSTGRES_DB=storysparks -p 5432:5432 -d postgres:15
   
   # Redis (choose one)
   brew install redis && brew services start redis
   # OR with Docker: docker run --name storysparks-redis -p 6379:6379 -d redis:7
   ```

3. **Configure environment**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your database URL and API keys
   ```

4. **Run database migrations**
   ```bash
   cd packages/prisma
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Web app
   npm run dev:web
   
   # Terminal 2: API service  
   npm run dev:api
   
   # Terminal 3: Marketing site
   npm run dev:marketing
   ```

## Testing the Application

### 1. Access the Applications

- **Main App**: http://localhost:3000
- **Marketing Site**: http://localhost:5173
- **API Health Check**: http://localhost:4000/health

### 2. Test User Flow

1. **Visit the main app** at http://localhost:3000
2. **Sign in** using Google OAuth or email magic link
3. **Create a new project** using the wizard
4. **Upload assets** (images/videos)
5. **Generate an ad** and monitor the process

### 3. Database Management

```bash
# View database in Prisma Studio
cd packages/prisma
npx prisma studio
# Opens at http://localhost:5555
```

## Development Commands

### Docker Commands
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# Stop all services
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.prod.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f [service]

# Interactive setup script
./docker-setup.sh

# Run database migrations
docker exec storysparks-web npx prisma migrate dev --name init

# Access Prisma Studio
docker exec -it storysparks-prisma-studio npx prisma studio

# Reset database
docker-compose -f docker-compose.dev.yml down -v
```

### Root Level Commands
```bash
npm run dev          # Start web app
npm run dev:web      # Start web app specifically
npm run dev:api      # Start API service
npm run dev:marketing # Start marketing site
npm run build        # Build all applications
npm run lint         # Lint all code
npm run typecheck    # Type check all code
```

### Individual App Commands
```bash
# Web app
cd apps/web
npm run dev
npm run build
npm run lint

# API service
cd apps/api
npm run dev
npm run build

# Marketing site
cd apps/marketing
npm run dev
npm run build
```

### Database Commands
```bash
cd packages/prisma
npx prisma migrate dev    # Create and apply migration
npx prisma migrate reset  # Reset database
npx prisma generate       # Generate Prisma client
npx prisma studio        # Open database GUI
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env.local
   - Verify database exists

2. **Authentication Issues**
   - Check NEXTAUTH_SECRET is set
   - Verify Google OAuth credentials (if using)
   - Ensure NEXTAUTH_URL matches your local setup

3. **File Upload Not Working**
   - Configure UploadThing credentials
   - Check UPLOADTHING_SECRET and UPLOADTHING_APP_ID

4. **Redis Connection Error**
   - Ensure Redis is running
   - Check REDIS_URL in .env.local

5. **Port Already in Use**
   - Kill processes using ports 3000, 4000, or 5173
   - Or change ports in respective package.json files

### Debug Mode

Enable debug logging by setting:
```bash
LOG_LEVEL=debug
```

### Reset Everything

```bash
# Stop all services
# Kill processes on ports 3000, 4000, 5173

# Reset database
cd packages/prisma
npx prisma migrate reset

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Restart services
npm run dev:web &
npm run dev:api &
npm run dev:marketing &
```

## Production Deployment

For production deployment, see:
- `DEVOPS_PLAN.md` - Infrastructure setup
- `IMPLEMENTATION_PLAN.md` - Development roadmap
- `ARCHITECTURE.md` - System architecture

## Need Help?

- Check the main `README.md` for project overview
- Review `ARCHITECTURE.md` for system design
- See `IMPLEMENTATION_PLAN.md` for development phases
