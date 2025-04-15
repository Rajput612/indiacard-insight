import { CreditCard } from "@/types/spending";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard as CreditCardIcon, ExternalLink, Medal, Star, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreditCardBanner from "./CreditCardBanner";

type CreditCardRecommendationsProps = {
  recommendations: {
    cards: {
      card: CreditCard;
      savingsBreakdown: {
        category: string;
        monthlySpend: number;
        cashbackRate: number;
        monthlySavings: number;
      }[];
      totalSavings: number;
      coveragePercentage: number;
    }[];
    totalGroupSavings: number;
    spendCoverage: number;
  }[];
};

const CreditCardRecommendations = ({ recommendations }: CreditCardRecommendationsProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">Add more spending details to get personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-navy mb-1">Your Personalized Card Combinations</h2>
        <p className="text-sm text-gray-600">
          We've analyzed your spending to find the best credit card combinations that maximize your rewards.
        </p>
      </div>

      <div className="space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {recommendations.map((group, groupIndex) => (
          <Card key={groupIndex} className={`${groupIndex === 0 ? 'border-gold' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {groupIndex === 0 && <Medal className="h-5 w-5 text-gold" />}
                    {group.cards.length === 1 ? 'Single Card' : `${group.cards.length} Card Combination`}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    Total Monthly Savings: ₹{Math.round(group.totalGroupSavings).toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {Math.round(group.spendCoverage)}% Spend Coverage
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {group.cards.map((cardResult, cardIndex) => (
                <div key={cardResult.card.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-navy">Role {cardIndex + 1}</h4>
                      <p className="text-sm text-gray-600">
                        Primary card for {cardResult.savingsBreakdown
                          .sort((a, b) => b.monthlySavings - a.monthlySavings)
                          .slice(0, 2)
                          .map(b => b.category)
                          .join(", ")}
                      </p>
                    </div>
                    <Badge className="bg-blue-50 text-blue-700">
                      ₹{Math.round(cardResult.totalSavings).toLocaleString()} / month
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <CreditCardBanner card={cardResult.card} size="sm" />
                    
                    <div>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="savings">
                          <AccordionTrigger className="text-sm">
                            View Category Breakdown
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {cardResult.savingsBreakdown.map((breakdown, i) => (
                                <div key={i} className="text-xs grid grid-cols-4 gap-2 py-1 border-b last:border-0">
                                  <div className="font-medium">{breakdown.category}</div>
                                  <div className="text-right">₹{Math.round(breakdown.monthlySpend).toLocaleString()}</div>
                                  <div className="text-right text-green-600">{breakdown.cashbackRate}%</div>
                                  <div className="text-right font-medium">₹{Math.round(breakdown.monthlySavings).toLocaleString()}</div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Button 
                        size="sm" 
                        className="w-full mt-4 bg-navy hover:bg-navy/90"
                        onClick={() => window.open(cardResult.card.applyUrl, '_blank')}
                      >
                        Apply Now
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-4">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-navy">Note:</span> These recommendations and savings calculations are based 
          on your provided spending patterns. Actual savings may vary based on specific terms, conditions, and spending limits.
        </p>
      </div>
    </div>
  );
};

export default CreditCardRecommendations;