
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
  
  // Customize card colors based on issuer for better visual recognition
  const getCardStyle = () => {
    const issuer = card.issuer.toLowerCase();
    if (issuer.includes('icici')) return 'from-orange-800 to-orange-950';
    if (issuer.includes('hdfc')) return 'from-blue-700 to-blue-950';
    if (issuer.includes('axis')) return 'from-purple-700 to-purple-950';
    if (issuer.includes('sbi')) return 'from-blue-600 to-indigo-950';
    if (issuer.includes('kotak')) return 'from-red-700 to-red-950';
    if (issuer.includes('citi')) return 'from-blue-400 to-blue-800';
    if (issuer.includes('hsbc')) return 'from-red-600 to-red-900';
    return 'from-slate-800 to-navy'; // Default gradient
  };
  
  // Get bank logo or pattern for the card
  const getCardDecoration = () => {
    const issuer = card.issuer.toLowerCase();
    if (issuer.includes('icici')) return "before:content-[''] before:absolute before:right-2 before:top-2 before:w-10 before:h-10 before:rounded-full before:bg-orange-500/30";
    if (issuer.includes('hdfc')) return "before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)]";
    if (issuer.includes('axis')) return "before:content-[''] before:absolute before:right-2 before:bottom-2 before:w-12 before:h-8 before:rounded-md before:bg-purple-400/20";
    return "";
  };
  
  const cardStyle = getCardStyle();
  const cardDecoration = getCardDecoration();
  
  return (
    <div className="relative">
      {showSpark && (
        <div className={`absolute ${sparkPosition} bg-gold text-navy rounded-full ${sparkPadding} z-10`}>
          <Sparkles className={sparkSize} />
        </div>
      )}
      
      <div className="bg-white rounded-xl p-2 shadow-md transform rotate-1 transition-transform hover:rotate-0 hover:scale-105">
        <div className={`bg-gradient-to-br ${cardStyle} rounded-lg p-4 w-full ${bannerHeight} flex flex-col justify-between relative overflow-hidden ${cardDecoration}`}>
          {/* Card chip and wave pattern overlay */}
          <div className="absolute top-1/2 left-4 w-8 h-5 bg-gold/40 rounded-sm"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-white/5"></div>
          <div className="absolute -right-6 top-6 w-12 h-12 rounded-full bg-white/10"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <CreditCard className={`${cardIconSize} text-gold`} />
            <div className="text-right text-white">
              <p className={`text-xs opacity-80`}>{card.issuer}</p>
              <p className={fontSizes[size] + " font-bold"}>{card.name}</p>
            </div>
          </div>
          
          <div className="text-white relative z-10">
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
