import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SpendingEntry, Platform, SpendPurpose, PaymentApp } from "@/types/spending";
import { brands, platformOptions, getCategoriesByPlatform, getSubcategoriesByCategory, getBrandsBySubcategory, popularPlatforms } from "@/data/creditCards";
import { Plus, X, Globe, Smartphone, Store, Edit2, Copy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type SpendingDetailStepProps = {
  entries: SpendingEntry[];
  addEntry: (entry: SpendingEntry) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, entry: SpendingEntry) => void;
};

const SpendingDetailStep = ({ entries, addEntry, removeEntry, updateEntry }: SpendingDetailStepProps) => {
  const [category, setCategory] = useState<"online" | "offline">("online");
  const [platform, setPlatform] = useState<Platform>("website");
  const [platformName, setPlatformName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [specificCategory, setSpecificCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"monthly" | "yearly" | "one-time" | "daily" | "weekly" | "quarterly">("monthly");
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [availablePlatforms, setAvailablePlatforms] = useState<Platform[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [suggestedPlatforms, setSuggestedPlatforms] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<SpendPurpose>("personal");
  const [paymentApp, setPaymentApp] = useState<PaymentApp>("other");
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    setAvailablePlatforms(platformOptions[category]);
    setPlatform(platformOptions[category][0]);
    setPlatformName("");
    setSubcategory("");
    setSpecificCategory("");
    setBrand("");
  }, [category]);

  useEffect(() => {
    const categories = getCategoriesByPlatform(category, platform);
    setAvailableCategories(categories);
    if (categories.length > 0) {
      setSubcategory(categories[0]);
    } else {
      setSubcategory("");
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
  }, [category, platform]);

  useEffect(() => {
    if (subcategory) {
      const subcategories = getSubcategoriesByCategory(subcategory);
      setAvailableSubcategories(subcategories);
      setBrand("");
    } else {
      setAvailableSubcategories([]);
    }
  }, [subcategory]);

  useEffect(() => {
    if (subcategory && specificCategory) {
      const availableBrands = getBrandsBySubcategory(subcategory, specificCategory);
      setAvailableBrands(availableBrands);
    } else {
      setAvailableBrands([]);
    }
  }, [subcategory, specificCategory]);

  const resetForm = () => {
    setCategory("online");
    setPlatform("website");
    setPlatformName("");
    setSubcategory("");
    setSpecificCategory("");
    setBrand("");
    setAmount("");
    setFrequency("monthly");
    setEditingEntry(null);
    setPurpose("personal");
    setPaymentApp("other");
    setStoreName("");
  };

  const handleAddEntry = () => {
    if (!subcategory || !amount || parseFloat(amount) <= 0) return;

    const newEntry: SpendingEntry = {
      id: editingEntry || uuidv4(),
      amount: parseFloat(amount),
      category,
      subcategory,
      specificCategory: specificCategory || undefined,
      brand: brand || undefined,
      platform,
      platformName: platformName || undefined,
      channel,
      payment_app: paymentApp,
      store_name: storeName || undefined,
      purpose,
      frequency,
    };

    if (editingEntry) {
      updateEntry(editingEntry, newEntry);
      setIsEditDialogOpen(false);
    } else {
      addEntry(newEntry);
    }
    
    resetForm();
  };

  const handleEdit = (entry: SpendingEntry) => {
    setEditingEntry(entry.id);
    setCategory(entry.category as "online" | "offline");
    setPlatform(entry.platform || "website");
    setPlatformName(entry.platformName || "");
    setSubcategory(entry.subcategory || "");
    setSpecificCategory(entry.specificCategory || "");
    setBrand(entry.brand || "");
    setAmount(entry.amount.toString());
    setFrequency(entry.frequency || "monthly");
    setPurpose(entry.purpose || "personal");
    setPaymentApp(entry.payment_app || "other");
    setStoreName(entry.store_name || "");
    setIsEditDialogOpen(true);
  };

  const handleDuplicate = (entry: SpendingEntry) => {
    const newEntry = {
      ...entry,
      id: uuidv4()
    };
    addEntry(newEntry);
  };

  const formContent = (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="category">Type of Spending</Label>
        <Select 
          value={category} 
          onValueChange={(value) => setCategory(value as "online" | "offline")}
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

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="platform-name">
          {platform === 'app' ? 'App Name' : 
           platform === 'website' ? 'Website Name' : 
           platform === 'store' ? 'Store Name' : 'Name'} (Optional)
        </Label>
        <div className="space-y-2">
          <Input
            id="platform-name"
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
            {availableCategories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat.replace(/([A-Z])/g, ' $1').trim()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specific-category">Subcategory</Label>
        <Select 
          value={specificCategory} 
          onValueChange={setSpecificCategory}
          disabled={availableSubcategories.length === 0}
        >
          <SelectTrigger id="specific-category">
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

      <div className="space-y-2">
        <Label htmlFor="brand">Brand (Optional)</Label>
        <Select 
          value={brand} 
          onValueChange={setBrand}
          disabled={availableBrands.length === 0}
        >
          <SelectTrigger id="brand">
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

      <div className="space-y-2">
        <Label htmlFor="payment-app">Payment App</Label>
        <Select 
          value={paymentApp} 
          onValueChange={(value) => setPaymentApp(value as PaymentApp)}
        >
          <SelectTrigger id="payment-app">
            <SelectValue placeholder="Select Payment App" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="googlepay">Google Pay</SelectItem>
            <SelectItem value="amazonpay">Amazon Pay</SelectItem>
            <SelectItem value="phonepe">PhonePe</SelectItem>
            <SelectItem value="paytm">Paytm</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose</Label>
        <Select 
          value={purpose} 
          onValueChange={(value) => setPurpose(value as SpendPurpose)}
        >
          <SelectTrigger id="purpose">
            <SelectValue placeholder="Select Purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="gift">Gift</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="store-name">Store Name (Optional)</Label>
        <Input
          id="store-name"
          placeholder="Enter store name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-navy mb-2">Add Your Spending Details</h2>
        <p className="text-gray-600">
          Add each spending category individually. You can add as many as you like to see personalized recommendations.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        {formContent}
        <Button 
          onClick={handleAddEntry} 
          className="mt-4 bg-navy hover:bg-navy/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {editingEntry ? 'Update Spending' : 'Add Spending'}
        </Button>
      </div>

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
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-navy/30 transition-colors"
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
                    {entry.platform && ` • ${entry.platform === 'app' ? 'App' : entry.platform === 'website' ? 'Website' : entry.platform === 'store' ? 'Store' : 'Platform'}`}
                    {entry.platformName && `: ${entry.platformName}`}
                    {entry.brand && ` • ${entry.brand}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="font-medium">₹{entry.amount.toLocaleString()}</span>
                    <div className="text-xs text-gray-500 capitalize">
                      {entry.frequency}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDuplicate(entry)}
                      className="text-gray-500 hover:text-navy"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(entry)}
                      className="text-gray-500 hover:text-navy"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
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
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Spending Entry</DialogTitle>
          </DialogHeader>
          {formContent}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEntry} className="bg-navy hover:bg-navy/90">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SpendingDetailStep;
