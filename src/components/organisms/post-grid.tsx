"use client";

import * as React from "react";
import { PostCard } from "@/components/molecules/post-card";
import { PostCardSkeleton } from "@/components/molecules/post-card-skeleton";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { WordPressPost } from "@/types/wordpress";
import { cn } from "@/lib/utils";

interface PostGridProps {
  posts: WordPressPost[];
  title?: string;
  description?: string;
  className?: string;
  loading?: boolean;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loadMoreLoading?: boolean;
  variant?: "default" | "featured" | "compact";
  columns?: "2" | "3" | "4";
}

export function PostGrid({
  posts,
  title,
  description,
  className,
  loading = false,
  showLoadMore = false,
  onLoadMore,
  loadMoreLoading = false,
  variant = "default",
  columns = "3"
}: PostGridProps) {
  const gridVariants = {
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  if (loading) {
    return (
      <section className={cn("w-full py-8", className)}>
        <div className="container">
          <div className="space-y-8">
            {title && (
              <div className="text-center space-y-2">
                <div className="h-8 bg-muted animate-pulse rounded w-48 mx-auto" />
                <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto" />
              </div>
            )}
            
            <div className={cn("grid gap-6", gridVariants[columns])}>
              {Array.from({ length: parseInt(columns) * 2 }, (_, i) => (
                <PostCardSkeleton
                  key={i}
                  variant={variant}
                  showAuthor={variant !== "compact"}
                  showReadMore={variant !== "compact"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className={cn("w-full py-16", className)}>
        <div className="container">
          <div className="flex justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  📝
                </EmptyMedia>
                <EmptyTitle>No posts found</EmptyTitle>
                <EmptyDescription>
                  There are no posts to display at the moment. Check back later for fresh content!
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("w-full py-8", className)}>
      <div className="container">
        <div className="space-y-8">
          {(title || description) && (
            <div className="text-center space-y-2">
              {title && (
                <h2 className="text-3xl font-bold tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}
          
          <div className={cn("grid gap-6", gridVariants[columns])}>
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                variant={index === 0 && variant === "featured" ? "featured" : variant}
                showAuthor={variant !== "compact"}
                showReadMore={variant !== "compact"}
              />
            ))}
          </div>

          {showLoadMore && onLoadMore && (
            <div className="text-center">
              <Button
                onClick={onLoadMore}
                disabled={loadMoreLoading}
                size="lg"
                variant="outline"
                className="min-w-[120px]"
              >
                {loadMoreLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading...
                  </div>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}