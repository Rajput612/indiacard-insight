import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SpendingEntry } from "@/types/spending";
import { findBestCreditCards } from "@/data/creditCards";
import SpendingDetailStep from "./SpendingDetailStep";
import CreditCardRecommendations from "../CreditCardRecommendations";
import PromotionalBanner from "./PromotionalBanner";
import { RotateCw } from "lucide-react";

const SpendingFormContainer = () => {
  const { toast } = useToast();
  const [spendingEntries, setSpendingEntries] = useState<SpendingEntry[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  
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

  // Calculate recommendations whenever spending entries change
  useEffect(() => {
    if (spendingEntries.length === 0) {
      setRecommendations([]);
      return;
    }
    
    setIsCalculating(true);
    
    // Small delay to show calculation is happening
    const timer = setTimeout(() => {
      generateRecommendations();
      setIsCalculating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [spendingEntries]);

  const generateRecommendations = () => {
    if (spendingEntries.length === 0) {
      setRecommendations([]);
      return;
    }
    
    // Calculate total monthly spending
    let totalMonthly = 0;
    let onlineTotal = 0;
    const categoryTotals: Record<string, number> = {};

    spendingEntries.forEach(entry => {
      let monthlyAmount = entry.amount;
      
      // Convert to monthly amount based on frequency
      switch (entry.frequency) {
        case 'daily':
          monthlyAmount *= 30;
          break;
        case 'weekly':
          monthlyAmount *= 4;
          break;
        case 'quarterly':
          monthlyAmount /= 3;
          break;
        case 'yearly':
          monthlyAmount /= 12;
          break;
        case 'one-time':
          monthlyAmount /= 12; // Amortize over a year
          break;
      }
      
      totalMonthly += monthlyAmount;
      
      if (entry.category === 'online') {
        onlineTotal += monthlyAmount;
      }
      
      // Track spending by subcategory
      const categoryKey = entry.subcategory;
      if (!categoryTotals[categoryKey]) {
        categoryTotals[categoryKey] = 0;
      }
      categoryTotals[categoryKey] += monthlyAmount;
    });
    
    const onlinePercentage = totalMonthly > 0 ? (onlineTotal / totalMonthly) * 100 : 0;
    
    // Convert category totals to percentages
    const categoryPercentages: Record<string, number> = {};
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      categoryPercentages[category] = (amount / totalMonthly) * 100;
    });
    
    // Get recommendations with entries included
    const recommendedCards = findBestCreditCards({
      onlinePercentage,
      categories: categoryPercentages,
      entries: spendingEntries
    });
    
    setRecommendations(recommendedCards);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 my-8 animate-fade-in">
      {/* Promotional Banner */}
      <PromotionalBanner />
      
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