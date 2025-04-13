
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { creditCards } from "@/data/creditCards";
import { UserPreferences } from "@/types/auth";
import { CreditCard } from "@/types/creditCard";
import { useAuth } from "@/contexts/AuthContext";

export const useFilteredCreditCards = (categoryFilter?: string) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>(creditCards);

  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    } else {
      // If no user is logged in, just apply the category filter
      applyFilters(null, categoryFilter);
    }
  }, [user, categoryFilter]);

  const fetchUserPreferences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching preferences:", error);
        return;
      }
      
      setPreferences(data);
      applyFilters(data, categoryFilter);
    } catch (error) {
      console.error("Error in fetchUserPreferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (prefs: UserPreferences | null, category?: string) => {
    let filtered = [...creditCards];
    
    // Apply bank filters if user is logged in and has preferences
    if (prefs) {
      // If there are included banks, only show those
      if (prefs.included_banks && prefs.included_banks.length > 0) {
        filtered = filtered.filter(card => 
          prefs.included_banks.includes(card.issuer)
        );
      } 
      // Otherwise, exclude the excluded banks
      else if (prefs.excluded_banks && prefs.excluded_banks.length > 0) {
        filtered = filtered.filter(card => 
          !prefs.excluded_banks.includes(card.issuer)
        );
      }
    }
    
    // Apply category filter if provided
    if (category) {
      filtered = filtered.filter(card => {
        const categoryMatch = card.categories.some(cat => 
          cat.toLowerCase() === category.toLowerCase()
        );
        
        return categoryMatch;
      });
    }
    
    setFilteredCards(filtered);
  };

  return { filteredCards, loading, userPreferences: preferences };
};
