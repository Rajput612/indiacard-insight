
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-navy" />
          <h1 className="text-2xl font-bold text-navy">IndiaCard<span className="text-gold">Insight</span></h1>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-navy transition-colors">Home</Link>
          <Link to="/cards" className="text-gray-600 hover:text-navy transition-colors">All Cards</Link>
          <Link to="/about" className="text-gray-600 hover:text-navy transition-colors">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-navy transition-colors">Contact</Link>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute left-0 right-0 z-20">
          <nav className="flex flex-col px-4 py-3">
            <Link 
              to="/" 
              className="py-2 text-gray-600 hover:text-navy transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cards" 
              className="py-2 text-gray-600 hover:text-navy transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Cards
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-gray-600 hover:text-navy transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="py-2 text-gray-600 hover:text-navy transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
