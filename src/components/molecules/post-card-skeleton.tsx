"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PostCardSkeletonProps {
  className?: string;
  variant?: "default" | "featured" | "compact";
  showAuthor?: boolean;
  showReadMore?: boolean;
}

export function PostCardSkeleton({ 
  className, 
  variant = "default", 
  showAuthor = false,
  showReadMore = true 
}: PostCardSkeletonProps) {
  const cardVariants = {
    default: "h-full",
    featured: "h-full border-primary/20",
    compact: "h-auto"
  };

  return (
    <Card className={cn(
      cardVariants[variant],
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Title */}
            <Skeleton className={cn(
              "h-6",
              variant === "featured" && "h-7",
              variant === "compact" && "h-5"
            )} />
            <Skeleton className={cn(
              "h-6 w-3/4",
              variant === "featured" && "h-7 w-4/5",
              variant === "compact" && "h-5 w-2/3"
            )} />
            
            {/* Meta info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3.5 w-3.5 rounded" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {showAuthor && (
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {variant !== "compact" && (
        <CardContent className="space-y-4">
          {/* Excerpt */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </CardContent>
      )}

      {showReadMore && variant !== "compact" && (
        <CardFooter className="pt-4">
          <Skeleton className="h-5 w-20" />
        </CardFooter>
      )}
    </Card>
  );
}