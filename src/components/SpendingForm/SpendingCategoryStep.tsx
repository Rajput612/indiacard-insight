
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Home, CreditCard } from "lucide-react";

const SpendingCategoryStep = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Tell Us About Your Spending</h2>
        <p className="text-gray-600">
          We'll use this information to recommend the best credit cards for your lifestyle.
          You can provide as much or as little detail as you'd like.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-navy/10 hover:border-navy/30 transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-navy" />
              Online Spending
            </CardTitle>
            <CardDescription>
              E-commerce, digital subscriptions, and online services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Popular categories:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Electronics</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Fashion</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Groceries</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Travel</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Entertainment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-navy/10 hover:border-navy/30 transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-navy" />
              Offline Spending
            </CardTitle>
            <CardDescription>
              Physical stores, restaurants, and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Popular categories:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Food & Dining</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Transport</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Housing & Utilities</span>
                <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded-full">Healthcare</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
        <div className="flex items-start gap-3">
          <CreditCard className="h-6 w-6 text-navy mt-1" />
          <div>
            <h3 className="font-medium text-navy">Why provide spending details?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Different credit cards offer varying rewards for different spending categories. 
              By sharing your spending patterns, we can recommend cards that maximize your rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingCategoryStep;
