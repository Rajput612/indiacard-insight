import { CreditCard, Platform } from "@/types/spending";

export const creditCards: CreditCard[] = [
  {
    id: "1",
    name: "Premium Rewards Gold",
    issuer: "HDFC Bank",
    annualFee: 1000,
    joinFee: 0,
    interestRate: 3.5,
    minIncome: 800000,
    creditScore: 750,
    benefits: [
      {
        type: "cashback",
        description: "5% cashback on all online purchases",
        value: 5
      },
      {
        type: "fuelSurcharge",
        description: "1% fuel surcharge waiver at all petrol pumps",
        value: 1
      },
      {
        type: "airportLounge",
        description: "Complimentary airport lounge access 4 times per year",
        value: 4
      }
    ],
    categories: [
      {
        category: "online",
        cashbackRate: 5
      },
      {
        category: "travel",
        cashbackRate: 3
      },
      {
        category: "dining",
        cashbackRate: 2
      }
    ],
    imageUrl: "https://i.ibb.co/xGtbfkL/credit-card-gold.png",
    applyUrl: "https://www.hdfcbank.com/apply"
  },
  {
    id: "2",
    name: "ShopMore Platinum",
    issuer: "ICICI Bank",
    annualFee: 500,
    joinFee: 500,
    interestRate: 3.4,
    minIncome: 600000,
    creditScore: 700,
    benefits: [
      {
        type: "cashback",
        description: "3% cashback on all shopping",
        value: 3
      },
      {
        type: "movieDiscount",
        description: "Buy 1 Get 1 movie tickets every weekend",
        value: 50
      }
    ],
    categories: [
      {
        category: "fashion",
        cashbackRate: 5
      },
      {
        category: "electronics",
        cashbackRate: 3
      },
      {
        category: "entertainment",
        cashbackRate: 4
      }
    ],
    imageUrl: "https://i.ibb.co/TrhrXKT/credit-card-blue.png",
    applyUrl: "https://www.icicibank.com/apply"
  },
  {
    id: "3",
    name: "Everyday Rewards",
    issuer: "SBI Card",
    annualFee: 0,
    joinFee: 500,
    interestRate: 3.8,
    minIncome: 400000,
    creditScore: 680,
    benefits: [
      {
        type: "cashback",
        description: "2% cashback on groceries and utility bills",
        value: 2
      },
      {
        type: "fuelSurcharge",
        description: "1% fuel surcharge waiver at all petrol pumps",
        value: 1
      }
    ],
    categories: [
      {
        category: "groceries",
        cashbackRate: 3
      },
      {
        category: "utilities",
        cashbackRate: 2
      },
      {
        category: "fuel",
        cashbackRate: 1
      }
    ],
    imageUrl: "https://i.ibb.co/M9B9r1v/credit-card-green.png",
    applyUrl: "https://www.sbicard.com/apply"
  },
  {
    id: "4",
    name: "Travel Elite",
    issuer: "Axis Bank",
    annualFee: 2000,
    joinFee: 0,
    interestRate: 3.7,
    minIncome: 1000000,
    creditScore: 770,
    benefits: [
      {
        type: "milesEarning",
        description: "4X miles on all travel bookings",
        value: 4
      },
      {
        type: "travelInsurance",
        description: "Complimentary travel insurance up to ₹50 Lakhs",
        value: 5000000
      },
      {
        type: "airportLounge",
        description: "Unlimited domestic airport lounge access",
        value: 12
      },
      {
        type: "noForeignFee",
        description: "No foreign transaction fees",
        value: 0
      }
    ],
    categories: [
      {
        category: "travel",
        cashbackRate: 5
      },
      {
        category: "hotels",
        cashbackRate: 5
      },
      {
        category: "international",
        cashbackRate: 3
      }
    ],
    imageUrl: "https://i.ibb.co/7KtJ3FG/credit-card-black.png",
    applyUrl: "https://www.axisbank.com/apply"
  },
  {
    id: "5",
    name: "Digital First",
    issuer: "RBL Bank",
    annualFee: 500,
    joinFee: 0,
    interestRate: 3.6,
    minIncome: 500000,
    creditScore: 700,
    benefits: [
      {
        type: "cashback",
        description: "5% cashback on all digital and contactless transactions",
        value: 5
      },
      {
        type: "shoppingDiscount",
        description: "10% discount on partner e-commerce platforms",
        value: 10
      }
    ],
    categories: [
      {
        category: "online",
        cashbackRate: 5
      },
      {
        category: "subscriptions",
        cashbackRate: 5
      },
      {
        category: "food delivery",
        cashbackRate: 3
      }
    ],
    imageUrl: "https://i.ibb.co/xGtbfkL/credit-card-gold.png",
    applyUrl: "https://www.rblbank.com/apply"
  }
];

