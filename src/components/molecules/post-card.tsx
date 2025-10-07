"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TypographyH4, TypographyMuted, TypographyP } from "@/components/atoms/typography";
import { WordPressPost } from "@/types/wordpress";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: WordPressPost;
  className?: string;
  variant?: "default" | "featured" | "compact";
  showAuthor?: boolean;
  showReadMore?: boolean;
}

export function PostCard({ 
  post, 
  className, 
  variant = "default", 
  showAuthor = false,
  showReadMore = true 
}: PostCardProps) {
  const readingTime = React.useMemo(() => {
    const wordsPerMinute = 200;
    const textContent = post.content.rendered.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post.content.rendered]);

  const cardVariants = {
    default: "h-full",
    featured: "h-full border-primary/20 bg-gradient-to-br from-card to-accent/5",
    compact: "h-auto"
  };

  const contentVariants = {
    default: "space-y-4",
    featured: "space-y-6",
    compact: "space-y-2"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className={cn(
        "card-hover transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg",
        cardVariants[variant],
        className
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <TypographyH4 className={cn(
                "line-clamp-2 group-hover:text-primary transition-colors",
                variant === "featured" && "text-xl",
                variant === "compact" && "text-lg"
              )}>
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title.rendered}
                </Link>
              </TypographyH4>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </time>
                </div>
                
                <Separator orientation="vertical" className="h-4" />
                
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {showAuthor && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=Author&background=random`} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">By Author</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        {variant !== "compact" && (
          <CardContent className={contentVariants[variant]}>
            <div 
              className={cn(
                "line-clamp-3 text-muted-foreground leading-7",
                variant === "featured" && "text-base"
              )}
              dangerouslySetInnerHTML={{ 
                __html: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
              }}
            />
            
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.categories.slice(0, 3).map((categoryId) => (
                  <Badge 
                    key={categoryId} 
                    variant="secondary" 
                    className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    Category {categoryId}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        )}

        {showReadMore && variant !== "compact" && (
          <CardFooter className="pt-4">
            <Button variant="ghost" size="sm" asChild className="group/button p-0 h-auto">
              <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-primary hover:text-primary/80">
                Read more
                <ArrowRight className="h-3 w-3 transition-transform group-hover/button:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}