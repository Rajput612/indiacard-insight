// Profile related constants
export const OCCUPATION_TYPES = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "business", label: "Business Owner" },
  { value: "other", label: "Other" }
] as const;

export const SPENDING_CATEGORIES = [
  "Travel",
  "Shopping",
  "Dining",
  "Entertainment",
  "Fuel",
  "Groceries",
  "Bills & Utilities",
  "Healthcare"
] as const;

export const CIBIL_SCORE_STATUS = {
  NOT_AVAILABLE: "Not Available",
  EXCELLENT: "Excellent",
  GOOD: "Good",
  NEEDS_IMPROVEMENT: "Needs Improvement"
} as const;

export const CIBIL_IMPROVEMENT_TIPS = [
  "Pay your credit card bills and EMIs on time",
  "Keep credit utilization below 30%",
  "Maintain a good mix of credit types",
  "Avoid multiple credit applications in short periods"
] as const;