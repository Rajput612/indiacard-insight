
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, ArrowUpDown, Search } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CreditCard } from "@/types/spending";
import { useToast } from "@/hooks/use-toast";
import CreditCardBanner from "@/components/CreditCardBanner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CreditCardManagerProps {
  allCards: CreditCard[];
  ownedCardIds: string[];
  onUpdateOwnedCards: (cardIds: string[]) => void;
}

const CreditCardManager = ({ allCards, ownedCardIds, onUpdateOwnedCards }: CreditCardManagerProps) => {
  const { toast } = useToast();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("issuer");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Group cards by issuer
  const cardsByIssuer: Record<string, CreditCard[]> = {};
  allCards.forEach(card => {
    if (!cardsByIssuer[card.issuer]) {
      cardsByIssuer[card.issuer] = [];
    }
    cardsByIssuer[card.issuer].push(card);
  });

  // Get owned cards
  const ownedCards = allCards.filter(card => ownedCardIds.includes(card.id));

  // Sort owned cards
  const sortedOwnedCards = [...ownedCards].sort((a, b) => {
    let valueA: string | number = a[sortOption as keyof CreditCard] as string | number;
    let valueB: string | number = b[sortOption as keyof CreditCard] as string | number;
    
    const multiplier = sortDirection === "asc" ? 1 : -1;
    
    if (typeof valueA === "string" && typeof valueB === "string") {
      return multiplier * valueA.localeCompare(valueB);
    }
    
    if (typeof valueA === "number" && typeof valueB === "number") {
      return multiplier * (valueA - valueB);
    }
    
    return 0;
  });

  // Filter owned cards by search query
  const filteredOwnedCards = sortedOwnedCards.filter(card => {
    const query = searchQuery.toLowerCase();
    return (
      card.name.toLowerCase().includes(query) ||
      card.issuer.toLowerCase().includes(query) ||
      (card.type && card.type.toLowerCase().includes(query))
    );
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

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-8">
      {/* My Cards Section */}
      <Card>
        <CardHeader>
          <CardTitle>My Credit Cards</CardTitle>
          <CardDescription>
            Your currently owned credit cards
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Card Name</SelectItem>
                    <SelectItem value="issuer">Issuer</SelectItem>
                    <SelectItem value="annualFee">Annual Fee</SelectItem>
                  </SelectContent>
                </Select>
                <button 
                  onClick={toggleSortDirection} 
                  className="p-2 ml-2 rounded-md hover:bg-gray-100"
                  title={`Sort ${sortDirection === "asc" ? "ascending" : "descending"}`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {filteredOwnedCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredOwnedCards.map((card) => (
                  <div key={card.id} className="flex flex-col">
                    <CreditCardBanner card={card} size="md" showSpark={false} />
                    <div className="mt-2 text-sm font-medium">{card.name}</div>
                    <div className="text-xs text-gray-500">{card.issuer}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No cards match your search" : "You don't have any cards yet"}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <p className="text-sm text-gray-500">
            You currently own {ownedCardIds.length} credit card{ownedCardIds.length !== 1 ? 's' : ''}
          </p>
        </CardFooter>
      </Card>

      {/* Add Cards Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add Credit Cards</CardTitle>
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
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Card Name</TableHead>
                  <TableHead>Issuer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Network</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>
                      <Checkbox
                        id={`card-table-${card.id}`}
                        checked={ownedCardIds.includes(card.id)}
                        onCheckedChange={() => toggleCardOwnership(card.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{card.name}</TableCell>
                    <TableCell>{card.issuer}</TableCell>
                    <TableCell>{card.type || "Credit"}</TableCell>
                    <TableCell>{card.network || "Visa"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="text-sm text-gray-500 mt-4">
              By issuer:
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
                          {card.type || "Credit"} • {card.network || "Visa"}
                        </p>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditCardManager;
