
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SpendingEntry } from "@/types/spending";
import { findBestCreditCards } from "@/data/creditCards";
import SpendingDetailStep from "./SpendingDetailStep";
import CreditCardRecommendations from "../CreditCardRecommendations";
import PromotionalBanner from "./PromotionalBanner";
import CardPreferences, { CardPreferences as ICardPreferences } from "./CardPreferences";
import { RotateCw, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SpendingFormContainer = () => {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [spendingEntries, setSpendingEntries] = useState<SpendingEntry[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [cardPreferences, setCardPreferences] = useState<ICardPreferences>({
    compareCards: [],
    excludeCards: [],
    ownedCards: user?.ownedCards || [],
    desiredCardCount: 1
  });
  
  // Update owned cards when user data changes
  useEffect(() => {
    if (user) {
      setCardPreferences(prev => ({
        ...prev,
        ownedCards: user.ownedCards || []
      }));
    }
  }, [user]);

  const addSpendingEntry = (entry: SpendingEntry) => {
    setSpendingEntries((prev) => [...prev, entry]);
  };
  
  const removeSpendingEntry = (id: string) => {
    setSpendingEntries((prev) => prev.filter(entry => entry.id !== id));
  };

  const updateSpendingEntry = (id: string, updatedEntry: SpendingEntry) => {
    setSpendingEntries((prev) => 
      prev.map(entry => entry.id === id ? updatedEntry : entry)
    );
  };

  // Calculate recommendations whenever spending entries or card preferences change
  useEffect(() => {
    if (spendingEntries.length === 0) {
      setRecommendations([]);
      return;
    }
    
    setIsCalculating(true);
    
    // Small delay to show calculation is happening
    const timer = setTimeout(() => {
      const recommendedCards = findBestCreditCards({
        entries: spendingEntries,
        preferences: cardPreferences
      });
      
      setRecommendations(recommendedCards);
      setIsCalculating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [spendingEntries, cardPreferences]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 my-8 animate-fade-in">
      {/* Promotional Banner */}
      <PromotionalBanner />
      
      {/* Card Preferences Section */}
      <div className="relative">
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="text-center p-6">
              <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Unlock Advanced Features
              </h3>
              <p className="text-gray-500 mb-4 max-w-md">
                Sign in to access personalized card preferences, track your cards, and get better recommendations.
              </p>
              <Button 
                variant="outline" 
                className="bg-white hover:bg-gray-50"
                onClick={() => navigate('/login')}
              >
                Sign In to Access
              </Button>
            </div>
          </div>
        )}
        <CardPreferences 
          preferences={cardPreferences}
          onPreferencesChange={setCardPreferences}
        />
      </div>
      
      {/* Main content */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <SpendingDetailStep 
            entries={spendingEntries} 
            addEntry={addSpendingEntry} 
            removeEntry={removeSpendingEntry}
            updateEntry={updateSpendingEntry}
          />
        </div>
        
        <div className="relative">
          {isCalculating && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
              <div className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg">
                <RotateCw className="h-4 w-4 animate-spin" />
                <span>Updating recommendations...</span>
              </div>
            </div>
          )}
          
          <div className={`transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
            {spendingEntries.length > 0 ? (
              <CreditCardRecommendations recommendations={recommendations} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6">
                <h3 className="text-xl font-bold text-navy mb-2">Add spending details</h3>
                <p className="text-gray-600 text-center mb-4">
                  Start adding your spending habits to see personalized credit card recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingFormContainer;
