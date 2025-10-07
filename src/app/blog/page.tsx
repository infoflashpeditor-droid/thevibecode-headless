"use client";

import React from "react";
import { BlogPageTemplate } from "@/components/templates/blog-page";
import { WordPressPost, WordPressCategory } from "@/types/wordpress";
import WordPressAPI from "@/lib/wordpress-api";

export default function BlogPage() {
  const [posts, setPosts] = React.useState<WordPressPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = React.useState(false);

  const fetchPosts = React.useCallback(async (page: number, append: boolean = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadMoreLoading(true);

      const result = await WordPressAPI.getPosts({ 
        page,
        per_page: 9
      });
      
      if (append) {
        setPosts(prev => [...prev, ...result.posts]);
      } else {
        setPosts(result.posts);
      }
      
      setTotalPages(result.totalPages);
      setHasMore(page < result.totalPages);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (!append) setPosts([]);
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const handleLoadMore = React.useCallback(() => {
    if (hasMore && !loadMoreLoading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPosts(nextPage, true);
    }
  }, [hasMore, loadMoreLoading, currentPage, fetchPosts]);

  return (
    <BlogPageTemplate
      posts={posts}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      loadMoreLoading={loadMoreLoading}
    />
  );
}