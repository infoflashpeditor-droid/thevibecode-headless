"use client";

import React from "react";
import { HomePageTemplate } from "@/components/templates/home-page";
import { WordPressPost } from "@/types/wordpress";
import WordPressAPI from "@/lib/wordpress-api";

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = React.useState<WordPressPost[]>([]);
  const [recentPosts, setRecentPosts] = React.useState<WordPressPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // Fetch recent posts for both sections
        const result = await WordPressAPI.getPosts({ per_page: 6 });
        
        // Use first 3 as featured, remaining as recent
        setFeaturedPosts(result.posts.slice(0, 3));
        setRecentPosts(result.posts.slice(3, 6));
      } catch (error) {
        console.error("Error fetching posts:", error);
        setFeaturedPosts([]);
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <HomePageTemplate
      featuredPosts={featuredPosts}
      recentPosts={recentPosts}
      loading={loading}
    />
  );
}
