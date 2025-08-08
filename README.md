# Asset Management System

A full-stack web application for managing company assets with user authentication, role-based access control, and a modern responsive interface.

## Tools Used

- **Backend**: .NET 9.0
- **Frontend**: React with Vite
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core
- **Authentication**: JWT
- **Package Manager**: npm

## Setup Instructions

### Prerequisites

- **Backend**: .NET 9.0 SDK
- **Frontend**: Node v20.17.0 and npm
- **Database**: PostgreSQL 12+

### Manual Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd asset-management-system
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend/AssetManagementAPI

# Restore dependencies
dotnet restore

# Install Entity Framework tools (if not already installed)
dotnet tool install --global dotnet-ef

# Add .NET tools to PATH
export PATH="$HOME/.dotnet/tools:$PATH"

# Update database credentials in appsettings.json
# Replace the Database section with your PostgreSQL credentials:
# "Database": {
#   "Host": "localhost",
#   "Port": 5432,
#   "Name": "assetmanagement",
#   "Username": "your_username",
#   "Password": "your_password"
# }

# Run database migrations to create tables
dotnet ef database update

# Seed the database with initial data
dotnet run --seed

# Start the backend server
dotnet run
```

**Backend will be running at:** http://localhost:5124

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory
echo "VITE_API_URL=http://localhost:5124" > .env

# Start the frontend development server
npm run dev
```

**Frontend will be running at:** http://localhost:5173

## Database Setup

### Database Setup

1. **Create PostgreSQL Database**

   ```sql
   CREATE DATABASE assetmanagement;
   ```

2. **Create User (Optional)**

   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE assetmanagement TO your_username;
   ```

3. **Run Migrations**

   ```bash
   cd backend/AssetManagementAPI
   dotnet ef database update
   ```

4. **Seed Database**

   ```bash
   dotnet run --seed
   ```

### Database Tables

The following tables will be created automatically:

- **Users**: User accounts and authentication
- **Assets**: Company assets (laptops, phones, monitors, etc.)
- **AssetRequests**: Asset request history and status

### Sample Data

The seeding process creates:

- **Admin User**: `admin@company.com` / `admin123`
- **Regular User**: `user@company.com` / `user123`
- **Sample Assets**: 6 pre-loaded assets across different categories:
  - **Laptops**: MacBook Pro 16-inch, Dell XPS 13
  - **Phones**: iPhone 14 Pro, Samsung Galaxy S23
  - **Monitors**: LG 27-inch Monitor
  - **Tablets**: Apple iPad Pro

## Demo Credentials

### Admin User

- **Email:** `admin@company.com`
- **Password:** `admin123`
- **Role:** Admin (Full access to all features)

### Regular User

- **Email:** `user@company.com`
- **Password:** `user123`
- **Role:** User (Can browse assets and make requests)

## 📋 Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)

### User Features

- Browse available assets
- Request assets with reasons
- Track request status and history
- View assigned assets

### Admin Features

- Full asset management (CRUD operations)
- Process asset requests (approve/reject)
- View all users and their requests
- Dashboard with analytics

## Database

The application uses PostgreSQL with Entity Framework Core. The database will be automatically created when you run the migrations.

### PostgreSQL Setup

1. **Install PostgreSQL** if you haven't already
2. **Create a database**:
   ```sql
   CREATE DATABASE assetmanagement;
   ```
3. **Create a user** (optional - you can use the default postgres user):
   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE assetmanagement TO your_username;
   ```
4. **Update appsettings.json** with your credentials

### Sample Data

- Admin and user accounts (see demo credentials above)
