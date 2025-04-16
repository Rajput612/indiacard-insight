
import React from "react";
import { Button } from "@/components/ui/button";
import { SpendingEntry } from "@/types/spending";
import { Copy, Edit2, X } from "lucide-react";

interface SpendingEntryListProps {
  entries: SpendingEntry[];
  onEdit: (entry: SpendingEntry) => void;
  onDuplicate: (entry: SpendingEntry) => void;
  onRemove: (id: string) => void;
}

const SpendingEntryList = ({ entries, onEdit, onDuplicate, onRemove }: SpendingEntryListProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">No spending entries added yet. Add your first one above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {entries.map((entry) => (
        <div 
          key={entry.id} 
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-navy/30 transition-colors"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-navy capitalize">
                {entry.subcategory.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              {entry.specificCategory && (
                <span className="text-xs text-gray-500">({entry.specificCategory})</span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span className="capitalize">{entry.category}</span>
              {entry.platform && ` • ${entry.platform === 'app' ? 'App' : entry.platform === 'website' ? 'Website' : entry.platform === 'store' ? 'Store' : 'Platform'}`}
              {entry.platformName && `: ${entry.platformName}`}
              {entry.brand && ` • ${entry.brand}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="font-medium">₹{entry.amount.toLocaleString()}</span>
              <div className="text-xs text-gray-500 capitalize">
                {entry.frequency}
              </div>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDuplicate(entry)}
                className="text-gray-500 hover:text-navy"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(entry)}
                className="text-gray-500 hover:text-navy"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onRemove(entry.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpendingEntryList;
