// Validation patterns and rules
export const PATTERNS = {
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
};

export const SCORE_RANGES = {
  CIBIL: {
    MIN: 300,
    MAX: 900,
    EXCELLENT: 750,
    GOOD: 650,
  }
};

export const VALIDATION_MESSAGES = {
  PAN: {
    INVALID: "Please enter a valid PAN number",
    FORMAT: "PAN should be in the format ABCDE1234F",
  },
  EMAIL: {
    REQUIRED: "Email is required",
    INVALID: "Please enter a valid email address",
  },
  CIBIL: {
    EMAIL_REQUIRED: "Please enter your CIBIL registered email",
  }
};