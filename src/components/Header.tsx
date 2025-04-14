
import { CreditCard, User, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-navy" />
            <h1 className="text-xl sm:text-2xl font-bold text-navy">IndiaCard<span className="text-gold">Insight</span></h1>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-gray-600 hover:text-navy transition-colors rounded-md">Home</Link>
            <Link to="/cards" className="px-4 py-2 text-gray-600 hover:text-navy transition-colors rounded-md">All Cards</Link>
            <Link to="/about" className="px-4 py-2 text-gray-600 hover:text-navy transition-colors rounded-md">About</Link>
            <Link to="/contact" className="px-4 py-2 text-gray-600 hover:text-navy transition-colors rounded-md">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="px-4 py-2 text-gray-600 hover:text-navy transition-colors rounded-md flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
        
        {/* Mobile navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 visible pb-4'
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <nav className="flex flex-col py-2 space-y-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cards" 
              className="px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Cards
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Button 
                  variant="outline" 
                  className="mx-4 mt-2 flex items-center gap-2 justify-center"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-navy text-white hover:bg-navy/90 rounded-md transition-colors mx-4 mt-2 flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
