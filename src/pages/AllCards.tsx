
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreditCardBanner from "@/components/CreditCardBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Filter, Tag } from "lucide-react";
import { useFilteredCreditCards } from "@/hooks/useFilteredCreditCards";
import { creditCards } from "@/data/creditCards";

// Get all unique categories from credit cards
const allCategories = Array.from(
  new Set(
    creditCards.flatMap(card => card.categories)
  )
).sort();

// Get all unique banks from credit cards
const allBanks = Array.from(
  new Set(
    creditCards.map(card => card.issuer)
  )
).sort();

const AllCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { filteredCards, loading } = useFilteredCreditCards(categoryParam || undefined);
  
  const [currentFilter, setCurrentFilter] = useState<string | null>(categoryParam);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Update the current filter state when the URL parameter changes
    setCurrentFilter(categoryParam);
  }, [categoryParam]);
  
  const handleCategoryFilter = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
      setCurrentFilter(category);
    } else {
      searchParams.delete("category");
      setSearchParams(searchParams);
      setCurrentFilter(null);
    }
    
    // Close mobile filters if open
    if (showFilters) {
      setShowFilters(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              {currentFilter ? `${currentFilter} Credit Cards` : "All Credit Cards"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentFilter 
                ? `Browse our selection of credit cards optimized for ${currentFilter.toLowerCase()}.` 
                : "Find the perfect credit card that suits your lifestyle and spending habits."}
            </p>
          </div>
          
          {/* Mobile Filters Toggle */}
          <div className="md:hidden flex justify-center mb-6">
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className={`md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow p-4 mb-4 sticky top-20">
                <h2 className="text-lg font-bold text-navy mb-4">Categories</h2>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors ${
                      !currentFilter ? 'bg-navy/10 text-navy font-medium' : ''
                    }`}
                    onClick={() => handleCategoryFilter(null)}
                  >
                    <span className="flex-grow">All Cards</span>
                    {!currentFilter && <Check className="h-4 w-4" />}
                  </div>
                  
                  {allCategories.map((category) => (
                    <div 
                      key={category}
                      className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors ${
                        currentFilter === category ? 'bg-navy/10 text-navy font-medium' : ''
                      }`}
                      onClick={() => handleCategoryFilter(category)}
                    >
                      <span className="flex-grow">{category}</span>
                      {currentFilter === category && <Check className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Card Grid */}
            <div className="flex-grow">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
                </div>
              ) : filteredCards.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <div className="bg-navy/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Filter className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">No Cards Found</h3>
                  <p className="text-gray-600 mb-4">
                    No credit cards match your current filters.
                  </p>
                  <Button 
                    onClick={() => handleCategoryFilter(null)} 
                    className="bg-navy hover:bg-navy/90"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCards.map((card) => (
                    <Card key={card.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-navy flex justify-between items-start">
                          <span>{card.name}</span>
                          {card.highlight && (
                            <div className="bg-gold/20 text-gold font-medium px-2 py-1 rounded-full text-xs flex items-center">
                              <Tag className="h-3 w-3 mr-1" />
                              {card.highlight}
                            </div>
                          )}
                        </CardTitle>
                        <div className="text-sm text-gray-500">{card.issuer}</div>
                      </CardHeader>
                      
                      <CardContent className="py-4 flex-grow">
                        <div className="mb-6">
                          <CreditCardBanner card={card} size="sm" />
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-navy mb-2">Benefits</h4>
                            <ul className="space-y-1">
                              {card.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{benefit.description}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-navy mb-2">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                              {card.categories.map((category, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2 py-1 bg-navy/10 text-navy rounded-full text-xs cursor-pointer"
                                  onClick={() => handleCategoryFilter(category)}
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Button 
                          asChild 
                          className="w-full bg-navy hover:bg-navy/90"
                        >
                          <a href={card.applyUrl} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllCards;
