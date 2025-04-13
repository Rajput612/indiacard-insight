
import React, { useState } from "react";
import { useFilteredCreditCards } from "@/hooks/useFilteredCreditCards";
import { Badge } from "@/components/ui/badge";
import CreditCardBanner from "@/components/CreditCardBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, Plane, CreditCard, ShoppingBag, Percent, ThumbsUp } from "lucide-react";

// Define all category options that should be available
const categoryOptions = [
  "Rewards", 
  "Travel", 
  "No Annual Fee", 
  "Shopping", 
  "New Launch", 
  "High Approval Rate", 
  "Limited Time Offer", 
  "Premium"
];

const AllCards = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { filteredCards, loading } = useFilteredCreditCards(selectedCategory || undefined);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Rewards": return <CreditCard className="h-4 w-4" />;
      case "Travel": return <Plane className="h-4 w-4" />;
      case "No Annual Fee": return <Percent className="h-4 w-4" />;
      case "Shopping": return <ShoppingBag className="h-4 w-4" />;
      case "New Launch": return <Star className="h-4 w-4" />;
      case "High Approval Rate": return <ThumbsUp className="h-4 w-4" />;
      case "Limited Time Offer": return <Clock className="h-4 w-4" />;
      case "Premium": return <CreditCard className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getCategoryTag = (categoryName: string) => {
    switch (categoryName) {
      case "New Launch":
        return (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-3 w-3" /> New Launch
          </div>
        );
      case "High Approval Rate":
        return (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" /> High Approval
          </div>
        );
      case "Limited Time Offer":
        return (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="h-3 w-3" /> Limited Time
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-navy">Explore All Credit Cards</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare features and benefits to find the perfect card for your lifestyle.
          </p>
        </div>
        
        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap gap-2 justify-center bg-gray-50 p-3 rounded-lg">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="cursor-pointer rounded-full px-4 py-2"
            >
              All Cards
            </Badge>
            
            {categoryOptions.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer rounded-full px-4 py-2 flex items-center gap-1"
              >
                {getCategoryIcon(category)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards.map((card) => {
              // Determine if this card has a special tag
              let specialCategory = null;
              for (const category of card.categories) {
                const categoryName = typeof category === 'string' ? category : (category && 'category' in category) ? category.category : '';
                if (["New Launch", "High Approval Rate", "Limited Time Offer"].includes(categoryName)) {
                  specialCategory = categoryName;
                  break;
                }
              }
              
              return (
                <div 
                  key={card.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg relative"
                >
                  {/* Special category tag if applicable */}
                  {specialCategory && getCategoryTag(specialCategory)}
                  
                  <div className="p-4 pb-0">
                    <h3 className="text-xl font-bold mb-1">{card.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{card.issuer}</p>
                  </div>
                  
                  <div className="p-4">
                    <CreditCardBanner card={card} size="md" showSpark={false} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 px-4 py-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Annual Fee</p>
                      <p className="font-semibold">₹{card.annualFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Joining Fee</p>
                      <p className="font-semibold">₹{Math.floor(card.annualFee * 0.5).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 border-t border-gray-100">
                    <p className="font-medium text-sm mb-2">Key Benefits</p>
                    <ul className="space-y-2">
                      {card.rewards.cashback.categories.slice(0, 2).map((reward, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="text-green-500 mt-0.5">✓</div>
                          <div>
                            {reward.rate}% cashback on {typeof reward.category === 'string' ? reward.category.toLowerCase() : ''}
                          </div>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-sm">
                        <div className="text-green-500 mt-0.5">✓</div>
                        <div>1% fuel surcharge waiver</div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100">
                    <Button className="w-full bg-navy hover:bg-navy/90 flex items-center justify-center gap-1">
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCards;
