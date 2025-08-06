# Asset Management System - Backend API

A robust .NET 8 Web API for managing company assets, user authentication, and asset requests.

## 🏗️ Architecture

```
AssetManagementAPI/
├── Controllers/           # API Controllers
├── Data/                 # Database context and configurations
├── DTOs/                 # Data Transfer Objects
├── Models/               # Entity models
├── Services/             # Business logic services
├── Middleware/           # Custom middleware
├── Configuration/        # App settings and configurations
├── Seeds/                # Database seeding
├── Migrations/           # Entity Framework migrations
└── wwwroot/             # Static files
```

## 🚀 Quick Start

### Prerequisites

- .NET 8 SDK
- PostgreSQL 12+
- Visual Studio 2022 or VS Code

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd asset-management-system/backend/AssetManagementAPI
   ```

2. **Install dependencies**
   ```bash
   dotnet restore
   ```

3. **Configure database**
   - Update `appsettings.json` with your PostgreSQL connection string
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=AssetManagement;Username=your_username;Password=your_password"
     }
   }
   ```

4. **Run migrations**
   ```bash
   dotnet ef database update
   ```

5. **Seed the database**
   ```bash
   dotnet run --seed
   ```

6. **Start the application**
   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:7124` (or `http://localhost:5124`)

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Assets (Admin Only)
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create new asset
- `GET /api/assets/{id}` - Get asset by ID
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset
- `GET /api/assets/available` - Get available assets

### Asset Requests
- `GET /api/assetrequests` - Get all requests (Admin)
- `POST /api/assetrequests` - Create request (User)
- `GET /api/assetrequests/my-requests` - Get user's requests
- `PUT /api/assetrequests/{id}/process` - Process request (Admin)

## 🔐 Authentication

The API uses JWT-based authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

### Users
- `Id` (Primary Key)
- `Email` (Unique)
- `PasswordHash`
- `Role` (User/Admin)
- `CreatedAt`
- `UpdatedAt`

### Assets
- `Id` (Primary Key)
- `Name`
- `Category`
- `SerialNumber` (Unique)
- `PurchaseDate`
- `Status` (Available/Assigned)
- `ImageUrl` (Optional)
- `CreatedAt`
- `UpdatedAt`

### AssetRequests
- `Id` (Primary Key)
- `UserId` (Foreign Key)
- `AssetId` (Foreign Key)
- `Reason`
- `Status` (Pending/Approved/Rejected)
- `RequestedAt`
- `ProcessedAt`
- `ProcessedBy` (Admin ID)

## 🌱 Seed Data

The application comes with pre-loaded data:

### Admin User
- Email: `admin@company.com`
- Password: `admin123`
- Role: Admin

### Regular User
- Email: `user@company.com`
- Password: `user123`
- Role: User

### Sample Assets
- 5 pre-loaded assets across different categories (Laptop, Phone, Monitor, etc.)

## 🔧 Configuration

### Environment Variables

- `ASPNETCORE_ENVIRONMENT` - Environment (Development/Production)
- `JWT_SECRET` - JWT signing secret
- `JWT_ISSUER` - JWT issuer
- `JWT_AUDIENCE` - JWT audience

### App Settings

Key configuration options in `appsettings.json`:

```json
{
  "JwtSettings": {
    "Secret": "your-secret-key",
    "Issuer": "AssetManagement",
    "Audience": "AssetManagementUsers",
    "ExpirationHours": 24
  },
  "ConnectionStrings": {
    "DefaultConnection": "your-connection-string"
  }
}
```

## 🧪 Testing

Run the test suite:

```bash
dotnet test
```

## 📦 Deployment

### Docker

1. Build the image:
   ```bash
   docker build -t asset-management-api .
   ```

2. Run the container:
   ```bash
   docker run -p 5124:5124 asset-management-api
   ```

### Production

1. Publish the application:
   ```bash
   dotnet publish -c Release -o ./publish
   ```

2. Deploy to your preferred hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
