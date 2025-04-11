
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SpendingEntry, SpendingProfile } from "@/types/spending";
import { findBestCreditCards } from "@/data/creditCards";
import SpendingCategoryStep from "./SpendingCategoryStep";
import SpendingDetailStep from "./SpendingDetailStep";
import CreditCardRecommendations from "../CreditCardRecommendations";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";

const SpendingFormContainer = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [spendingEntries, setSpendingEntries] = useState<SpendingEntry[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  const addSpendingEntry = (entry: SpendingEntry) => {
    setSpendingEntries((prev) => [...prev, entry]);
  };
  
  const removeSpendingEntry = (id: string) => {
    setSpendingEntries((prev) => prev.filter(entry => entry.id !== id));
  };

  const generateRecommendations = () => {
    if (spendingEntries.length === 0) {
      toast({
        title: "No spending data",
        description: "Please add at least one spending entry to get recommendations.",
        variant: "destructive"
      });
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
    
    // Create spending profile for recommendation engine
    const spendingProfile = {
      entries: spendingEntries,
      totalMonthlySpending: totalMonthly,
      onlinePercentage,
      offlinePercentage: 100 - onlinePercentage,
      categories: categoryPercentages
    };
    
    // Get recommendations
    const recommendedCards = findBestCreditCards({
      onlinePercentage,
      categories: categoryPercentages
    });
    
    setRecommendations(recommendedCards);
    setStep(3);
    
    toast({
      title: "Recommendations Ready!",
      description: "We've found the best credit cards for your spending pattern.",
      variant: "default"
    });
  };

  const nextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      generateRecommendations();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 my-8 animate-fade-in">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Step {step} of 3</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {step === 1 ? "Select Categories" : step === 2 ? "Add Spending Details" : "View Recommendations"}
            </span>
            <CreditCard className="h-4 w-4 text-navy" />
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-navy to-slate-blue h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form steps */}
      {step === 1 && (
        <SpendingCategoryStep />
      )}
      
      {step === 2 && (
        <SpendingDetailStep 
          entries={spendingEntries} 
          addEntry={addSpendingEntry} 
          removeEntry={removeSpendingEntry}
        />
      )}
      
      {step === 3 && (
        <CreditCardRecommendations recommendations={recommendations} />
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        
        {step < 3 && (
          <Button 
            onClick={nextStep}
            className="ml-auto bg-navy hover:bg-navy/90 text-white flex items-center gap-2"
          >
            {step === 2 ? "Get Recommendations" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpendingFormContainer;