// Sample brands by category
export const brands = {
  electronics: ["Samsung", "Apple", "Xiaomi", "OnePlus", "Dell", "HP", "Lenovo", "Asus", "Boat", "JBL"],
  fashion: ["Myntra", "Ajio", "Nike", "Adidas", "H&M", "Zara", "Levi's", "Puma", "Westside", "Uniqlo"],
  groceries: ["BigBasket", "Amazon Fresh", "Grofers", "JioMart", "DMart", "Nature's Basket", "Spencers", "Reliance Fresh"],
  homeGoods: ["IKEA", "Home Centre", "Urban Ladder", "Pepperfry", "Hometown", "Amazon", "Flipkart"],
  travel: ["MakeMyTrip", "Yatra", "Cleartrip", "EaseMyTrip", "Booking.com", "IRCTC", "Ixigo", "Agoda"],
  foodAndBeverages: ["Swiggy", "Zomato", "Domino's", "McDonald's", "Starbucks", "Cafe Coffee Day", "Local Restaurants"],
  transport: ["Uber", "Ola", "Rapido", "Public Transport", "Metro", "Bus", "Auto Rickshaw"],
  healthcare: ["Apollo", "Medplus", "Netmeds", "PharmEasy", "1mg", "Local Pharmacy"]
};

// Platform options based on category
export const platformOptions: Record<"online" | "offline", Platform[]> = {
  online: ["app", "website", "other"],
  offline: ["store", "other"]
};

// Popular platforms by type
export const popularPlatforms = {
  app: ["Amazon", "Flipkart", "Swiggy", "Zomato", "PhonePe", "Paytm", "Myntra", "BigBasket", "Uber", "Ola"],
  website: ["Amazon.in", "Flipkart.com", "Myntra.com", "Nykaa.com", "Ajio.com", "MakeMyTrip.com", "Zomato.com", "Swiggy.com", "Bookmyshow.com"],
  store: ["Reliance Retail", "DMart", "Big Bazaar", "Lifestyle", "Shoppers Stop", "Croma", "Tata CLiQ", "Westside", "More Supermarket"]
};

// Categories by platform
export const categoriesByPlatform = {
  online: {
    app: ["foodAndBeverages", "travel", "fashion", "groceries", "electronics", "entertainment", "other"],
    website: ["electronics", "fashion", "groceries", "homeGoods", "travel", "entertainment", "other"],
    other: ["electronics", "fashion", "groceries", "homeGoods", "travel", "entertainment", "other"]
  },
  offline: {
    store: ["foodAndBeverages", "fashion", "groceries", "homeGoods", "electronics", "healthcare", "education", "other"],
    other: ["foodAndBeverages", "transport", "housingAndUtilities", "healthcare", "education", "entertainment", "other"]
  }
};

