
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Save, User as UserIcon, PlusCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { findCreditCardById, creditCards } from "@/data/creditCards";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, updateProfile, updateOwnedCards } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [allCards, setAllCards] = useState<any[]>([]);
  const [ownedCardIds, setOwnedCardIds] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("profile");

  // Group cards by issuer
  const cardsByIssuer: Record<string, any[]> = {};
  allCards.forEach(card => {
    if (!cardsByIssuer[card.issuer]) {
      cardsByIssuer[card.issuer] = [];
    }
    cardsByIssuer[card.issuer].push(card);
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setOwnedCardIds(user.ownedCards || []);
    }
  }, [user]);

  // Load all credit cards
  useEffect(() => {
    // Use the actual credit cards data instead of trying to find by ID
    setAllCards(creditCards);
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      updateProfile({
        name,
        email,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCardOwnership = (cardId: string) => {
    const updatedOwnedCards = ownedCardIds.includes(cardId)
      ? ownedCardIds.filter(id => id !== cardId)
      : [...ownedCardIds, cardId];
    
    setOwnedCardIds(updatedOwnedCards);
    updateOwnedCards(updatedOwnedCards);
    
    toast({
      title: ownedCardIds.includes(cardId) ? "Card removed" : "Card added",
      description: ownedCardIds.includes(cardId) 
        ? "Card removed from your collection" 
        : "Card added to your collection",
    });
  };

  const toggleIssuerExpanded = (issuer: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [issuer]: !prev[issuer]
    }));
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
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="flex items-center gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <span className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="cards">
            <Card>
              <CardHeader>
                <CardTitle>My Credit Cards</CardTitle>
                <CardDescription>
                  Select the credit cards you currently own by checking the boxes below
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Add your credit cards
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Adding the cards you own helps us provide better recommendations and insights about your credit portfolio.
                    </p>
                  </div>
                  
                  {Object.entries(cardsByIssuer).map(([issuer, cards]) => (
                    <Collapsible
                      key={issuer}
                      open={expandedCategories[issuer]}
                      onOpenChange={() => toggleIssuerExpanded(issuer)}
                      className="border rounded-lg p-4"
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full">
                        <h3 className="text-lg font-medium">{issuer}</h3>
                        <div className="text-sm text-gray-500">
                          {cards.filter(card => ownedCardIds.includes(card.id)).length} of {cards.length} selected
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-4 space-y-3">
                        {cards.map((card) => (
                          <div key={card.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Checkbox
                              id={`card-${card.id}`}
                              checked={ownedCardIds.includes(card.id)}
                              onCheckedChange={() => toggleCardOwnership(card.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={`card-${card.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {card.name}
                              </label>
                              <p className="text-sm text-gray-500">
                                {card.type} • {card.network}
                              </p>
                            </div>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <p className="text-sm text-gray-500">
                  You currently own {ownedCardIds.length} credit card{ownedCardIds.length !== 1 ? 's' : ''}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
