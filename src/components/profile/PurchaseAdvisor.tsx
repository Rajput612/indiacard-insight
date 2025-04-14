import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard } from "@/types/spending";
import { Calculator, CreditCard as CreditCardIcon, Globe, Smartphone, Store, Sparkles } from "lucide-react";
import { categoriesByPlatform, platformOptions, getCategoriesByPlatform, getSubcategoriesByCategory, getBrandsBySubcategory, popularPlatforms } from "@/data/creditCards";
import type { Platform } from "@/types/spending";

interface PurchaseAdvisorProps {
  ownedCards: CreditCard[];
}

const PurchaseAdvisor = ({ ownedCards }: PurchaseAdvisorProps) => {
  // Level 1: Online/Offline
  const [purchaseType, setPurchaseType] = useState<"online" | "offline">("online");
  
  // Level 2: Platform (App/Website/Store)
  const [platform, setPlatform] = useState<Platform>("website");
  const [platformName, setPlatformName] = useState("");
  
  // Level 3: Category
  const [category, setCategory] = useState("");
  
  // Level 4: Subcategory
  const [specificCategory, setSpecificCategory] = useState("");
  
  // Level 5: Brand
  const [brand, setBrand] = useState("");
  
  // Amount
  const [amount, setAmount] = useState("");

  // Results
  const [results, setResults] = useState<{
    cardId: string;
    cardName: string;
    issuer: string;
    cashbackRate: number;
    cashbackAmount: number;
  }[]>([]);

  // Available options based on selections
  const [availablePlatforms, setAvailablePlatforms] = useState<Platform[]>(platformOptions[purchaseType]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [suggestedPlatforms, setSuggestedPlatforms] = useState<string[]>([]);

  // Update available platforms when purchase type changes
  React.useEffect(() => {
    setAvailablePlatforms(platformOptions[purchaseType]);
    setPlatform(platformOptions[purchaseType][0]);
    setPlatformName("");
    setCategory("");
    setSpecificCategory("");
    setBrand("");
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
    setSpecificCategory("");
    setBrand("");

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

    const purchaseAmount = parseFloat(amount);
    if (isNaN(purchaseAmount)) return;

    const cardResults = ownedCards.map((card) => {
      // Find the matching category for cashback
      const matchingCategory = card.categories.find((cat) => {
        // Direct category match
        if (cat.category.toLowerCase() === category.toLowerCase()) return true;
        // Platform-based match (online/offline)
        if (cat.category === purchaseType && 
            (purchaseType === "online" || purchaseType === "offline")) return true;
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
        <CardTitle>Purchase Advisor</CardTitle>
        <CardDescription>
          Calculate potential rewards across your credit cards for your next purchase
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-navy mb-2">Calculate Purchase Rewards</h2>
          <p className="text-gray-600">
            Enter your purchase details to see potential rewards across your credit cards.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Level 1: Online/Offline */}
            <div className="space-y-2 md:col-span-2">
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

            {/* Level 2: Platform */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Platform</label>
              <Select 
                value={platform} 
                onValueChange={(value) => setPlatform(value as Platform)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlatforms.map(plat => (
                    <SelectItem key={plat} value={plat}>
                      <div className="flex items-center">
                        {plat === 'app' && <Smartphone className="h-4 w-4 mr-2" />}
                        {plat === 'website' && <Globe className="h-4 w-4 mr-2" />}
                        {plat === 'store' && <Store className="h-4 w-4 mr-2" />}
                        <span className="capitalize">{plat}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Name with Suggestions */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                {platform === 'app' ? 'App Name' : 
                 platform === 'website' ? 'Website Name' : 
                 platform === 'store' ? 'Store Name' : 'Name'} (Optional)
              </label>
              <div className="space-y-2">
                <Input
                  placeholder={`Enter ${platform === 'app' ? 'app' : platform === 'website' ? 'website' : platform === 'store' ? 'store' : ''} name`}
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

            {/* Category and Subcategory */}
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategory</label>
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

            {/* Brand Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand (Optional)</label>
              <Select 
                value={brand} 
                onValueChange={setBrand}
                disabled={availableBrands.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {availableBrands.map(brandName => (
                    <SelectItem key={brandName} value={brandName}>
                      {brandName}
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
            className="w-full mt-6 bg-navy hover:bg-navy/90"
            disabled={!amount || !category}
          >
            Calculate Rewards
          </Button>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4">
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
