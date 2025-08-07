# Asset Management System

A full-stack web application for managing company assets with user authentication, role-based access control, and a modern responsive interface.

##  Setup Instructions

### Prerequisites

- **Backend**: .NET 8 SDK
- **Frontend**: Node.js 18+ and npm
- **Database**: PostgreSQL 12+

### 1. Clone the Repository

```bash
git clone <repository-url>
cd asset-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend/AssetManagementAPI

# Restore dependencies
dotnet restore

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

# Run database migrations
dotnet ef database update

# Start the backend server
dotnet run
```

**Backend will be running at:** http://localhost:5124

### 3. Frontend Setup

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

##  Demo Credentials

### Admin User

- **Email:** `admin@company.com`
- **Password:** `admin123`
- **Role:** Admin (Full access to all features)

### Regular User

- **Email:** `user@company.com`
- **Password:** `user123`
- **Role:** User (Can browse assets and make requests)

## 📋 Features

###  Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)

###  User Features

- Browse available assets
- Request assets with reasons
- Track request status and history
- View assigned assets

###  Admin Features

- Full asset management (CRUD operations)
- Process asset requests (approve/reject)
- View all users and their requests
- Dashboard with analytics


##  Database

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

