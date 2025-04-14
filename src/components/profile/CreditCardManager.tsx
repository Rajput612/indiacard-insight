
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CreditCard } from "@/types/spending";
import { useToast } from "@/hooks/use-toast";

interface CreditCardManagerProps {
  allCards: CreditCard[];
  ownedCardIds: string[];
  onUpdateOwnedCards: (cardIds: string[]) => void;
}

const CreditCardManager = ({ allCards, ownedCardIds, onUpdateOwnedCards }: CreditCardManagerProps) => {
  const { toast } = useToast();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Group cards by issuer
  const cardsByIssuer: Record<string, CreditCard[]> = {};
  allCards.forEach(card => {
    if (!cardsByIssuer[card.issuer]) {
      cardsByIssuer[card.issuer] = [];
    }
    cardsByIssuer[card.issuer].push(card);
  });

  const toggleCardOwnership = (cardId: string) => {
    const updatedOwnedCards = ownedCardIds.includes(cardId)
      ? ownedCardIds.filter(id => id !== cardId)
      : [...ownedCardIds, cardId];
    
    onUpdateOwnedCards(updatedOwnedCards);
    
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

  return (
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
  );
};

export default CreditCardManager;
