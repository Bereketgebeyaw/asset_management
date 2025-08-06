# Frontend Source Structure

This directory contains the React frontend application for the Asset Management System.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (buttons, inputs, alerts, etc.)
│   │   ├── Alert.jsx    # Alert component for success/error messages
│   │   ├── Alert.css
│   │   ├── Loading.jsx  # Loading spinner component
│   │   └── Loading.css
│   ├── layout/          # Layout components (header, footer, etc.)
│   │   ├── Header.jsx   # Main header component
│   │   └── Header.css
│   ├── features/        # Feature-specific components
│   │   ├── AssetCard.jsx # Asset display card component
│   │   └── AssetCard.css
│   └── index.js         # Component exports
├── pages/               # Page components
│   ├── Dashboard.jsx    # Main dashboard page
│   ├── AdminDashboard.jsx # Admin dashboard page
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   └── LandingPage.jsx  # Landing page
├── hooks/               # Custom React hooks
│   ├── useAssets.js     # Hook for managing assets state
│   └── index.js         # Hook exports
├── services/            # API services
│   ├── api.js           # Base API configuration
│   ├── assetService.js  # Asset-related API calls
│   ├── assetRequestService.js # Asset request API calls
│   └── index.js         # Service exports
├── utils/               # Utility functions
│   ├── dateUtils.js     # Date formatting utilities
│   └── validation.js    # Form validation utilities
├── constants/           # Constants and configuration
│   └── index.js         # Application constants
├── styles/              # Global styles and theme
│   └── Dashboard.css    # Dashboard-specific styles
├── context/             # React context providers
│   └── AuthContext.jsx  # Authentication context
├── assets/              # Static assets
│   └── react.svg
├── App.jsx              # Main App component
├── App.css              # App-specific styles
├── main.jsx             # Application entry point
├── index.css            # Global styles
└── README.md            # This file
```

## Key Features

### Components

- **Common Components**: Reusable UI elements like alerts, loading spinners, buttons
- **Layout Components**: Page structure components like headers, footers
- **Feature Components**: Business logic components like asset cards

### Services

- **API Service**: Centralized API configuration with interceptors
- **Asset Service**: Asset-related API operations
- **Asset Request Service**: Asset request API operations

### Hooks

- **useAssets**: Custom hook for managing assets state and operations

### Utilities

- **Date Utils**: Date formatting and manipulation functions
- **Validation**: Form validation utilities

### Constants

- **Application Constants**: Categories, statuses, API endpoints, etc.

## Usage Examples

### Using Components

```jsx
import { Alert, Loading, Header, AssetCard } from "../components";
```

### Using Services

```jsx
import { assetService, assetRequestService } from "../services";
```

### Using Hooks

```jsx
import { useAssets } from "../hooks";
```

### Using Utilities

```jsx
import { formatDate, isValidEmail } from "../utils";
```

## Best Practices

1. **Component Structure**: Each component should have its own CSS file
2. **Service Layer**: All API calls should go through the service layer
3. **Custom Hooks**: Use custom hooks for complex state management
4. **Constants**: Use constants for magic strings and configuration
5. **Utilities**: Extract reusable logic into utility functions
6. **Index Files**: Use index files for cleaner imports

## Adding New Features

1. Create feature-specific components in `components/features/`
2. Add corresponding services in `services/`
3. Create custom hooks if needed in `hooks/`
4. Add constants in `constants/index.js`
5. Update this README with new additions
