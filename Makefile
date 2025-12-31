# StorySparks Docker Management Makefile

.PHONY: help dev prod stop logs migrate reset clean

# Default target
help:
	@echo "StorySparks Docker Management"
	@echo "============================="
	@echo ""
	@echo "Available commands:"
	@echo "  make dev       - Start development environment"
	@echo "  make prod      - Start production environment"
	@echo "  make stop      - Stop all services"
	@echo "  make logs      - View logs for all services"
	@echo "  make migrate   - Run database migrations"
	@echo "  make reset     - Reset database (WARNING: deletes all data)"
	@echo "  make clean     - Clean up Docker resources"
	@echo "  make setup     - Interactive setup script"
	@echo ""

# Start development environment
dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment started!"
	@echo "Access applications at:"
	@echo "  Main App: http://localhost:3000"
	@echo "  Marketing: http://localhost:5173"
	@echo "  API: http://localhost:4000"
	@echo "  Prisma Studio: http://localhost:5555"

# Start production environment
prod:
	@echo "Starting production environment..."
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Production environment started!"

# Stop all services
stop:
	@echo "Stopping all services..."
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.prod.yml down
	@echo "All services stopped!"

# View logs
logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Run database migrations
migrate:
	@echo "Running database migrations..."
	docker exec storysparks-web npx prisma migrate dev --name init
	@echo "Migrations completed!"

# Reset database (WARNING: deletes all data)
reset:
	@echo "WARNING: This will delete all data in the database!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	@echo "Resetting database..."
	docker-compose -f docker-compose.dev.yml down -v
	docker volume rm storysparks_postgres_data 2>/dev/null || true
	@echo "Database reset complete!"

# Clean up Docker resources
clean:
	@echo "Cleaning up Docker resources..."
	docker system prune -f
	docker volume prune -f
	@echo "Cleanup complete!"

# Interactive setup script
setup:
	@echo "Running interactive setup script..."
	./docker-setup.sh
