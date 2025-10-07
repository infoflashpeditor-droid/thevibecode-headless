"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WordPressPost } from "@/types/wordpress";

interface BlogPostCardProps {
  post: WordPressPost;
  featured?: boolean;
  index?: number;
  className?: string;
}

export function BlogPostCard({ 
  post, 
  featured = false, 
  index = 0,
  className 
}: BlogPostCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Extract featured image from _embedded if available
  const featuredImage = post._links?.['wp:attachment']?.[0] ? 
    `https://thevibecode.io/wp-content/uploads/placeholder-image.jpg` : 
    '/placeholder-blog.jpg';

  // Clean excerpt - remove HTML tags
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();

  // Estimated reading time (simple calculation: 200 words per minute)
  const wordCount = post.content.rendered.split(' ').length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("group", className)}
    >
      <Card className={cn(
        "h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300",
        "bg-gradient-to-br from-card to-card/50",
        featured && "md:col-span-2 lg:col-span-2"
      )}>
        {/* Featured Image */}
        <CardHeader className="p-0">
          <div className={cn(
            "relative overflow-hidden",
            featured ? "h-64 md:h-80" : "h-48"
          )}>
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                fill
                className="object-cover"
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              />
            </motion.div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Post status badge */}
            {post.sticky && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4"
              >
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </motion.div>
            )}
            
            {/* Categories */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2">
              {post.categories.slice(0, 2).map((categoryId) => (
                <Badge 
                  key={categoryId} 
                  variant="outline" 
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Category {categoryId}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn("p-6", featured && "md:p-8")}>
          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMM dd, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Author</span>
            </div>
          </div>

          {/* Title */}
          <motion.h2 
            className={cn(
              "font-bold leading-tight text-foreground mb-3 line-clamp-2",
              featured ? "text-2xl md:text-3xl" : "text-xl"
            )}
            animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              href={`/blog/${post.slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </motion.h2>

          {/* Excerpt */}
          <p className={cn(
            "text-muted-foreground leading-relaxed line-clamp-3",
            featured ? "text-base" : "text-sm"
          )}>
            {cleanExcerpt || "Discover amazing insights and tips in this post..."}
          </p>
        </CardContent>

        <CardFooter className={cn("p-6 pt-0", featured && "md:p-8 md:pt-0")}>
          <div className="flex items-center justify-between w-full">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tagId) => (
                <Badge 
                  key={tagId} 
                  variant="secondary" 
                  className="text-xs"
                >
                  Tag {tagId}
                </Badge>
              ))}
            </div>

            {/* Read more button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="group/btn p-0 h-auto font-medium"
              asChild
            >
              <Link href={`/blog/${post.slug}`}>
                <span className="mr-2">Read more</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}