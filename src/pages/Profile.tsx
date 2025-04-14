
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, User as UserIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { creditCards } from "@/data/creditCards";
import ProfileInfo from "@/components/profile/ProfileInfo";
import CreditCardManager from "@/components/profile/CreditCardManager";
import { User } from "@/types/user"; // Added missing import for User type

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
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              My Credit Cards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            {user && <ProfileInfo user={user} onUpdateProfile={handleUpdateProfile} />}
          </TabsContent>
          
          <TabsContent value="cards">
            <CreditCardManager 
              allCards={allCards} 
              ownedCardIds={ownedCardIds} 
              onUpdateOwnedCards={handleUpdateOwnedCards} 
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
