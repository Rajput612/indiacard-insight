import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CreditCard as CreditCardIcon, Sparkles, Globe, Smartphone, Store } from "lucide-react";
import CreditCardBanner from "@/components/CreditCardBanner";
import { Platform } from "@/types/spending";
import { 
  getCategoriesByPlatform, 
  getSubcategoriesByCategory, 
  getBrandsBySubcategory, 
  popularPlatforms 
} from "@/data/creditCards";

interface PurchaseAdvisorProps {
  ownedCards: any[];
}

const PurchaseAdvisor = ({ ownedCards }: PurchaseAdvisorProps) => {
  const [purchaseType, setPurchaseType] = useState<"online" | "offline">("online");
  const [platform, setPlatform] = useState<Platform>("website");
  const [platformName, setPlatformName] = useState("");
  const [category, setCategory] = useState("");
  const [specificCategory, setSpecificCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [amount, setAmount] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<{
    cardId: string;
    cardName: string;
    issuer: string;
    cashbackRate: number;
    cashbackAmount: number;
  }[]>([]);

  // Available options based on selections
  const [availablePlatforms, setAvailablePlatforms] = useState<Platform[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [suggestedPlatforms, setSuggestedPlatforms] = useState<string[]>([]);

  // Update available platforms when type changes
  React.useEffect(() => {
    const platforms = purchaseType === "online" ? ["app", "website"] : ["store"];
    setAvailablePlatforms(platforms as Platform[]);
    setPlatform(platforms[0] as Platform);
  }, [purchaseType]);

  // Update available categories when platform changes
  React.useEffect(() => {
    const categories = getCategoriesByPlatform(purchaseType, platform);
    setAvailableCategories(categories);
    
    if (categories.length > 0) {
      setCategory(categories[0]);
    } else {
      setCategory("");
    }

    // Update suggested platforms
    if (platform === 'app') {
      setSuggestedPlatforms(popularPlatforms.app);
    } else if (platform === 'website') {
      setSuggestedPlatforms(popularPlatforms.website);
    } else if (platform === 'store') {
      setSuggestedPlatforms(popularPlatforms.store);
    } else {
      setSuggestedPlatforms([]);
    }
  }, [purchaseType, platform]);

  // Update available subcategories when category changes
  React.useEffect(() => {
    if (category) {
      const subcategories = getSubcategoriesByCategory(category);
      setAvailableSubcategories(subcategories);
      setBrand("");
    } else {
      setAvailableSubcategories([]);
    }
  }, [category]);

  // Update available brands when subcategory changes
  React.useEffect(() => {
    if (category && specificCategory) {
      const brands = getBrandsBySubcategory(category, specificCategory);
      setAvailableBrands(brands);
    } else {
      setAvailableBrands([]);
    }
  }, [category, specificCategory]);

  const calculateRewards = () => {
    if (!amount || !category) return;
    
    setIsCalculating(true);
    
    const purchaseAmount = parseFloat(amount);

    // Calculate rewards for each card
    const cardResults = ownedCards.map(card => {
      const matchingCategory = card.categories.find(cat => {
        if (cat.category.toLowerCase() === category.toLowerCase()) {
          return true;
        }
        if ((cat.category === 'online' && purchaseType === 'online') ||
            (cat.category === 'offline' && purchaseType === 'offline')) {
          return true;
        }
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

    setResults(cardResults.sort((a, b) => b.cashbackAmount - a.cashbackAmount));
    setIsCalculating(false);
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
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Purchase Type */}
            <div className="space-y-2">
              <Label>Type of Purchase</Label>
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
              <Label>Platform</Label>
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
                      <SelectItem value="app">
                        <div className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-2" />
                          App
                        </div>
                      </SelectItem>
                      <SelectItem value="website">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </div>
                      </SelectItem>
                    </>
                  ) : (
                    <SelectItem value="store">
                      <div className="flex items-center">
                        <Store className="h-4 w-4 mr-2" />
                        Store
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Name */}
            <div className="space-y-2">
              <Label>
                {platform === 'app' ? 'App Name' : 
                 platform === 'website' ? 'Website Name' : 
                 platform === 'store' ? 'Store Name' : 'Name'} (Optional)
              </Label>
              <div className="space-y-2">
                <Input
                  placeholder={`Enter ${platform === 'app' ? 'app' : platform === 'website' ? 'website' : 'store'} name`}
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                />
                {suggestedPlatforms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {suggestedPlatforms.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => setPlatformName(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
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

            {/* Subcategory */}
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select 
                value={specificCategory} 
                onValueChange={setSpecificCategory}
                disabled={availableSubcategories.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map(subcat => (
                    <SelectItem key={subcat} value={subcat}>
                      {subcat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Purchase Amount (₹)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button 
              onClick={calculateRewards} 
              className="w-full bg-navy hover:bg-navy/90"
              disabled={isCalculating || !amount || !category}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Rewards
            </Button>
          </div>

          <div className="relative">
            {isCalculating && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                <div className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg">
                  <span className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                  <span>Calculating rewards...</span>
                </div>
              </div>
            )}
            
            <div className={`transition-opacity duration-300 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
              {results.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-navy">Best Cards for This Purchase</h3>
                  <div className="grid gap-4">
                    {results.map((result) => (
                      <div
                        key={result.cardId}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <div className="p-4">
                          {/* Card Visual */}
                          <div className="mb-4">
                            {ownedCards.find(card => card.id === result.cardId) && (
                              <CreditCardBanner card={ownedCards.find(card => card.id === result.cardId)!} size="sm" />
                            )}
                          </div>
                          
                          {/* Reward Details */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-navy">{result.cardName}</h4>
                                <p className="text-sm text-gray-600">{result.issuer}</p>
                              </div>
                              {result.cashbackRate > 0 && (
                                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                                  <Sparkles className="h-4 w-4" />
                                  <span className="font-medium">{result.cashbackRate}% back</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-3">
                              <div>
                                <p className="text-sm text-gray-500">Purchase Amount</p>
                                <p className="font-medium text-navy">₹{parseFloat(amount).toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Cashback</p>
                                <p className="font-medium text-green-600">₹{result.cashbackAmount.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">Enter purchase details to see which of your cards offers the best rewards.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseAdvisor;