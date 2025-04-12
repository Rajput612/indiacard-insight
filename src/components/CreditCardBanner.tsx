
import { CreditCard, Sparkles } from "lucide-react";
import type { CreditCard as CreditCardType } from "@/types/spending";

interface CreditCardBannerProps {
  card: CreditCardType;
  size?: 'sm' | 'md' | 'lg';
  showSpark?: boolean;
}

const CreditCardBanner = ({ card, size = 'md', showSpark = true }: CreditCardBannerProps) => {
  // Set height based on size
  const bannerHeight = size === 'sm' ? 'h-28' : size === 'md' ? 'h-36' : 'h-44';
  const sparkSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';
  const cardIconSize = size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-6 w-6' : 'h-7 w-7';
  const sparkPosition = size === 'sm' ? '-top-1 -right-1' : '-top-2 -right-2';
  const sparkPadding = size === 'sm' ? 'p-1.5' : 'p-2';
  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <div className="relative">
      {showSpark && (
        <div className={`absolute ${sparkPosition} bg-gold text-navy rounded-full ${sparkPadding} z-10`}>
          <Sparkles className={sparkSize} />
        </div>
      )}
      
      <div className="bg-white rounded-xl p-2 shadow-md transform rotate-1 transition-transform hover:rotate-0">
        <div className={`bg-gradient-to-br from-slate-800 to-navy rounded-lg p-4 w-full ${bannerHeight} flex flex-col justify-between`}>
          <div className="flex justify-between items-start">
            <CreditCard className={`${cardIconSize} text-gold`} />
            <div className="text-right text-white">
              <p className={`text-xs opacity-80`}>{card.issuer}</p>
              <p className={fontSizes[size] + " font-bold"}>{card.name}</p>
            </div>
          </div>
          
          <div className="text-white">
            <div className="mb-1">
              <p className="text-xs opacity-80">Card Number</p>
              <p className={`font-mono ${fontSizes[size]}`}>•••• •••• •••• {Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs opacity-80">Card Holder</p>
                <p className="font-medium text-xs sm:text-sm">YOU</p>
              </div>
              <div>
                <p className="text-xs opacity-80">Expires</p>
                <p className="font-medium text-xs sm:text-sm">04/29</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardBanner;
