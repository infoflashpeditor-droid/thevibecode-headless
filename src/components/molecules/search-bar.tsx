"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className,
  size = "md" 
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className={cn(
        "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
        iconSizes[size]
      )} />
      <Input
        type="search"
        placeholder={placeholder}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        className={cn(
          "pl-9 focus-ring",
          sizeClasses[size]
        )}
      />
    </div>
  );
}