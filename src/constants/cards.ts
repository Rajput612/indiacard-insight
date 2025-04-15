// Credit card related constants
export const CARD_NETWORKS = {
  VISA: "Visa",
  MASTERCARD: "Mastercard",
  RUPAY: "RuPay",
  AMEX: "American Express"
} as const;

export const CARD_TYPES = {
  REWARDS: "rewards",
  CASHBACK: "cashback",
  TRAVEL: "travel",
  LIFESTYLE: "lifestyle",
  BUSINESS: "business",
  PREMIUM: "premium"
} as const;

export const CARD_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  DISCONTINUED: 2
} as const;

export const CARD_STATUS_LABELS = {
  [CARD_STATUS.ACTIVE]: "Active",
  [CARD_STATUS.INACTIVE]: "Temporarily Unavailable",
  [CARD_STATUS.DISCONTINUED]: "No Longer Available"
} as const;

export const CARD_STATUS_MESSAGES = {
  [CARD_STATUS.ACTIVE]: "This card is available for applications",
  [CARD_STATUS.INACTIVE]: "This card is temporarily unavailable for new applications",
  [CARD_STATUS.DISCONTINUED]: "This card has been discontinued and is no longer available"
} as const;

export const CARD_CATEGORIES = {
  ONLINE: "online",
  OFFLINE: "offline",
  TRAVEL: "travel",
  DINING: "dining",
  SHOPPING: "shopping",
  ENTERTAINMENT: "entertainment",
  FUEL: "fuel",
  UTILITIES: "utilities"
} as const;

export const PLATFORM_TYPES = {
  APP: "app",
  WEBSITE: "website",
  STORE: "store",
  OTHER: "other"
} as const;

export const SPENDING_FREQUENCY = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  YEARLY: "yearly",
  ONE_TIME: "one-time"
} as const;

// Popular platforms by type
export const POPULAR_PLATFORMS = {
  app: [
    "Amazon",
    "Flipkart",
    "Swiggy",
    "Zomato",
    "PhonePe",
    "Paytm",
    "Myntra",
    "BigBasket",
    "Uber",
    "Ola"
  ],
  website: [
    "Amazon.in",
    "Flipkart.com",
    "Myntra.com",
    "Nykaa.com",
    "Ajio.com",
    "MakeMyTrip.com",
    "Zomato.com",
    "Swiggy.com",
    "Bookmyshow.com"
  ],
  store: [
    "Reliance Retail",
    "DMart",
    "Big Bazaar",
    "Lifestyle",
    "Shoppers Stop",
    "Croma",
    "Tata CLiQ",
    "Westside",
    "More Supermarket"
  ]
} as const;

// Brands by category
export const BRANDS = {
  electronics: [
    "Samsung",
    "Apple",
    "Xiaomi",
    "OnePlus",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Boat",
    "JBL"
  ],
  fashion: [
    "Myntra",
    "Ajio",
    "Nike",
    "Adidas",
    "H&M",
    "Zara",
    "Levi's",
    "Puma",
    "Westside",
    "Uniqlo"
  ],
  groceries: [
    "BigBasket",
    "Amazon Fresh",
    "Grofers",
    "JioMart",
    "DMart",
    "Nature's Basket",
    "Spencers",
    "Reliance Fresh"
  ]
} as const;