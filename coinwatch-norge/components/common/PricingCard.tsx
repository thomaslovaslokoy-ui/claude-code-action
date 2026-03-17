"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular?: boolean;
  onAction?: () => void;
}

export function PricingCard({ name, price, period, features, cta, popular, onAction }: PricingCardProps) {
  return (
    <Card className={cn("relative", popular && "border-primary ring-2 ring-primary")}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Mest populaer
        </Badge>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-syne font-bold">{price}</span>
          {period && <span className="text-muted-foreground ml-1">{period}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-accent shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={popular ? "default" : "outline"} onClick={onAction}>
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}
