
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "@/types/spending";
import { Calculator, CreditCard as CreditCardIcon, Sparkles } from "lucide-react";
import { 
  getCategoriesByPlatform, 
  getSubcategoriesByCategory, 
  getBrandsBySubcategory, 
  popularPlatforms 
} from "@/data/creditCards";
import type { Platform } from "@/types/spending";
import { useToast } from "@/hooks/use-toast";

interface PurchaseAdvisorProps {
  ownedCards: CreditCard[];
}

const PurchaseAdvisor = ({ ownedCards }: PurchaseAdvisorProps) => {
  const { toast } = useToast();
  const [purchaseType, setPurchaseType] = useState<"online" | "offline">("online");
  const [platform, setPlatform] = useState<Platform>("website");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [results, setResults] = useState<{
    cardId: string;
    cardName: string;
    issuer: string;
    cashbackRate: number;
    cashbackAmount: number;
  }[]>([]);

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Update available categories when platform changes
  React.useEffect(() => {
    const categories = getCategoriesByPlatform(purchaseType, platform);
    setAvailableCategories(categories);
    if (categories.length > 0) {
      setCategory(categories[0]);
    } else {
      setCategory("");
    }
  }, [purchaseType, platform]);

  const calculateRewards = () => {
    if (!amount || !category) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and category",
        variant: "destructive",
      });
      return;
    }

    const purchaseAmount = parseFloat(amount);
    if (isNaN(purchaseAmount)) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid number for the amount",
        variant: "destructive",
      });
      return;
    }

    const cardResults = ownedCards.map((card) => {
      // Find the matching category for cashback
      const matchingCategory = card.categories.find((cat) => {
        // Direct category match
        if (cat.category.toLowerCase() === category.toLowerCase()) return true;
        // Platform-based match (online/offline)
        if (cat.category === purchaseType) return true;
        return false;
      });

      const cashbackRate = matchingCategory?.cashbackRate || 0;
      const cashbackAmount = (purchaseAmount * cashbackRate) / 100;

      return {
        cardId: card.id,
        cardName: card.name,
        issuer: card.issuer,
        cashbackRate,
        cashbackAmount,
      };
    });

    // Sort by cashback amount (highest first)
    setResults(cardResults.sort((a, b) => b.cashbackAmount - a.cashbackAmount));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Purchase Advisor
        </CardTitle>
        <CardDescription>
          Calculate potential rewards across your credit cards for your next purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Purchase Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type of Purchase</label>
            <Select 
              value={purchaseType} 
              onValueChange={(value: "online" | "offline") => setPurchaseType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <Select 
              value={platform} 
              onValueChange={(value) => setPlatform(value as Platform)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {purchaseType === "online" ? (
                  <>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                  </>
                ) : (
                  <SelectItem value="store">Store</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat.replace(/([A-Z])/g, ' $1').trim()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (₹)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={calculateRewards} 
          className="w-full bg-navy hover:bg-navy/90"
          disabled={!amount || !category}
        >
          Calculate Rewards
        </Button>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-bold text-navy">Best Cards for Your Purchase</h3>
            <div className="grid gap-4">
              {results.map((result) => (
                <div
                  key={result.cardId}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy/10 p-2 rounded-md">
                        <CreditCardIcon className="h-6 w-6 text-navy" />
                      </div>
                      <div>
                        <p className="font-medium text-navy">{result.cardName}</p>
                        <p className="text-sm text-gray-600">{result.issuer}</p>
                      </div>
                    </div>
                    {result.cashbackRate > 0 && (
                      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                        <Sparkles className="h-4 w-4" />
                        <span className="font-medium">{result.cashbackRate}% back</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Purchase Amount</p>
                        <p className="font-medium text-navy">₹{parseFloat(amount).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Cashback</p>
                        <p className="font-medium text-green-600">₹{result.cashbackAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseAdvisor;
