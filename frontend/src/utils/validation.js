// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (minimum 6 characters)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Required field validation
export const isRequired = (value) => {
  return value && value.trim().length > 0;
};

// Serial number validation (alphanumeric)
export const isValidSerialNumber = (serialNumber) => {
  const serialRegex = /^[a-zA-Z0-9-]+$/;
  return serialRegex.test(serialNumber);
};

// Asset name validation
export const isValidAssetName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
};

// Category validation
export const isValidCategory = (category) => {
  const validCategories = ['Electronics', 'Furniture', 'Vehicles', 'Tools', 'Other'];
  return validCategories.includes(category);
}; 