// Subcategories by category
export const subcategoriesByCategory = {
  electronics: ["Smartphones", "Laptops", "Audio", "Cameras", "Accessories", "TV & Home Theater", "Gaming", "Other"],
  fashion: ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories", "Children's Wear", "Sportswear", "Ethnic Wear", "Other"],
  groceries: ["Fresh Produce", "Packaged Foods", "Beverages", "Dairy", "Household Supplies", "Personal Care", "Pet Supplies", "Other"],
  homeGoods: ["Furniture", "Decor", "Kitchen Appliances", "Bedding", "Lighting", "Bathroom", "Storage", "Other"],
  travel: ["Flights", "Hotels", "Packages", "Car Rentals", "Cruises", "Bus Tickets", "Train Tickets", "Other"],
  entertainment: ["Movies", "Music", "Gaming", "Streaming Services", "Events", "Theme Parks", "Books", "Other"],
  foodAndBeverages: ["Restaurants", "Cafes", "Fast Food", "Bars & Pubs", "Food Delivery", "Catering", "Specialty Foods", "Other"],
  transport: ["Public Transit", "Taxi/Cab", "Car Expenses", "Bike/Scooter", "Fuel", "Parking", "Tolls", "Other"],
  housingAndUtilities: ["Rent/Mortgage", "Electricity", "Water", "Gas", "Internet", "Cable TV", "Phone", "Other"],
  healthcare: ["Medicines", "Doctor Visits", "Hospital", "Dental", "Vision", "Fitness", "Insurance", "Other"],
  education: ["Tuition", "Books", "Courses", "Coaching", "School Supplies", "Exams & Tests", "Certifications", "Other"],
  other: ["Miscellaneous", "Donations", "Gifts", "Subscriptions", "Professional Services", "Maintenance", "Repairs", "Other"]
};

// Brands by subcategory
export const brandsBySubcategory = {
  Smartphones: ["Apple", "Samsung", "Xiaomi", "OnePlus", "Vivo", "Oppo", "Realme", "Nothing", "Google", "Motorola"],
  Laptops: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Microsoft", "Samsung", "LG"],
  "Men's Clothing": ["Levi's", "Allen Solly", "Louis Philippe", "Van Heusen", "Peter England", "Jack & Jones", "H&M", "Zara", "US Polo", "Arrow"],
  "Women's Clothing": ["Zara", "H&M", "Westside", "Biba", "W", "AND", "Fabindia", "Vero Moda", "Forever 21", "Lifestyle"],
  Restaurants: ["McDonald's", "Domino's", "Pizza Hut", "KFC", "Subway", "Burger King", "Taco Bell", "Haldiram's", "Wow! Momo", "Barbeque Nation"],
  "Fresh Produce": ["BigBasket", "JioMart", "DMart", "Nature's Basket", "Reliance Fresh", "More", "Spencer's", "Grofers", "Amazon Fresh", "Flipkart Supermart"]
};

// Helper functions for cascading dropdowns
export const getCategoriesByPlatform = (category: "online" | "offline", platform: Platform): string[] => {
  return categoriesByPlatform[category][platform] || [];
};

export const getSubcategoriesByCategory = (category: string): string[] => {
  return subcategoriesByCategory[category as keyof typeof subcategoriesByCategory] || [];
};

export const getBrandsBySubcategory = (category: string, subcategory: string): string[] => {
  // First try to get brands by exact subcategory
  const exactBrands = brandsBySubcategory[subcategory as keyof typeof brandsBySubcategory];
  if (exactBrands) {
    return exactBrands;
  }
  
  // Fallback to category brands
  return brands[category as keyof typeof brands] || [];
};

// Helper function to find the best card based on spending profile
export const findBestCreditCards = (spendingProfile: { 
  onlinePercentage: number, 
  categories: Record<string, number>
}): CreditCard[] => {
  // Simple algorithm to match cards with spending pattern
  const scoredCards = creditCards.map(card => {
    let score = 0;
    
    // Score based on online vs offline spending
    const onlineCategories = card.categories.filter(cat => cat.category === 'online');
    if (onlineCategories.length > 0 && spendingProfile.onlinePercentage > 50) {
      score += 10;
    }
    
    // Score based on category match
    for (const [category, percentage] of Object.entries(spendingProfile.categories)) {
      const matchingCategory = card.categories.find(cat => 
        cat.category.toLowerCase() === category.toLowerCase()
      );
      
      if (matchingCategory) {
        score += (matchingCategory.cashbackRate * percentage / 100);
      }
    }
    
    return { card, score };
  });
  
  // Sort by score and return top 3
  return scoredCards
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(scored => scored.card);
};
