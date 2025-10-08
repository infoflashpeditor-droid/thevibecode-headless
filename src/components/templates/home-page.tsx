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
        <HeroSection />

        <PostGrid
          posts={featuredPosts}
          title="Featured Posts"
          description="Latest articles from our blog"
          variant="featured"
          columns="3"
          loading={loading}
          className="py-16"
        />

        <PostGrid
          posts={recentPosts}
          title="Recent Posts"
          description="More articles you might enjoy"
          variant="default"
          columns="3"
          loading={loading}
          showLoadMore={true}
          className="py-16 bg-muted/30"
        />
      </main>

      <Footer />
    </div>
  );
}