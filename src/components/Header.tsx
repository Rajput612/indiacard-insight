
import { CreditCard } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-navy" />
          <h1 className="text-2xl font-bold text-navy">IndiaCard<span className="text-gold">Insight</span></h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-navy transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-navy transition-colors">All Cards</a>
          <a href="#" className="text-gray-600 hover:text-navy transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-navy transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
