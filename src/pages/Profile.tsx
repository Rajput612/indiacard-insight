
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, Filter, Plus, Trash2, UserCircle } from "lucide-react";
import { UserCard, UserPreferences } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { creditCards } from "@/data/creditCards";
import CreditCardBanner from "@/components/CreditCardBanner";

// Extract all unique banks from credit cards
const allBanks = Array.from(new Set(creditCards.map(card => card.issuer)));

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const [cardIdToAdd, setCardIdToAdd] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserCards();
      fetchUserPreferences();
    }
  }, [user]);

  const fetchUserCards = async () => {
    if (!user) return;
    
    try {
      setLoadingCards(true);
      const { data, error } = await supabase
        .from('user_cards')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setUserCards(data || []);
    } catch (error: any) {
      console.error("Error fetching user cards:", error.message);
      toast({
        title: "Error",
        description: "Failed to load your saved cards.",
        variant: "destructive",
      });
    } finally {
      setLoadingCards(false);
    }
  };

  const fetchUserPreferences = async () => {
    if (!user) return;
    
    try {
      setLoadingPreferences(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Record not found, create default preferences
          await createDefaultPreferences();
          return;
        }
        throw error;
      }
      
      setPreferences(data);
    } catch (error: any) {
      console.error("Error fetching user preferences:", error.message);
      toast({
        title: "Error",
        description: "Failed to load your preferences.",
        variant: "destructive",
      });
    } finally {
      setLoadingPreferences(false);
    }
  };

  const createDefaultPreferences = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .insert({ user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      
      setPreferences(data);
    } catch (error: any) {
      console.error("Error creating default preferences:", error.message);
    }
  };

  const addUserCard = async () => {
    if (!user || !cardIdToAdd) return;
    
    const cardExists = userCards.some(card => card.card_id === cardIdToAdd);
    if (cardExists) {
      toast({
        title: "Already Added",
        description: "This card is already in your collection.",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('user_cards')
        .insert({
          user_id: user.id,
          card_id: cardIdToAdd
        });
      
      if (error) throw error;
      
      toast({
        title: "Card Added",
        description: "The card has been added to your collection.",
      });
      
      fetchUserCards();
      setCardIdToAdd("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add the card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeUserCard = async (cardId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_cards')
        .delete()
        .eq('user_id', user.id)
        .eq('card_id', cardId);
      
      if (error) throw error;
      
      toast({
        title: "Card Removed",
        description: "The card has been removed from your collection.",
      });
      
      fetchUserCards();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove the card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleIncludedBank = async (bank: string, checked: boolean) => {
    if (!user || !preferences) return;
    
    try {
      let included = [...(preferences.included_banks || [])];
      
      if (checked) {
        included.push(bank);
      } else {
        included = included.filter(b => b !== bank);
      }
      
      const { error } = await supabase
        .from('user_preferences')
        .update({ included_banks: included })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setPreferences({
        ...preferences,
        included_banks: included
      });
      
      toast({
        title: "Preferences Updated",
        description: `${bank} has been ${checked ? 'added to' : 'removed from'} your included banks.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update your preferences.",
        variant: "destructive",
      });
    }
  };

  const toggleExcludedBank = async (bank: string, checked: boolean) => {
    if (!user || !preferences) return;
    
    try {
      let excluded = [...(preferences.excluded_banks || [])];
      
      if (checked) {
        excluded.push(bank);
      } else {
        excluded = excluded.filter(b => b !== bank);
      }
      
      const { error } = await supabase
        .from('user_preferences')
        .update({ excluded_banks: excluded })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setPreferences({
        ...preferences,
        excluded_banks: excluded
      });
      
      toast({
        title: "Preferences Updated",
        description: `${bank} has been ${checked ? 'added to' : 'removed from'} your excluded banks.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update your preferences.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy mx-auto mb-4"></div>
            <p>Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Get full card details for the user's saved cards
  const userCardDetails = userCards.map(userCard => {
    const cardDetail = creditCards.find(card => card.id === userCard.card_id);
    return {
      ...userCard,
      details: cardDetail
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            <UserCircle className="h-12 w-12 text-navy mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-navy">My Profile</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-8">
              <TabsTrigger value="cards" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                My Cards
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Bank Preferences
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="cards">
              <Card>
                <CardHeader>
                  <CardTitle>My Credit Cards</CardTitle>
                  <CardDescription>
                    Manage your credit card collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Add a Card</h3>
                    <div className="flex gap-2">
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={cardIdToAdd}
                        onChange={(e) => setCardIdToAdd(e.target.value)}
                      >
                        <option value="">Select a card to add</option>
                        {creditCards.map(card => (
                          <option key={card.id} value={card.id}>
                            {card.name} ({card.issuer})
                          </option>
                        ))}
                      </select>
                      <Button 
                        onClick={addUserCard} 
                        disabled={!cardIdToAdd}
                        className="bg-navy hover:bg-navy/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Your Cards</h3>
                    {loadingCards ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-navy mx-auto mb-2"></div>
                        <p className="text-sm text-gray-500">Loading your cards...</p>
                      </div>
                    ) : userCardDetails.length === 0 ? (
                      <div className="text-center py-8 border rounded-md bg-gray-50">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">You haven't added any cards yet</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {userCardDetails.map((userCard) => (
                          <div key={userCard.id} className="flex items-center border rounded-md p-4 bg-white">
                            {userCard.details ? (
                              <>
                                <div className="w-48 mr-4">
                                  <CreditCardBanner card={userCard.details} size="sm" />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{userCard.details.name}</h4>
                                  <p className="text-sm text-gray-500">{userCard.details.issuer}</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => removeUserCard(userCard.card_id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <div className="flex-grow">
                                <p>Card not found (ID: {userCard.card_id})</p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => removeUserCard(userCard.card_id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Preferences</CardTitle>
                  <CardDescription>
                    Choose which banks' cards you want to see in recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingPreferences ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-navy mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">Loading your preferences...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Include Only These Banks</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          If any banks are selected here, only cards from these banks will be shown
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {allBanks.map((bank) => (
                            <div key={`include-${bank}`} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`include-${bank}`} 
                                checked={preferences?.included_banks?.includes(bank) || false}
                                onCheckedChange={(checked) => 
                                  toggleIncludedBank(bank, checked === true)
                                }
                              />
                              <Label htmlFor={`include-${bank}`}>{bank}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Exclude These Banks</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Cards from these banks will not be shown in recommendations
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {allBanks.map((bank) => (
                            <div key={`exclude-${bank}`} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`exclude-${bank}`} 
                                checked={preferences?.excluded_banks?.includes(bank) || false}
                                onCheckedChange={(checked) => 
                                  toggleExcludedBank(bank, checked === true)
                                }
                                disabled={preferences?.included_banks?.includes(bank) || false}
                              />
                              <Label 
                                htmlFor={`exclude-${bank}`}
                                className={preferences?.included_banks?.includes(bank) 
                                  ? "text-gray-400" 
                                  : ""}
                              >
                                {bank}
                                {preferences?.included_banks?.includes(bank) && 
                                  " (already included)"}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
