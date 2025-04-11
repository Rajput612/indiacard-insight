
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SpendingEntry, Platform } from "@/types/spending";
import { brands } from "@/data/creditCards";
import { Plus, X, Globe, Smartphone, Store } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type SpendingDetailStepProps = {
  entries: SpendingEntry[];
  addEntry: (entry: SpendingEntry) => void;
  removeEntry: (id: string) => void;
};

const SpendingDetailStep = ({ entries, addEntry, removeEntry }: SpendingDetailStepProps) => {
  // Level 1: Online/Offline
  const [category, setCategory] = useState<"online" | "offline">("online");
  
  // Level 2: Platform (App/Website/Store)
  const [platform, setPlatform] = useState<Platform>("website");
  const [platformName, setPlatformName] = useState("");
  
  // Level 3: Category
  const [subcategory, setSubcategory] = useState("");
  
  // Level 4: Subcategory
  const [specificCategory, setSpecificCategory] = useState("");
  
  // Level 5: Brand
  const [brand, setBrand] = useState("");
  
  // Amount and frequency
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"monthly" | "yearly" | "one-time" | "daily" | "weekly" | "quarterly">("monthly");

  const handleAddEntry = () => {
    if (!subcategory || !amount || parseFloat(amount) <= 0) return;

    const newEntry: SpendingEntry = {
      id: uuidv4(),
      category: category,
      subcategory: subcategory as any,
      specificCategory: specificCategory || undefined,
      brand: brand || undefined,
      platform: platform,
      platformName: platformName || undefined,
      amount: parseFloat(amount),
      frequency: frequency as any,
    };

    addEntry(newEntry);
    
    // Reset form fields after adding entry
    setSpecificCategory("");
    setBrand("");
    setPlatformName("");
    setAmount("");
  };

  // Reset platform when category changes
  const handleCategoryChange = (value: "online" | "offline") => {
    setCategory(value);
    // Reset platform based on category
    if (value === "online") {
      setPlatform("website");
    } else {
      setPlatform("store");
    }
    // Reset other fields
    setSubcategory("");
    setBrand("");
    setSpecificCategory("");
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-navy mb-2">Add Your Spending Details</h2>
        <p className="text-gray-600">
          Add each spending category individually. You can add as many as you like to see personalized recommendations.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Level 1: Online/Offline */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="category">Type of Spending</Label>
            <Select 
              value={category} 
              onValueChange={(value) => handleCategoryChange(value as "online" | "offline")}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Level 2: Platform (App/Website/Store) */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="platform">Platform</Label>
            <Select 
              value={platform} 
              onValueChange={(value) => setPlatform(value as Platform)}
            >
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {category === "online" ? (
                  <>
                    <SelectItem value="app">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        <span>App</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="website">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>Website</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <span>Miscellaneous</span>
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="store">
                      <div className="flex items-center">
                        <Store className="h-4 w-4 mr-2" />
                        <span>Store</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <span>Miscellaneous</span>
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Level 2.5: Platform Name */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="platform-name">
              {platform === 'app' ? 'App Name' : 
               platform === 'website' ? 'Website Name' : 
               platform === 'store' ? 'Store Name' : 'Name'} (Optional)
            </Label>
            <Input
              id="platform-name"
              placeholder={`Enter ${platform === 'app' ? 'app' : platform === 'website' ? 'website' : platform === 'store' ? 'store' : ''} name`}
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
            />
          </div>

          {/* Level 3: Category */}
          <div className="space-y-2">
            <Label htmlFor="subcategory">Category</Label>
            <Select 
              value={subcategory} 
              onValueChange={setSubcategory}
            >
              <SelectTrigger id="subcategory">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {category === "online" ? (
                  <>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="homeGoods">Home Goods</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Miscellaneous</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="foodAndBeverages">Food & Beverages</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="housingAndUtilities">Housing & Utilities</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Miscellaneous</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Level 4: Subcategory */}
          <div className="space-y-2">
            <Label htmlFor="specific-category">Subcategory (Optional)</Label>
            <Input
              id="specific-category"
              placeholder="e.g., Smartphones, Clothing"
              value={specificCategory}
              onChange={(e) => setSpecificCategory(e.target.value)}
            />
          </div>

          {/* Level 5: Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand">Brand (Optional)</Label>
            <Select 
              value={brand} 
              onValueChange={setBrand}
            >
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {subcategory && brands[subcategory as keyof typeof brands] ? (
                  brands[subcategory as keyof typeof brands].map((brandName) => (
                    <SelectItem key={brandName} value={brandName}>
                      {brandName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="other">Other</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Amount and Frequency */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select 
              value={frequency} 
              onValueChange={(value) => setFrequency(value as any)}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleAddEntry} 
          className="mt-4 bg-navy hover:bg-navy/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Spending
        </Button>
      </div>

      {/* Spending Entries List */}
      <div className="mt-6">
        <h3 className="font-medium text-navy mb-2">Your Spending Entries</h3>
        
        {entries.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No spending entries added yet. Add your first one above.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-navy capitalize">
                      {entry.subcategory.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {entry.specificCategory && (
                      <span className="text-xs text-gray-500">({entry.specificCategory})</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="capitalize">{entry.category}</span>
                    {entry.platform && ` • ${platform === 'app' ? 'App' : platform === 'website' ? 'Website' : platform === 'store' ? 'Store' : 'Platform'}`}
                    {entry.platformName && `: ${entry.platformName}`}
                    {entry.brand && ` • ${entry.brand}`}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-medium">₹{entry.amount.toLocaleString()}</span>
                    <div className="text-xs text-gray-500 capitalize">
                      {entry.frequency}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeEntry(entry.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingDetailStep;
