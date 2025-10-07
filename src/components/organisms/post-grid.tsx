"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { PostCard } from "@/components/molecules/post-card";
import { PostCardSkeleton } from "@/components/molecules/post-card-skeleton";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { TypographyH2, TypographyP } from "@/components/atoms/typography";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <section className={cn("w-full py-8", className)}>
        <div className="container">
          <div className="space-y-8">
            {title && (
              <div className="text-center space-y-2">
                <PostCardSkeleton />
                <PostCardSkeleton />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-2"
            >
              {title && (
                <TypographyH2 className="text-3xl font-bold tracking-tight">
                  {title}
                </TypographyH2>
              )}
              {description && (
                <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
                  {description}
                </TypographyP>
              )}
            </motion.div>
          )}
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn("grid gap-6", gridVariants[columns])}
          >
            {posts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostCard
                  post={post}
                  variant={index === 0 && variant === "featured" ? "featured" : variant}
                  showAuthor={variant !== "compact"}
                  showReadMore={variant !== "compact"}
                />
              </motion.div>
            ))}
          </motion.div>

          {showLoadMore && onLoadMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}