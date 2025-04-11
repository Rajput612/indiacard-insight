
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
        {recommendations.map((card, index) => (
          <div 
            key={card.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden border ${
              index === 0 ? 'border-gold' : 'border-gray-200'
            } transition-all hover:shadow-lg`}
          >
            {index === 0 && (
              <div className="bg-gold text-navy px-3 py-0.5 text-xs font-medium flex items-center justify-center">
                <Medal className="h-3 w-3 mr-1" />
                Best Match
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-navy to-slate-blue rounded-lg flex items-center justify-center">
                    <CreditCardIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{card.name}</h3>
                    <p className="text-xs text-gray-600">{card.issuer}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-0.5">
                  {[...Array(index === 0 ? 5 : index === 1 ? 4 : 3)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                {/* Top benefits */}
                <div className="space-y-1.5">
                  {card.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Categories */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {card.categories.map((category, i) => (
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
                      {card.annualFee === 0 ? "Free" : `₹${card.annualFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Joining Fee:</span>{" "}
                    <span className="font-medium">
                      {card.joinFee === 0 ? "Free" : `₹${card.joinFee.toLocaleString()}`}
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
          <span className="font-medium text-navy">Note:</span> These recommendations are based 
          solely on your spending patterns and do not guarantee approval.
        </p>
      </div>
    </div>
  );
};

export default CreditCardRecommendations;
