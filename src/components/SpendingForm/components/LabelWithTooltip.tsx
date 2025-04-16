
import React from "react";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface LabelWithTooltipProps {
  htmlFor: string;
  children: React.ReactNode;
  tooltip: string;
}

const LabelWithTooltip = ({ htmlFor, children, tooltip }: LabelWithTooltipProps) => (
  <div className="flex items-center gap-2">
    <Label htmlFor={htmlFor}>{children}</Label>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

export default LabelWithTooltip;
