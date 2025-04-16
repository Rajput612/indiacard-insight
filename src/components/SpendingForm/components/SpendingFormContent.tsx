import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Globe, Smartphone, Store } from "lucide-react";
import { Platform, SpendPurpose, PaymentApp } from "@/types/spending";
import { popularPlatforms } from "@/data/creditCards";
import { spendingFormTooltips } from "@/constants/tooltips";
import LabelWithTooltip from "./LabelWithTooltip";

interface SpendingFormContentProps {
  category: "online" | "offline";
  platform: Platform;
  platformName: string;
  subcategory: string;
  specificCategory: string;
  brand: string;
  amount: string;
  frequency: string;
  purpose: SpendPurpose;
  paymentApp: PaymentApp;
  storeName: string;
  availablePlatforms: Platform[];
  availableCategories: string[];
  availableSubcategories: string[];
  availableBrands: string[];
  onCategoryChange: (value: "online" | "offline") => void;
  onPlatformChange: (value: Platform) => void;
  onPlatformNameChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  onSpecificCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onFrequencyChange: (value: string) => void;
  onPurposeChange: (value: SpendPurpose) => void;
  onPaymentAppChange: (value: PaymentApp) => void;
  onStoreNameChange: (value: string) => void;
}

const SpendingFormContent = ({
  category,
  platform,
  platformName,
  subcategory,
  specificCategory,
  brand,
  amount,
  frequency,
  purpose,
  paymentApp,
  storeName,
  availablePlatforms,
  availableCategories,
  availableSubcategories,
  availableBrands,
  onCategoryChange,
  onPlatformChange,
  onPlatformNameChange,
  onSubcategoryChange,
  onSpecificCategoryChange,
  onBrandChange,
  onAmountChange,
  onFrequencyChange,
  onPurposeChange,
  onPaymentAppChange,
  onStoreNameChange,
}: SpendingFormContentProps) => {
  const [showCustomPlatform, setShowCustomPlatform] = React.useState(false);

  // Get platform options based on selected platform type
  const getPlatformOptions = () => {
    if (platform === 'app') {
      return popularPlatforms.app;
    } else if (platform === 'website') {
      return popularPlatforms.website;
    } else if (platform === 'store') {
      return popularPlatforms.store;
    }
    return [];
  };

  const handlePlatformNameChange = (value: string) => {
    if (value === 'other') {
      setShowCustomPlatform(true);
      onPlatformNameChange('');
    } else {
      setShowCustomPlatform(false);
      onPlatformNameChange(value);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <LabelWithTooltip htmlFor="category" tooltip={spendingFormTooltips.category}>
          Type of Spending
        </LabelWithTooltip>
        <Select value={category} onValueChange={onCategoryChange}>
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
        <LabelWithTooltip htmlFor="platform" tooltip={spendingFormTooltips.platform}>
          Platform
        </LabelWithTooltip>
        <Select value={platform} onValueChange={onPlatformChange}>
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

      {/* Platform/Store Name Selection */}
      <div className="space-y-2 md:col-span-2">
        <LabelWithTooltip 
          htmlFor="platform-name" 
          tooltip={platform === 'store' ? spendingFormTooltips.storeName : spendingFormTooltips.platformName}
        >
          {platform === 'app' ? 'App Name' : 
           platform === 'website' ? 'Website Name' : 
           platform === 'store' ? 'Store Name' : 'Name'}
        </LabelWithTooltip>
        
        <Select value={platformName || 'other'} onValueChange={handlePlatformNameChange}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${platform === 'app' ? 'App' : platform === 'website' ? 'Website' : 'Store'}`} />
          </SelectTrigger>
          <SelectContent>
            {getPlatformOptions().map(name => (
              <SelectItem key={name} value={name}>{name}</SelectItem>
            ))}
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        {showCustomPlatform && (
          <div className="mt-2">
            <Input
              placeholder={`Enter ${platform === 'app' ? 'app' : platform === 'website' ? 'website' : 'store'} name`}
              value={platformName}
              onChange={(e) => onPlatformNameChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <LabelWithTooltip htmlFor="subcategory" tooltip={spendingFormTooltips.spendCategory}>
          Category
        </LabelWithTooltip>
        <Select value={subcategory} onValueChange={onSubcategoryChange}>
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
        <LabelWithTooltip htmlFor="specific-category" tooltip={spendingFormTooltips.subcategory}>
          Subcategory
        </LabelWithTooltip>
        <Select value={specificCategory} onValueChange={onSpecificCategoryChange} disabled={availableSubcategories.length === 0}>
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
        <LabelWithTooltip htmlFor="brand" tooltip={spendingFormTooltips.brand}>
          Brand (Optional)
        </LabelWithTooltip>
        <Select value={brand} onValueChange={onBrandChange} disabled={availableBrands.length === 0}>
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
        <LabelWithTooltip htmlFor="amount" tooltip={spendingFormTooltips.amount}>
          Amount (₹)
        </LabelWithTooltip>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <LabelWithTooltip htmlFor="frequency" tooltip={spendingFormTooltips.frequency}>
          Frequency
        </LabelWithTooltip>
        <Select value={frequency} onValueChange={onFrequencyChange}>
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
        <LabelWithTooltip htmlFor="payment-app" tooltip={spendingFormTooltips.paymentApp}>
          Payment App
        </LabelWithTooltip>
        <Select value={paymentApp} onValueChange={onPaymentAppChange}>
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
        <LabelWithTooltip htmlFor="purpose" tooltip={spendingFormTooltips.purpose}>
          Purpose
        </LabelWithTooltip>
        <Select value={purpose} onValueChange={onPurposeChange}>
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
    </div>
  );
};

export default SpendingFormContent;