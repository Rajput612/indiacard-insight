import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { creditCards } from "@/data/creditCards";
import CreditCardBanner from "../CreditCardBanner";
import { X } from "lucide-react";

export interface CardPreferences {
  compareCards: string[];
  excludeCards: string[];
  ownedCards: string[];
  desiredCardCount: number;
}

interface CardPreferencesProps {
  preferences: CardPreferences;
  onPreferencesChange: (preferences: CardPreferences) => void;
}

const CardPreferences = ({ preferences, onPreferencesChange }: CardPreferencesProps) => {
  const handleCardSelect = (type: keyof Pick<CardPreferences, 'compareCards' | 'excludeCards' | 'ownedCards'>, cardId: string) => {
    if (!cardId) return;
    
    const updatedPreferences = { ...preferences };
    if (!updatedPreferences[type].includes(cardId)) {
      updatedPreferences[type] = [...updatedPreferences[type], cardId];
      onPreferencesChange(updatedPreferences);
    }
  };

  const handleRemoveCard = (type: keyof Pick<CardPreferences, 'compareCards' | 'excludeCards' | 'ownedCards'>, cardId: string) => {
    const updatedPreferences = { ...preferences };
    updatedPreferences[type] = updatedPreferences[type].filter(id => id !== cardId);
    onPreferencesChange(updatedPreferences);
  };

  const renderCardList = (type: keyof Pick<CardPreferences, 'compareCards' | 'excludeCards' | 'ownedCards'>, title: string) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{title}</Label>
        <Select onValueChange={(value) => handleCardSelect(type, value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a card" />
          </SelectTrigger>
          <SelectContent>
            {creditCards
              .filter(card => 
                !preferences.compareCards.includes(card.id) &&
                !preferences.excludeCards.includes(card.id) &&
                !preferences.ownedCards.includes(card.id)
              )
              .map(card => (
                <SelectItem key={card.id} value={card.id}>
                  {card.name}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {preferences[type].map(cardId => {
          const card = creditCards.find(c => c.id === cardId);
          if (!card) return null;
          
          return (
            <div key={cardId} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-2 -top-2 z-10 h-6 w-6 rounded-full bg-white shadow-md hover:bg-red-50"
                onClick={() => handleRemoveCard(type, cardId)}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
              <CreditCardBanner card={card} size="sm" showSpark={false} />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-navy">Card Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderCardList('compareCards', 'Cards to Compare')}
        {renderCardList('excludeCards', 'Cards to Exclude')}
        {renderCardList('ownedCards', 'Cards You Own')}
        
        <div className="space-y-2">
          <Label htmlFor="desiredCards">How many new cards are you looking to apply for?</Label>
          <Input
            id="desiredCards"
            type="number"
            min={1}
            max={5}
            value={preferences.desiredCardCount}
            onChange={(e) => onPreferencesChange({
              ...preferences,
              desiredCardCount: parseInt(e.target.value) || 1
            })}
            className="w-full sm:w-32"
          />
          <p className="text-sm text-gray-500">
            We'll recommend up to {preferences.desiredCardCount} card{preferences.desiredCardCount !== 1 ? 's' : ''} that best complement your existing cards and spending patterns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPreferences;

export { CardPreferences }