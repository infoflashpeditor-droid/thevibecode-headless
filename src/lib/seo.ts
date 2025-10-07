import { Metadata } from 'next';
import { WordPressPost, WordPressPage } from '@/types/wordpress';

// Site configuration
export const siteConfig = {
  name: "The Vibe Code",
  description: "Your ultimate destination for coding tutorials, tips, and insights. Join the vibe and level up your development skills.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  twitterHandle: "@thevibecode",
  keywords: [
    "coding",
    "programming", 
    "web development",
    "tutorials",
    "javascript",
    "react",
    "nextjs",
    "typescript",
    "tech blog",
    "developer resources"
  ]
};

// Generate metadata for homepage
export function generateHomeMetadata(): Metadata {
  return {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate metadata for blog listing page
export function generateBlogMetadata(): Metadata {
  const title = `Blog - ${siteConfig.name}`;
  const description = "Discover the latest coding tutorials, tips, and insights to level up your development skills.";
  
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, "blog", "articles", "posts"],
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}/blog`,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

// Generate metadata for individual blog post
export function generatePostMetadata(post: WordPressPost): Metadata {
  // Clean HTML from title and excerpt
  const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '');
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  
  const title = `${cleanTitle} - ${siteConfig.name}`;
  const description = cleanExcerpt || siteConfig.description;
  const url = `${siteConfig.url}/blog/${post.slug}`;
  
  // Extract categories and tags for keywords
  const postKeywords = [
    ...siteConfig.keywords,
    cleanTitle.toLowerCase().split(' ').filter(word => word.length > 3),
  ].flat();

  return {
    title,
    description,
    keywords: postKeywords,
    authors: [{ name: "The Vibe Code Team" }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      title: cleanTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage, // You can later extract featured image from post
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [siteConfig.name],
      section: "Technology",
      tags: postKeywords,
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate metadata for pages
export function generatePageMetadata(page: WordPressPage): Metadata {
  const cleanTitle = page.title.rendered.replace(/<[^>]*>/g, '');
  const cleanExcerpt = page.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  
  const title = `${cleanTitle} - ${siteConfig.name}`;
  const description = cleanExcerpt || siteConfig.description;
  const url = `${siteConfig.url}/${page.slug}`;

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: cleanTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

// Generate JSON-LD structured data for blog posts
export function generatePostJsonLd(post: WordPressPost) {
  const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '');
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": cleanTitle,
    "description": cleanExcerpt,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "datePublished": post.date,
    "dateModified": post.modified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`
    },
    "url": `${siteConfig.url}/blog/${post.slug}`,
    "image": siteConfig.ogImage,
    "articleSection": "Technology",
    "inLanguage": "en-US"
  };
}

// Generate JSON-LD structured data for the website
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    }
  };
}