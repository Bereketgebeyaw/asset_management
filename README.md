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

# Add .NET tools to PATH (IMPORTANT: Run this in your terminal)
export PATH="$HOME/.dotnet/tools:$PATH"

# Update database credentials in appsettings.json
# Replace the Database section with your PostgreSQL credentials:
# You'll need to create a PostgreSQL database and user, or use existing credentials
# "Database": {
#   "Host": "localhost",
#   "Port": 5432,
#   "Name": "assetmanagement",
#   "Username": "your_username",
#   "Password": "your_password"
# }

# Run database migrations to create tables
dotnet ef database update

# Seed the database with initial data (admin user, regular user, sample assets)
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

### Manual Database Setup

1. **Create PostgreSQL Database**

   ```sql
   CREATE DATABASE assetmanagement;
   ```

2. **Create User (Optional)**

   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE assetmanagement TO your_username;
   ```

3. **Install Entity Framework Tools**

   ```bash
   dotnet tool install --global dotnet-ef
   ```

4. **Add .NET Tools to PATH (CRITICAL STEP)**

   ```bash
   export PATH="$HOME/.dotnet/tools:$PATH"
   ```

   **Note**: You must run this command in your terminal before running migrations. To make it permanent, add this line to your shell profile:

   ```bash
   echo 'export PATH="$HOME/.dotnet/tools:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

5. **Run Migrations**

   ```bash
   cd backend/AssetManagementAPI
   dotnet ef database update
   ```

6. **Seed Database**

   ```bash
   dotnet run --seed
   ```

### Troubleshooting

#### Entity Framework Tools Not Found

If you get an error like "dotnet-ef does not exist", follow these steps **in order**:

1. **Check if tools are installed**:

   ```bash
   dotnet tool list --global
   ```

2. **Add tools to PATH** (run this in your terminal):

   ```bash
   export PATH="$HOME/.dotnet/tools:$PATH"
   ```

3. **Verify installation**:

   ```bash
   which dotnet-ef
   ```

4. **If still not working, reinstall**:

   ```bash
   dotnet tool uninstall --global dotnet-ef
   dotnet tool install --global dotnet-ef
   export PATH="$HOME/.dotnet/tools:$PATH"
   ```

5. **Make it permanent** (optional but recommended):

   ```bash
   echo 'export PATH="$HOME/.dotnet/tools:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

#### Port Already in Use

If you get "address already in use" error:

1. **Find the process using the port**:

   ```bash
   lsof -ti:5124
   ```

2. **Kill the process**:

   ```bash
   kill -9 <PID>
   ```

3. **Or use a different port** by updating `launchSettings.json`

### Database Tables

The following tables will be created automatically:

- **Users**: User accounts and authentication
- **Assets**: Company assets (laptops, phones, monitors, etc.)
- **AssetRequests**: Asset request history and status

### Sample Data

The seeding process creates:

- **Admin User**: `admin@company.com` / `admin123`
- **Regular User**: `user@company.com` / `user123`
- **Sample Assets**: 5 pre-loaded assets across different categories

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

- 5 pre-loaded assets across different categories
- Admin and user accounts (see demo credentials above)
- Sample asset requests
