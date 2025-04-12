
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { creditCards } from "@/data/creditCards";
import CreditCardBanner from "@/components/CreditCardBanner";

const AllCards = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredCards = filter === "all" 
    ? creditCards 
    : creditCards.filter(card => {
        if (filter === "rewards") return card.categories.some(cat => cat.cashbackRate >= 3);
        if (filter === "travel") return card.categories.some(cat => cat.category === "travel");
        if (filter === "noFee") return card.annualFee === 0;
        if (filter === "shopping") return card.categories.some(cat => ["fashion", "electronics", "groceries"].includes(cat.category));
        return true;
      });
  
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
            <TabsList className="grid grid-cols-5 w-full mb-8">
              <TabsTrigger value="all">All Cards</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="noFee">No Annual Fee</TabsTrigger>
              <TabsTrigger value="shopping">Shopping</TabsTrigger>
            </TabsList>
            
            <TabsContent value={filter} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <Card key={card.id} className="h-full flex flex-col border-t-4 hover:shadow-lg transition-shadow" 
                    style={{ borderTopColor: card.id === "1" || card.id === "4" ? "#8B5CF6" : card.id === "2" ? "#06B6D4" : card.id === "3" ? "#10B981" : "#F97316" }}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-navy">{card.name}</CardTitle>
                        {card.id === "1" && (
                          <Badge className="bg-gold">Best Overall</Badge>
                        )}
                        {card.id === "4" && (
                          <Badge className="bg-indigo-500">Premium Pick</Badge>
                        )}
                      </div>
                      <CardDescription>{card.issuer}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow py-3">
                      {/* Using the new CreditCardBanner component */}
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
