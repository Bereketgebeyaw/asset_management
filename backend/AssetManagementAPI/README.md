# Asset Management API

A .NET 9 Web API for managing company assets with JWT authentication and PostgreSQL database.

## Features

- **Authentication**: JWT-based authentication with user registration and login
- **User Roles**: Admin and User roles with different permissions
- **Asset Management**: CRUD operations for company assets (Admin only)
- **Asset Requests**: Users can request assets, admins can approve/reject
- **Database**: PostgreSQL with Entity Framework Core migrations

## Prerequisites

- .NET 9 SDK
- PostgreSQL (running on port 5433)
- Database named `assetmanagement`

## Setup Instructions

### 1. Database Setup

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE assetmanagement;
```

### 2. Configuration

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials and other settings.

### 3. Install Dependencies

```bash
dotnet restore
```

### 4. Run Migrations

```bash
dotnet ef database update
```

### 5. Run the Application

```bash
dotnet run
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Assets (Admin Only)

- `GET /api/assets` - Get all assets
- `GET /api/assets/available` - Get available assets
- `GET /api/assets/{id}` - Get asset by ID
- `POST /api/assets` - Create new asset
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset

### Asset Requests

- `GET /api/assetrequests` - Get all requests (Admin only)
- `GET /api/assetrequests/my-requests` - Get user's requests
- `GET /api/assetrequests/{id}` - Get request by ID
- `POST /api/assetrequests` - Create asset request
- `PUT /api/assetrequests/{id}/process` - Process request (Admin only)

## Demo Credentials

### Admin User

- Email: `admin@company.com`
- Password: `admin123`

### Regular User

- Email: `user@company.com`
- Password: `user123`

## Database Schema

The application uses Entity Framework Core with the following entities:

- **Users**: User accounts with email, password hash, and role
- **Assets**: Company assets with name, category, serial number, and status
- **AssetRequests**: Asset requests with user, asset, status, and processing info

## Environment Variables

The application supports the following environment variables:

- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 5433)
- `DB_NAME`: Database name (default: assetmanagement)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `JWT_SECRET_KEY`: JWT secret key
- `JWT_ISSUER`: JWT issuer
- `JWT_AUDIENCE`: JWT audience
- `JWT_EXPIRATION_HOURS`: JWT expiration hours
- `API_PORT`: API port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS

## Development

### Running in Development Mode

```bash
dotnet run --environment Development
```

### Running Tests

```bash
dotnet test
```

### Database Migrations

To create a new migration:

```bash
dotnet ef migrations add MigrationName
```

To apply migrations:

```bash
dotnet ef database update
```

## Security Notes

- Passwords are hashed using BCrypt
- JWT tokens are used for authentication
- Role-based authorization is implemented
- CORS is configured for the frontend application
