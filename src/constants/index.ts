// Export all constants
export * from './validation';
export * from './profile';
export * from './cards';
export * from './ui';

// Common constants
export const APP_CONFIG = {
  name: "IndiaCardInsight",
  domain: "indiacardinsight.com",
  supportEmail: "support@indiacardinsight.com",
  socialLinks: {
    twitter: "https://twitter.com/indiacardinsight",
    facebook: "https://facebook.com/indiacardinsight",
    instagram: "https://instagram.com/indiacardinsight"
  }
} as const;

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || "https://api.indiacardinsight.com",
  timeout: 30000,
  version: "v1"
} as const;