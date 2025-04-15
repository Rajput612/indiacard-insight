import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, CreditCard, User as UserIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { creditCards } from "@/data/creditCards";
import ProfileInfo from "@/components/profile/ProfileInfo";
import CreditCardManager from "@/components/profile/CreditCardManager";
import PurchaseAdvisor from "@/components/profile/PurchaseAdvisor";
import { User } from "@/types/user";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, updateProfile, updateOwnedCards } = useAuth();
  const navigate = useNavigate();
  const [allCards, setAllCards] = useState<any[]>([]);
  const [ownedCardIds, setOwnedCardIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("profile");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setOwnedCardIds(user.ownedCards || []);
    }
  }, [user]);

  // Load all credit cards
  useEffect(() => {
    setAllCards(creditCards);
  }, []);

  const handleUpdateProfile = (userData: Partial<User>) => {
    if (!user) return;
    updateProfile(userData);
  };

  const handleUpdateOwnedCards = (cardIds: string[]) => {
    setOwnedCardIds(cardIds);
    updateOwnedCards(cardIds);
  };

  // Get owned cards data
  const ownedCards = allCards.filter(card => ownedCardIds.includes(card.id));

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-navy rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2 -mb-2">
            <TabsList className="inline-flex w-auto min-w-full sm:min-w-0 h-auto items-center justify-start sm:justify-center p-1 flex-wrap gap-1">
              <TabsTrigger 
                value="profile" 
                className="flex items-center gap-2 min-w-[120px] sm:min-w-[140px] data-[state=active]:bg-navy data-[state=active]:text-white"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Personal Info</span>
                <span className="sm:hidden">Profile</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="cards" 
                className="flex items-center gap-2 min-w-[120px] sm:min-w-[140px] data-[state=active]:bg-navy data-[state=active]:text-white"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">My Credit Cards</span>
                <span className="sm:hidden">Cards</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="advisor" 
                className="flex items-center gap-2 min-w-[120px] sm:min-w-[140px] data-[state=active]:bg-navy data-[state=active]:text-white"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Purchase Advisor</span>
                <span className="sm:hidden">Advisor</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="profile" className="mt-6">
            {user && <ProfileInfo user={user} onUpdateProfile={handleUpdateProfile} />}
          </TabsContent>
          
          <TabsContent value="cards" className="mt-6">
            <CreditCardManager 
              allCards={allCards} 
              ownedCardIds={ownedCardIds} 
              onUpdateOwnedCards={handleUpdateOwnedCards} 
            />
          </TabsContent>

          <TabsContent value="advisor" className="mt-6">
            <PurchaseAdvisor ownedCards={ownedCards} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;