"use client";

import * as React from "react";
import { Navigation } from "@/components/organisms/navigation";
import { PostGrid } from "@/components/organisms/post-grid";
import { Footer } from "@/components/organisms/footer";
import { TypographyH1, TypographyP } from "@/components/atoms/typography";
import { WordPressPost } from "@/types/wordpress";
import { cn } from "@/lib/utils";

interface BlogPageTemplateProps {
  posts: WordPressPost[];
  loading?: boolean;
  className?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadMoreLoading?: boolean;
}

export function BlogPageTemplate({
  posts,
  loading = false,
  className,
  hasMore = false,
  onLoadMore,
  loadMoreLoading = false
}: BlogPageTemplateProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Navigation />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="section-md bg-accent/30 border-b">
          <div className="container">
            <div className="text-center space-y-4">
              <TypographyH1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Blog
              </TypographyH1>
              <TypographyP className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our latest articles on technology, programming, and digital innovation. 
                Stay updated with insights from industry experts.
              </TypographyP>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <PostGrid
          posts={posts}
          loading={loading}
          variant="default"
          columns="3"
          showLoadMore={hasMore}
          onLoadMore={onLoadMore}
          loadMoreLoading={loadMoreLoading}
          className="py-16"
        />
      </main>

      <Footer />
    </div>
  );
}