import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SpendingEntry, Platform, SpendPurpose, PaymentApp } from "@/types/spending";
import { platformOptions, getCategoriesByPlatform, getSubcategoriesByCategory, getBrandsBySubcategory } from "@/data/creditCards";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SpendingFormHeader from "./components/SpendingFormHeader";
import SpendingFormContent from "./components/SpendingFormContent";
import SpendingEntryList from "./components/SpendingEntryList";

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
  const [purpose, setPurpose] = useState<SpendPurpose>("personal");
  const [paymentApp, setPaymentApp] = useState<PaymentApp>("other");
  const [storeName, setStoreName] = useState("");
  const [channel, setChannel] = useState<"online" | "offline">("online");

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
    setChannel("online");
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
    setChannel(entry.channel || "online");
    setIsEditDialogOpen(true);
  };

  const handleDuplicate = (entry: SpendingEntry) => {
    const newEntry = {
      ...entry,
      id: uuidv4()
    };
    addEntry(newEntry);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <SpendingFormHeader />

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <SpendingFormContent
          category={category}
          platform={platform}
          platformName={platformName}
          subcategory={subcategory}
          specificCategory={specificCategory}
          brand={brand}
          amount={amount}
          frequency={frequency}
          purpose={purpose}
          paymentApp={paymentApp}
          storeName={storeName}
          availablePlatforms={availablePlatforms}
          availableCategories={availableCategories}
          availableSubcategories={availableSubcategories}
          availableBrands={availableBrands}
          onCategoryChange={setCategory}
          onPlatformChange={setPlatform}
          onPlatformNameChange={setPlatformName}
          onSubcategoryChange={setSubcategory}
          onSpecificCategoryChange={setSpecificCategory}
          onBrandChange={setBrand}
          onAmountChange={setAmount}
          onFrequencyChange={setFrequency}
          onPurposeChange={setPurpose}
          onPaymentAppChange={setPaymentApp}
          onStoreNameChange={setStoreName}
        />
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
        <SpendingEntryList 
          entries={entries}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onRemove={removeEntry}
        />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Spending Entry</DialogTitle>
          </DialogHeader>
          <SpendingFormContent
            category={category}
            platform={platform}
            platformName={platformName}
            subcategory={subcategory}
            specificCategory={specificCategory}
            brand={brand}
            amount={amount}
            frequency={frequency}
            purpose={purpose}
            paymentApp={paymentApp}
            storeName={storeName}
            availablePlatforms={availablePlatforms}
            availableCategories={availableCategories}
            availableSubcategories={availableSubcategories}
            availableBrands={availableBrands}
            onCategoryChange={setCategory}
            onPlatformChange={setPlatform}
            onPlatformNameChange={setPlatformName}
            onSubcategoryChange={setSubcategory}
            onSpecificCategoryChange={setSpecificCategory}
            onBrandChange={setBrand}
            onAmountChange={setAmount}
            onFrequencyChange={setFrequency}
            onPurposeChange={setPurpose}
            onPaymentAppChange={setPaymentApp}
            onStoreNameChange={setStoreName}
          />
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
