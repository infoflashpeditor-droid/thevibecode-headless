"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { Navigation } from "@/components/organisms/navigation";
import { Footer } from "@/components/organisms/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/atoms/typography";
import { WordPressPost } from "@/types/wordpress";
import { cn } from "@/lib/utils";

interface PostPageTemplateProps {
  post: WordPressPost;
  relatedPosts?: WordPressPost[];
  loading?: boolean;
  className?: string;
}

export function PostPageTemplate({
  post,
  relatedPosts = [],
  loading = false,
  className
}: PostPageTemplateProps) {
  const readingTime = React.useMemo(() => {
    if (!post) return 0;
    const wordsPerMinute = 200;
    const textContent = post.content.rendered.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post]);

  if (loading || !post) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        <Navigation />
        <main className="flex-1">
          <article className="section-lg">
            <div className="container max-w-4xl">
              <div className="space-y-8 animate-pulse">
                <div className="h-8 bg-accent rounded w-3/4" />
                <div className="space-y-4">
                  <div className="h-4 bg-accent rounded w-full" />
                  <div className="h-4 bg-accent rounded w-5/6" />
                  <div className="h-4 bg-accent rounded w-4/5" />
                </div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Navigation />
      
      <main className="flex-1">
        <article className="section-lg">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Back Button */}
              <div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/blog" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>

              {/* Article Header */}
              <header className="space-y-6">
                <div className="space-y-4">
                  <h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {format(new Date(post.date), "MMMM d, yyyy")}
                      </time>
                    </div>
                    
                    <Separator orientation="vertical" className="h-4" />
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{readingTime} min read</span>
                    </div>

                    <Separator orientation="vertical" className="h-4" />
                    
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Article</span>
                    </div>
                  </div>
                </div>

                {/* Author & Categories */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=Author&background=random`} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Author</p>
                      <p className="text-sm text-muted-foreground">Content Creator</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.categories && post.categories.length > 0 && (
                      <>
                        {post.categories.slice(0, 3).map((categoryId) => (
                          <Badge key={categoryId} variant="secondary">
                            Category {categoryId}
                          </Badge>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <Separator />
              </header>

              {/* Article Content */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div 
                  className="text-lg leading-8"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>

              {/* Article Footer */}
              <footer className="space-y-6 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>
              </footer>
            </motion.div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-md bg-accent/30 border-t">
            <div className="container max-w-6xl">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">Related Articles</h2>
                  <p className="text-muted-foreground mt-2">
                    Continue reading with these related posts
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.slice(0, 3).map((relatedPost) => (
                    <Card key={relatedPost.id} className="card-hover">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          <Link 
                            href={`/blog/${relatedPost.slug}`}
                            className="hover:text-primary transition-colors"
                            dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                          />
                        </h3>
                        <p 
                          className="text-sm text-muted-foreground line-clamp-3"
                          dangerouslySetInnerHTML={{ 
                            __html: relatedPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...' 
                          }}
                        />
                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <time dateTime={relatedPost.date}>
                            {format(new Date(relatedPost.date), "MMM d, yyyy")}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}