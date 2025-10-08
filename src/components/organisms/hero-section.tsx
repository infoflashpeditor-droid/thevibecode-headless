"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            The Vibe Code
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Coding tutorials, tips, and insights for modern developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild>
              <Link href="/blog">
                Read Blog
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link href="/about">
                About
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}