# Asset Management System - Makefile
# This Makefile provides convenient commands for managing the project

.PHONY: help install build test clean docker-up docker-down docker-build docker-clean

# Default target
help:
	@echo "Asset Management System - Available Commands:"
	@echo ""
	@echo "Installation:"
	@echo "  install          Install all dependencies (backend + frontend)"
	@echo "  install-backend  Install backend dependencies"
	@echo "  install-frontend Install frontend dependencies"
	@echo ""
	@echo "Development:"
	@echo "  dev              Start development servers (backend + frontend)"
	@echo "  dev-backend      Start backend development server"
	@echo "  dev-frontend     Start frontend development server"
	@echo ""
	@echo "Building:"
	@echo "  build            Build both backend and frontend"
	@echo "  build-backend    Build backend application"
	@echo "  build-frontend   Build frontend application"
	@echo ""
	@echo "Testing:"
	@echo "  test             Run all tests"
	@echo "  test-backend     Run backend tests"
	@echo "  test-frontend    Run frontend tests"
	@echo ""
	@echo "Database:"
	@echo "  db-migrate       Run database migrations"
	@echo "  db-seed          Seed the database"
	@echo "  db-reset         Reset and reseed the database"
	@echo ""
	@echo "Docker:"
	@echo "  docker-up        Start all services with Docker Compose"
	@echo "  docker-down      Stop all Docker services"
	@echo "  docker-build     Build Docker images"
	@echo "  docker-clean     Clean Docker containers and images"
	@echo ""
	@echo "Utilities:"
	@echo "  clean            Clean build artifacts"
	@echo "  lint             Run linting on all code"
	@echo "  format           Format all code"

# Installation
install: install-backend install-frontend

install-backend:
	@echo "Installing backend dependencies..."
	cd backend/AssetManagementAPI && dotnet restore

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Development
dev: dev-backend dev-frontend

dev-backend:
	@echo "Starting backend development server..."
	cd backend/AssetManagementAPI && dotnet run

dev-frontend:
	@echo "Starting frontend development server..."
	cd frontend && npm run dev

# Building
build: build-backend build-frontend

build-backend:
	@echo "Building backend application..."
	cd backend/AssetManagementAPI && dotnet build -c Release

build-frontend:
	@echo "Building frontend application..."
	cd frontend && npm run build

# Testing
test: test-backend test-frontend

test-backend:
	@echo "Running backend tests..."
	cd backend/AssetManagementAPI && dotnet test

test-frontend:
	@echo "Running frontend tests..."
	cd frontend && npm run test

# Database
db-migrate:
	@echo "Running database migrations..."
	cd backend/AssetManagementAPI && dotnet ef database update

db-seed:
	@echo "Seeding the database..."
	cd backend/AssetManagementAPI && dotnet run --seed

db-reset:
	@echo "Resetting and reseeding the database..."
	cd backend/AssetManagementAPI && dotnet ef database drop --force && dotnet ef database update && dotnet run --seed

# Docker
docker-up:
	@echo "Starting Docker services..."
	docker-compose up -d

docker-down:
	@echo "Stopping Docker services..."
	docker-compose down

docker-build:
	@echo "Building Docker images..."
	docker-compose build

docker-clean:
	@echo "Cleaning Docker containers and images..."
	docker-compose down -v --rmi all

# Utilities
clean:
	@echo "Cleaning build artifacts..."
	cd backend/AssetManagementAPI && dotnet clean
	cd frontend && npm run clean

lint:
	@echo "Running linting..."
	cd frontend && npm run lint
	cd backend/AssetManagementAPI && dotnet format --verify-no-changes

format:
	@echo "Formatting code..."
	cd frontend && npm run format
	cd backend/AssetManagementAPI && dotnet format

# Production
production-build: build-backend build-frontend
	@echo "Production build completed!"

production-deploy:
	@echo "Deploying to production..."
	# Add your deployment commands here

# Development setup
setup-dev: install db-migrate db-seed
	@echo "Development environment setup completed!"
	@echo ""
	@echo "Next steps:"
	@echo "1. Start the backend: make dev-backend"
	@echo "2. Start the frontend: make dev-frontend"
	@echo "3. Access the application at http://localhost:5173"
	@echo ""
	@echo "Default credentials:"
	@echo "  Admin: admin@company.com / admin123"
	@echo "  User:  user@company.com / user123" 