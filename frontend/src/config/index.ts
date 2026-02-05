export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  appName: import.meta.env.VITE_APP_NAME || 'Vigilant AI',
  maxImageSizeMB: parseInt(import.meta.env.VITE_MAX_IMAGE_SIZE_MB || '10', 10),
};
