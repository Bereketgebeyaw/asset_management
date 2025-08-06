# Asset Management System - Frontend

A modern React application for managing company assets with a clean, responsive interface.

## 🏗️ Architecture

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (Button, Input, Modal, etc.)
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components (Header, Sidebar, etc.)
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services and utilities
├── context/             # React context providers
├── utils/               # Utility functions
├── constants/           # Application constants
├── types/               # TypeScript type definitions
├── styles/              # Global styles and CSS modules
└── assets/              # Static assets (images, icons, etc.)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd asset-management-system/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5124
   VITE_APP_NAME=Asset Management System
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 📋 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Role-based access control

### 👥 User Dashboard
- View available assets
- Request assets with reasons
- Track request status
- View request history

### 👨‍💼 Admin Dashboard
- Manage assets (CRUD operations)
- View and process asset requests
- Approve/reject requests
- Asset status management

### 🎨 UI/UX
- Modern, responsive design
- Clean and intuitive interface
- Mobile-friendly layout
- Smooth animations and transitions

## 🎯 Pages

### Public Pages
- **Landing Page** (`/`) - Welcome page with login/register options
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Protected Pages
- **User Dashboard** (`/dashboard`) - Asset browsing and requests
- **Admin Dashboard** (`/admin`) - Asset and request management

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5124
VITE_APP_NAME=Asset Management System

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
```

### API Configuration

The frontend communicates with the backend API. Update the API URL in your environment variables or `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5124';
```

## 🎨 Styling

The application uses:
- **CSS Modules** for component-specific styles
- **Global CSS** for common styles
- **CSS Variables** for theming
- **Responsive design** with mobile-first approach

### Theme Configuration

Customize the theme by updating CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  --background-color: #f8fafc;
  --text-color: #1f2937;
  --border-radius: 12px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## 🧪 Testing

### Run Tests
```bash
npm run test
# or
yarn test
```

### Run Tests with Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📦 Build

### Development Build
```bash
npm run build:dev
# or
yarn build:dev
```

### Production Build
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## 🚀 Deployment

### Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Docker
1. Build the image:
   ```bash
   docker build -t asset-management-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:80 asset-management-frontend
   ```

## 🔍 Development

### Code Structure

#### Components
- **Common Components**: Reusable UI elements (Button, Input, Modal, etc.)
- **Feature Components**: Feature-specific components (AssetCard, RequestForm, etc.)
- **Layout Components**: Layout-related components (Header, Sidebar, etc.)

#### Hooks
- **useAuth**: Authentication state management
- **useAssets**: Asset data management
- **useRequests**: Request data management

#### Services
- **api.js**: Axios configuration and interceptors
- **authService.js**: Authentication API calls
- **assetService.js**: Asset API calls
- **requestService.js**: Request API calls

### State Management

The application uses React Context for global state management:
- **AuthContext**: User authentication state
- **AssetContext**: Asset data state
- **RequestContext**: Request data state

### Routing

React Router is used for navigation with protected routes:
- Public routes: Landing, Login, Register
- Protected routes: Dashboard, Admin Dashboard

## 🐛 Debugging

### Development Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- Network tab for API debugging

### Common Issues

1. **CORS Issues**: Ensure backend CORS is configured correctly
2. **API Connection**: Check API URL in environment variables
3. **Authentication**: Verify JWT token storage and expiration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style

- Use ESLint and Prettier for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License.
