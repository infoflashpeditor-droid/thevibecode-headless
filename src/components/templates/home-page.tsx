"use client";

import * as React from "react";
import { Navigation } from "@/components/organisms/navigation";
import { HeroSection } from "@/components/organisms/hero-section";
import { PostGrid } from "@/components/organisms/post-grid";
import { Footer } from "@/components/organisms/footer";
import { WordPressPost } from "@/types/wordpress";
import { cn } from "@/lib/utils";

interface HomePageTemplateProps {
  featuredPosts: WordPressPost[];
  recentPosts: WordPressPost[];
  loading?: boolean;
  className?: string;
}

export function HomePageTemplate({
  featuredPosts,
  recentPosts,
  loading = false,
  className
}: HomePageTemplateProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Navigation />
      
      <main className="flex-1">
        <HeroSection className="bg-gradient-to-br from-background via-accent/20 to-background" />

        <PostGrid
          posts={featuredPosts}
          title="Featured Posts"
          description="Handpicked articles that showcase the best of our content"
          variant="featured"
          columns="3"
          loading={loading}
          className="py-16 bg-accent/30"
        />

        <PostGrid
          posts={recentPosts}
          title="Recent Posts"
          description="The latest articles from our blog"
          variant="default"
          columns="3"
          loading={loading}
          showLoadMore={true}
          className="py-16"
        />
      </main>

      <Footer />
    </div>
  );
}