import { CreditCard } from "@/types/spending";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard as CreditCardIcon, ExternalLink, Medal, Star, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type CreditCardRecommendationsProps = {
  recommendations: {
    card: CreditCard;
    score: number;
    potentialSavings: number;
    savingsBreakdown: {
      category: string;
      monthlySpend: number;
      cashbackRate: number;
      monthlySavings: number;
    }[];
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
        <h2 className="text-xl font-bold text-navy mb-1">Your Personalized Recommendations</h2>
        <p className="text-sm text-gray-600">
          These recommendations update in real-time as you add or remove spending.
        </p>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {recommendations.map((rec, index) => (
          <div 
            key={rec.card.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden border ${
              index === 0 ? 'border-gold' : 'border-gray-200'
            } transition-all hover:shadow-lg`}
          >
            {index === 0 && (
              <div className="bg-gold text-navy px-3 py-0.5 text-xs font-medium flex items-center justify-center">
                <Medal className="h-3 w-3 mr-1" />
                Best Match • Estimated Monthly Savings: ₹{Math.round(rec.potentialSavings).toLocaleString()}
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-navy to-slate-blue rounded-lg flex items-center justify-center">
                    <CreditCardIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{rec.card.name}</h3>
                    <p className="text-xs text-gray-600">{rec.card.issuer}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-0.5">
                  {[...Array(index === 0 ? 5 : index === 1 ? 4 : 3)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                {/* Savings Summary */}
                <div className="bg-navy/5 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <h4 className="font-medium text-navy">Potential Savings</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Monthly</p>
                      <p className="font-medium text-navy">₹{Math.round(rec.potentialSavings).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Annual</p>
                      <p className="font-medium text-navy">₹{Math.round(rec.potentialSavings * 12).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Savings Breakdown */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="savings">
                    <AccordionTrigger className="text-sm">
                      View Savings Breakdown
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {rec.savingsBreakdown.map((breakdown, i) => (
                          <div key={i} className="text-xs grid grid-cols-4 gap-2 py-1 border-b last:border-0">
                            <div className="font-medium">{breakdown.category.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className="text-right">₹{Math.round(breakdown.monthlySpend).toLocaleString()}</div>
                            <div className="text-right text-green-600">{breakdown.cashbackRate}%</div>
                            <div className="text-right font-medium">₹{Math.round(breakdown.monthlySavings).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                {/* Top benefits */}
                <div className="space-y-1.5">
                  {rec.card.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Categories */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {rec.card.categories.map((category, i) => (
                      <Badge key={i} variant="outline" className="bg-navy/5 text-xs py-0">
                        {category.category.replace(/([A-Z])/g, ' $1').trim()}
                        {category.cashbackRate > 0 && ` (${category.cashbackRate}%)`}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Fees */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <div>
                    <span className="text-gray-500">Annual Fee:</span>{" "}
                    <span className="font-medium">
                      {rec.card.annualFee === 0 ? "Free" : `₹${rec.card.annualFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Joining Fee:</span>{" "}
                    <span className="font-medium">
                      {rec.card.joinFee === 0 ? "Free" : `₹${rec.card.joinFee.toLocaleString()}`}
                    </span>
                  </div>
                </div>
                
                <Button size="sm" className="w-full bg-navy hover:bg-navy/90 text-white text-xs">
                  Apply Now
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
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