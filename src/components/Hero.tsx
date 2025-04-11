
import { ArrowRight, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-navy to-slate-blue text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="md:flex items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find Your Perfect Credit Card Match
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Tell us about your spending habits and we'll suggest the best cards that maximize your rewards and benefits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gold text-navy hover:bg-gold/90 font-medium px-6 py-2 text-lg"
                onClick={() => {
                  document.getElementById('spend-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Explore All Cards
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -top-6 -right-6 bg-gold text-navy rounded-full p-3">
                <Sparkles className="h-6 w-6" />
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-xl transform rotate-3 transition-transform hover:rotate-0">
                <div className="bg-gradient-to-br from-slate-800 to-navy rounded-lg p-6 w-72 h-44 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <CreditCard className="h-8 w-8 text-gold" />
                    <div className="text-right">
                      <p className="text-xs opacity-80">IndiaCard</p>
                      <p className="text-sm font-bold">Platinum Rewards</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-2">
                      <p className="text-xs opacity-80">Card Number</p>
                      <p className="font-mono">•••• •••• •••• 2023</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-80">Card Holder</p>
                        <p className="font-medium">YOU</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-80">Expires</p>
                        <p className="font-medium">04/29</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
