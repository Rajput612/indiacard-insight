import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreditCardBanner from "./CreditCardBanner";
import { useState } from "react";
import { creditCards } from "@/data/creditCards";

// Featured cards that we want to advertise prominently
const featuredCardIds = ["1", "4", "2"]; // Premium Rewards Gold, Travel Elite, ShopMore Platinum
const featuredCards = creditCards.filter(card => featuredCardIds.includes(card.id));

const Hero = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = featuredCards[currentCardIndex];
  
  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % featuredCards.length);
  };
  
  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + featuredCards.length) % featuredCards.length);
  };
  
  return (
    <div className="bg-gradient-to-br from-navy to-slate-blue text-white py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find Your Perfect Credit Card Match
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 max-w-xl">
              Tell us about your spending habits and we'll suggest the best cards that maximize your rewards and benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="bg-gold text-navy hover:bg-gold/90 font-medium px-6 py-2 text-lg w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('spend-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="bg-navy/20 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                onClick={() => window.location.href = '/cards'}
              >
                Explore All Cards
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-72 sm:w-80 md:w-96">
              <CreditCardBanner card={currentCard} size="lg" />
              
              {/* Card Navigation */}
              {featuredCards.length > 1 && (
                <div className="mt-4 flex justify-between">
                  <Button 
                    variant="ghost" 
                    className="p-2 text-white hover:text-gold hover:bg-white/10"
                    onClick={prevCard}
                  >
                    ← Prev
                  </Button>
                  <div className="flex items-center gap-1">
                    {featuredCards.map((_, index) => (
                      <span 
                        key={index} 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentCardIndex ? 'bg-gold' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="p-2 text-white hover:text-gold hover:bg-white/10"
                    onClick={nextCard}
                  >
                    Next →
                  </Button>
                </div>
              )}
              
              {/* Feature Badge - Adjusted positioning */}
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-gold text-navy font-bold py-1 px-3 rounded-full text-sm shadow-lg">
                {currentCardIndex === 0 ? "Best Overall" : currentCardIndex === 1 ? "Premium Pick" : "Top Cashback"}
              </div>
              
              {/* Feature Highlight */}
              <div className="bg-white/10 backdrop-blur-sm mt-2 p-3 rounded-lg border border-white/20">
                <h3 className="font-bold text-gold mb-1">{currentCard.name} Highlights:</h3>
                <ul className="text-sm space-y-1">
                  {currentCard.benefits.slice(0, 2).map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{benefit.description}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-2 bg-gold text-navy hover:bg-gold/90"
                  onClick={() => window.open(currentCard.applyUrl, "_blank")}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;