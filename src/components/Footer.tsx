
import { CreditCard, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-6 w-6 text-gold" />
              <h2 className="text-xl font-bold">IndiaCard<span className="text-gold">Insight</span></h2>
            </div>
            <p className="text-gray-300 text-sm">
              Helping Indian consumers find the perfect credit card match based on their unique spending habits.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">All Credit Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gold mb-4">Card Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rewards Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cashback Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Travel Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fuel Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">No Annual Fee Cards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} IndiaCardInsight. All rights reserved.</p>
          <p className="mt-1">
            IndiaCardInsight is not affiliated with any banking institution. We provide recommendations based on user-provided information.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
