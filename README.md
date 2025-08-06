# Asset Management System

A full-stack web application for managing company assets with user authentication, role-based access control, and a modern responsive interface.

## 🏗️ Project Structure

```
asset-management-system/
├── backend/                    # .NET 8 Web API
│   └── AssetManagementAPI/
│       ├── Controllers/        # API Controllers
│       ├── Data/              # Database context and configurations
│       ├── DTOs/              # Data Transfer Objects
│       ├── Models/            # Entity models
│       ├── Services/          # Business logic services
│       ├── Middleware/        # Custom middleware
│       ├── Configuration/     # App settings and configurations
│       ├── Seeds/             # Database seeding
│       └── Migrations/        # Entity Framework migrations
├── frontend/                  # React 18 + Vite
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── common/        # Common components
│       │   ├── features/      # Feature-specific components
│       │   └── layout/        # Layout components
│       ├── pages/             # Page components
│       ├── hooks/             # Custom React hooks
│       ├── services/          # API services and utilities
│       ├── context/           # React context providers
│       ├── utils/             # Utility functions
│       ├── constants/         # Application constants
│       ├── types/             # Type definitions
│       └── styles/            # Global styles and CSS modules
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Backend**: .NET 8 SDK, PostgreSQL 12+
- **Frontend**: Node.js 18+, npm or yarn
- **Database**: PostgreSQL running locally or remotely

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd asset-management-system
   ```

2. **Backend Setup**

   ```bash
   cd backend/AssetManagementAPI
   dotnet restore
   # Update connection string in appsettings.json
   dotnet ef database update
   dotnet run
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   # Create .env file with API URL
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5124

## 📋 Features

### 🔐 Authentication & Authorization

- **User Registration**: Email and password-based registration
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin and User roles with different permissions
- **Password Security**: BCrypt hashing for secure password storage

### 👥 User Features

- **Asset Browsing**: View all available company assets
- **Asset Requests**: Request assets with reasons
- **Request Tracking**: Monitor request status and history
- **Profile Management**: View and update user profile

### 👨‍💼 Admin Features

- **Asset Management**: Full CRUD operations for assets
- **Request Processing**: Approve or reject asset requests
- **User Management**: View and manage user accounts
- **Dashboard Analytics**: Asset statistics and overview

### 🎨 UI/UX Features

- **Modern Design**: Clean, responsive interface
- **Mobile-Friendly**: Optimized for all device sizes
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant design

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL DEFAULT 'User',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Assets Table

```sql
CREATE TABLE Assets (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    SerialNumber VARCHAR(255) UNIQUE NOT NULL,
    PurchaseDate DATE NOT NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'Available',
    ImageUrl VARCHAR(500),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### AssetRequests Table

```sql
CREATE TABLE AssetRequests (
    Id SERIAL PRIMARY KEY,
    UserId INTEGER REFERENCES Users(Id),
    AssetId INTEGER REFERENCES Assets(Id),
    Reason TEXT,
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    RequestedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ProcessedAt TIMESTAMP,
    ProcessedBy INTEGER REFERENCES Users(Id)
);
```

## 🔧 Configuration

### Backend Configuration

Update `backend/AssetManagementAPI/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=AssetManagement;Username=your_username;Password=your_password"
  },
  "JwtSettings": {
    "Secret": "your-super-secret-key-here",
    "Issuer": "AssetManagement",
    "Audience": "AssetManagementUsers",
    "ExpirationHours": 24
  }
}
```

### Frontend Configuration

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5124
VITE_APP_NAME=Asset Management System
```

## 🌱 Seed Data

The application comes with pre-loaded data:

### Admin User

- **Email**: `admin@company.com`
- **Password**: `admin123`
- **Role**: Admin

### Regular User

- **Email**: `user@company.com`
- **Password**: `user123`
- **Role**: User

### Sample Assets

- 5 pre-loaded assets across different categories (Laptop, Phone, Monitor, etc.)

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Asset Endpoints (Admin Only)

- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create new asset
- `GET /api/assets/{id}` - Get asset by ID
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset
- `GET /api/assets/available` - Get available assets

### Request Endpoints

- `GET /api/assetrequests` - Get all requests (Admin)
- `POST /api/assetrequests` - Create request (User)
- `GET /api/assetrequests/my-requests` - Get user's requests
- `PUT /api/assetrequests/{id}/process` - Process request (Admin)

## 🧪 Testing

### Backend Tests

```bash
cd backend/AssetManagementAPI
dotnet test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Backend Deployment

1. **Publish the application**

   ```bash
   dotnet publish -c Release -o ./publish
   ```

2. **Deploy to your preferred platform** (Azure, AWS, Heroku, etc.)

### Frontend Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel, Netlify, or your preferred platform**

## 🔍 Development

### Code Style

- **Backend**: Follow C# coding conventions
- **Frontend**: Use ESLint and Prettier
- **Database**: Follow PostgreSQL naming conventions

### Git Workflow

1. Create feature branch from `main`
2. Make changes and commit with meaningful messages
3. Create pull request
4. Review and merge

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**

   - Ensure PostgreSQL is running
   - Check connection string in `appsettings.json`
   - Verify database exists

2. **CORS Issues**

   - Check CORS configuration in `Program.cs`
   - Verify frontend URL is allowed

3. **Authentication Issues**
   - Check JWT secret in configuration
   - Verify token expiration settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- .NET 8 for the backend framework
- React 18 for the frontend framework
- PostgreSQL for the database
- Entity Framework Core for ORM
- Vite for build tooling

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the respective folders
