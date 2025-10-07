import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function Logo({ className, size = "md", variant = "full" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconContent = (
    <div className={cn(
      "rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center",
      sizeClasses[size]
    )}>
      <span className="text-primary-foreground font-bold text-sm">V</span>
    </div>
  );

  const fullContent = (
    <div className={cn("flex items-center space-x-2", className)}>
      {iconContent}
      <span className={cn(
        "font-bold gradient-text",
        textSizeClasses[size]
      )}>
        The Vibe Code
      </span>
    </div>
  );

  return (
    <Link href="/" className="transition-transform hover:scale-105">
      {variant === "icon" ? iconContent : fullContent}
    </Link>
  );
}