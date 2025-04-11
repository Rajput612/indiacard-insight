
import { CreditCard } from "@/types/spending";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard as CreditCardIcon, ExternalLink, Medal, Star } from "lucide-react";

type CreditCardRecommendationsProps = {
  recommendations: CreditCard[];
};

const CreditCardRecommendations = ({ recommendations }: CreditCardRecommendationsProps) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">No recommendations available. Please add more spending details.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Your Personalized Credit Card Recommendations</h2>
        <p className="text-gray-600">
          Based on your spending habits, we've found the best credit cards for you.
        </p>
      </div>

      <div className="grid gap-8">
        {recommendations.map((card, index) => (
          <div 
            key={card.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
              index === 0 ? 'border-gold' : 'border-gray-200'
            }`}
          >
            {index === 0 && (
              <div className="bg-gold text-navy px-4 py-1 text-sm font-medium flex items-center justify-center">
                <Medal className="h-4 w-4 mr-1" />
                Best Match
              </div>
            )}
            
            <div className="md:flex">
              {/* Card image */}
              <div className="md:w-2/5 p-6 flex items-center justify-center card-gradient">
                <div className="w-full max-w-[240px] aspect-[1.6/1] bg-gradient-to-br from-navy to-slate-blue rounded-xl shadow-lg flex items-center justify-center p-4 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="text-white text-center">
                    <CreditCardIcon className="h-10 w-10 mx-auto mb-2" />
                    <h3 className="font-bold">{card.name}</h3>
                    <p className="text-sm opacity-80">{card.issuer}</p>
                  </div>
                </div>
              </div>
              
              {/* Card details */}
              <div className="md:w-3/5 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-navy">{card.name}</h3>
                    <p className="text-gray-600">{card.issuer}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(index === 0 ? 5 : index === 1 ? 4 : 3)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  {/* Card benefits */}
                  <div>
                    <h4 className="text-sm font-medium text-navy mb-2">Key Benefits</h4>
                    <div className="space-y-2">
                      {card.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success-green mr-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Card categories */}
                  <div>
                    <h4 className="text-sm font-medium text-navy mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-2">
                      {card.categories.map((category, i) => (
                        <Badge key={i} variant="outline" className="bg-navy/5">
                          {category.category.replace(/([A-Z])/g, ' $1').trim()}
                          {category.cashbackRate > 0 && ` (${category.cashbackRate}%)`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Card fees */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Annual Fee:</span>{" "}
                      <span className="font-medium">
                        {card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Joining Fee:</span>{" "}
                      <span className="font-medium">
                        {card.joinFee === 0 ? "Free" : `₹${card.joinFee.toLocaleString()}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Interest Rate:</span>{" "}
                      <span className="font-medium">{card.interestRate}% per month</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-navy hover:bg-navy/90 text-white mt-4">
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-8">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-navy">Note:</span> Credit card approval depends on your credit score, 
          income, and other factors. These recommendations are based solely on your spending patterns and 
          do not guarantee approval.
        </p>
      </div>
    </div>
  );
};

export default CreditCardRecommendations;
