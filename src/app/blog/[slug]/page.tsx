"use client";

import React from "react";
import { notFound } from "next/navigation";
import { PostPageTemplate } from "@/components/templates/post-page";
import { WordPressPost } from "@/types/wordpress";
import WordPressAPI from "@/lib/wordpress-api";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = React.useState<WordPressPost | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<WordPressPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const postData = await WordPressAPI.getPostBySlug(params.slug);
        
        if (!postData) {
          notFound();
          return;
        }
        
        setPost(postData);
        
        // Fetch related posts (simple approach - just get latest posts)
        const relatedResult = await WordPressAPI.getPosts({ 
          per_page: 3
        });
        // Filter out current post if it appears in the list
        const filteredPosts = relatedResult.posts.filter(p => p.id !== postData.id);
        setRelatedPosts(filteredPosts.slice(0, 3));
        
      } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.slug]);

  return (
    <PostPageTemplate
      post={post!}
      relatedPosts={relatedPosts}
      loading={loading}
    />
  );
}