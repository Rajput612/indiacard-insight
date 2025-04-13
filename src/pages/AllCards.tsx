
import React, { useState } from "react";
import { useFilteredCreditCards } from "@/hooks/useFilteredCreditCards";
import { Badge } from "@/components/ui/badge";
import CreditCardBanner from "@/components/CreditCardBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AllCards = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { filteredCards, loading } = useFilteredCreditCards(selectedCategory || undefined);

  // Extract unique categories from all credit cards - handle both string and object formats
  const uniqueCategories = Array.from(
    new Set(
      filteredCards.flatMap((card) => card.categories)
        .filter((category): category is string => typeof category === 'string')
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-navy">Credit Cards</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === null ? "default" : "secondary"}
              onClick={() => setSelectedCategory(null)}
              className="cursor-pointer"
            >
              All Categories
            </Badge>
            {uniqueCategories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <CreditCardBanner card={card} />
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.categories.map((category, idx) => {
                      // Handle both string and object formats for categories
                      const categoryText = typeof category === 'string' ? category : category.category;
                      return (
                        <Badge key={`${categoryText}-${idx}`} variant="outline">
                          {categoryText}
                        </Badge>
                      );
                    })}
                  </div>
                  
                  {card.highlight && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {card.highlight}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Annual Fee</p>
                      <p className="font-medium">₹{card.annualFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cashback Rate</p>
                      <p className="font-medium">{card.cashbackRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCards;
