import React, { useState } from "react";
import { useFilteredCreditCards } from "@/hooks/useFilteredCreditCards";
import { Badge } from "@/components/ui/badge";
import CreditCardBanner from "@/components/CreditCardBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, Plane, CreditCard, ShoppingBag, Percent, ThumbsUp } from "lucide-react";

const categoryOptions = [
  { id: "all", label: "All Cards", icon: <CreditCard className="h-4 w-4" /> },
  { id: "rewards", label: "Rewards", icon: <Star className="h-4 w-4" /> },
  { id: "travel", label: "Travel", icon: <Plane className="h-4 w-4" /> },
  { id: "no-annual-fee", label: "No Annual Fee", icon: <Percent className="h-4 w-4" /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "new-launch", label: "New Launch", icon: <Star className="h-4 w-4" /> },
  { id: "high-approval", label: "High Approval Rate", icon: <ThumbsUp className="h-4 w-4" /> },
  { id: "limited-time", label: "Limited Time Offer", icon: <Clock className="h-4 w-4" /> },
  { id: "premium", label: "Premium Cards", icon: <CreditCard className="h-4 w-4" /> }
];

const AllCards = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { filteredCards, loading } = useFilteredCreditCards(selectedCategory || undefined);

  const getStatusBadge = (card: any) => {
    if (card.isNewLaunch) {
      return (
        <div className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Star className="h-3 w-3" />
          New Launch
        </div>
      );
    }
    if (card.isLimitedTime) {
      return (
        <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Limited Time Offer
        </div>
      );
    }
    if (card.isHighApproval) {
      return (
        <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
          <ThumbsUp className="h-3 w-3" />
          High Approval Rate
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">Explore All Credit Cards</h1>
          <p className="text-gray-600">
            Compare features and benefits to find the perfect card for your lifestyle.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryOptions.map((category) => (
              <Badge 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`cursor-pointer rounded-full px-4 py-2 flex items-center gap-2 ${
                  selectedCategory === category.id ? 'bg-navy text-white' : 'hover:bg-gray-100'
                }`}
              >
                {category.icon}
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-navy">{card.name}</h3>
                      <p className="text-sm text-gray-600">{card.issuer}</p>
                    </div>
                    {getStatusBadge(card)}
                  </div>
                  
                  <div className="mb-6">
                    <CreditCardBanner card={card} size="md" showSpark={false} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Annual Fee</p>
                      <p className="font-semibold">₹{card.annualFee === 0 ? '0' : card.annualFee.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Joining Fee</p>
                      <p className="font-semibold">₹{card.joinFee === 0 ? '0' : card.joinFee.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
                    <ul className="space-y-2">
                      {card.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="text-green-500 mt-0.5">✓</div>
                          <div className="text-gray-700">{benefit.description}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-navy hover:bg-navy/90 flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href={card.applyUrl} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
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