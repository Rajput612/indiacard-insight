import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Clock, Star, ThumbsUp, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { creditCards } from "@/data/creditCards";
import CreditCardBanner from "@/components/CreditCardBanner";

// Define promotion types and their criteria
const promotions = {
  newLaunch: {
    title: "New Launch",
    icon: <Star className="h-4 w-4" />,
    color: "bg-amber-500",
    cards: ["1"], // Premium Rewards Gold
  },
  highApproval: {
    title: "High Approval Rate",
    icon: <ThumbsUp className="h-4 w-4" />,
    color: "bg-green-500",
    cards: ["3"], // Everyday Rewards
  },
  limitedTime: {
    title: "Limited Time Offer",
    icon: <Clock className="h-4 w-4" />,
    color: "bg-blue-500",
    cards: ["2"], // ShopMore Platinum
  },
  premium: {
    title: "Premium Cards",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-purple-500",
    cards: ["4"], // Travel Elite
  }
};

const AllCards = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const getFilteredCards = () => {
    if (filter === "all") return creditCards;
    if (filter === "rewards") return creditCards.filter(card => card.categories.some(cat => cat.cashbackRate >= 3));
    if (filter === "travel") return creditCards.filter(card => card.categories.some(cat => cat.category === "travel"));
    if (filter === "noFee") return creditCards.filter(card => card.annualFee === 0);
    if (filter === "shopping") return creditCards.filter(card => card.categories.some(cat => ["fashion", "electronics", "groceries"].includes(cat.category)));
    
    // Handle promotion-specific filters
    for (const [key, promotion] of Object.entries(promotions)) {
      if (filter === key) {
        return creditCards.filter(card => promotion.cards.includes(card.id));
      }
    }
    
    return creditCards;
  };

  const getPromotionBadge = (cardId: string) => {
    for (const [key, promotion] of Object.entries(promotions)) {
      if (promotion.cards.includes(cardId)) {
        return (
          <Badge className={`${promotion.color} text-white flex items-center gap-1`}>
            {promotion.icon}
            {promotion.title}
          </Badge>
        );
      }
    }
    return null;
  };
  
  const filteredCards = getFilteredCards();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-navy mb-3">Explore All Credit Cards</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compare features and benefits to find the perfect card for your lifestyle.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="max-w-5xl mx-auto" onValueChange={setFilter}>
            <div className="overflow-x-auto pb-2 -mb-2">
              <TabsList className="inline-flex w-auto min-w-full sm:min-w-0 h-auto items-center justify-start sm:justify-center p-1 flex-wrap gap-1">
                <TabsTrigger value="all" className="min-w-[100px]">All Cards</TabsTrigger>
                <TabsTrigger value="rewards" className="min-w-[100px]">Rewards</TabsTrigger>
                <TabsTrigger value="travel" className="min-w-[100px]">Travel</TabsTrigger>
                <TabsTrigger value="noFee" className="min-w-[120px]">No Annual Fee</TabsTrigger>
                <TabsTrigger value="shopping" className="min-w-[100px]">Shopping</TabsTrigger>
                
                {/* Promotion-specific tabs */}
                {Object.entries(promotions).map(([key, promotion]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="min-w-[140px] flex items-center gap-1"
                  >
                    {promotion.icon}
                    {promotion.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={filter} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <Card key={card.id} className="h-full flex flex-col border-t-4 hover:shadow-lg transition-shadow" 
                    style={{ borderTopColor: card.id === "1" || card.id === "4" ? "#8B5CF6" : card.id === "2" ? "#06B6D4" : card.id === "3" ? "#10B981" : "#F97316" }}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-navy">{card.name}</CardTitle>
                        {getPromotionBadge(card.id)}
                      </div>
                      <CardDescription>{card.issuer}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow py-3">
                      <div className="mb-6">
                        <CreditCardBanner card={card} size="md" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Annual Fee</p>
                            <p className="font-medium">₹{card.annualFee}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Joining Fee</p>
                            <p className="font-medium">₹{card.joinFee}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-gray-500 text-sm mb-1">Key Benefits</p>
                          <ul className="space-y-1">
                            {card.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-start text-sm">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{benefit.description}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button className="w-full bg-navy hover:bg-navy/90" asChild>
                        <a href={card.applyUrl} target="_blank" rel="noopener noreferrer">
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCards;