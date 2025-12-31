#!/bin/bash

# StorySparks Docker Setup Script
# This script helps you get StorySparks running with Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Check if .env.local exists
check_env() {
    if [ ! -f .env.local ]; then
        print_warning ".env.local not found. Creating from template..."
        if [ -f env.example ]; then
            cp env.example .env.local
            print_success "Created .env.local from env.example"
            print_warning "Please edit .env.local with your actual values before continuing."
        else
            print_error "env.example not found. Please create .env.local manually."
            exit 1
        fi
    fi
}

# Function to run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    # Wait for postgres to be ready
    print_status "Waiting for PostgreSQL to be ready..."
    timeout 60 bash -c 'until docker exec storysparks-postgres pg_isready -U storysparks -d storysparks; do sleep 2; done'
    
    # Run migrations
    docker exec storysparks-web npx prisma migrate deploy
    docker exec storysparks-web npx prisma generate
    
    print_success "Database migrations completed!"
}

# Function to show service status
show_status() {
    print_status "Service Status:"
    echo ""
    echo "🌐 Web App:        http://localhost:3000"
    echo "📊 API Service:   http://localhost:4000"
    echo "🎨 Marketing:     http://localhost:5173"
    echo "🗄️  Prisma Studio: http://localhost:5555"
    echo "📊 Database:      localhost:5432"
    echo "🔴 Redis:         localhost:6379"
    echo ""
    print_status "Use 'docker-compose logs -f [service]' to view logs"
    print_status "Use 'docker-compose ps' to check service status"
}

# Main menu
show_menu() {
    echo ""
    echo "StorySparks Docker Setup"
    echo "========================"
    echo ""
    echo "1. Start development environment"
    echo "2. Start production environment"
    echo "3. Stop all services"
    echo "4. View logs"
    echo "5. Run database migrations"
    echo "6. Reset database"
    echo "7. Show service status"
    echo "8. Exit"
    echo ""
}

# Start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose -f docker-compose.dev.yml up -d
    print_success "Development environment started!"
    show_status
}

# Start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose -f docker-compose.prod.yml up -d
    print_success "Production environment started!"
    show_status
}

# Stop all services
stop_services() {
    print_status "Stopping all services..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.prod.yml down
    print_success "All services stopped!"
}

# View logs
view_logs() {
    echo ""
    echo "Available services:"
    echo "1. web"
    echo "2. api"
    echo "3. marketing"
    echo "4. postgres"
    echo "5. redis"
    echo ""
    read -p "Enter service name: " service
    docker-compose -f docker-compose.dev.yml logs -f $service
}

# Reset database
reset_database() {
    print_warning "This will delete all data in the database!"
    read -p "Are you sure? (y/N): " confirm
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        print_status "Resetting database..."
        docker-compose -f docker-compose.dev.yml down -v
        docker volume rm storysparks_postgres_data 2>/dev/null || true
        print_success "Database reset complete!"
    else
        print_status "Database reset cancelled."
    fi
}

# Main script
main() {
    check_docker
    check_env
    
    while true; do
        show_menu
        read -p "Choose an option (1-8): " choice
        
        case $choice in
            1)
                start_dev
                ;;
            2)
                start_prod
                ;;
            3)
                stop_services
                ;;
            4)
                view_logs
                ;;
            5)
                run_migrations
                ;;
            6)
                reset_database
                ;;
            7)
                show_status
                ;;
            8)
                print_success "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please choose 1-8."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main
