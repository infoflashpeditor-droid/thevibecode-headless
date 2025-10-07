"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

import { Logo } from "@/components/atoms/logo";
import { NewsletterSignup } from "@/components/molecules/newsletter-signup";
import { TypographyH4, TypographyMuted } from "@/components/atoms/typography";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const footerLinks = {
  product: [
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Resources", href: "/resources" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    { name: "GitHub", href: "#", icon: Github },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Email", href: "mailto:hello@thevibecode.io", icon: Mail },
  ],
};

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-muted/50", className)}>
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo size="md" />
            <TypographyMuted className="max-w-xs">
              Empowering developers with high-quality tutorials, tips, and insights 
              to build amazing things.
            </TypographyMuted>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <TypographyH4 className="text-base">Product</TypographyH4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <TypographyH4 className="text-base">Company</TypographyH4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <TypographyH4 className="text-base">Stay Updated</TypographyH4>
            <TypographyMuted className="text-sm">
              Get the latest tutorials and coding tips delivered to your inbox.
            </TypographyMuted>
            <NewsletterSignup 
              size="sm"
              placeholder="Enter your email..."
              className="max-w-sm"
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <TypographyMuted className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} The Vibe Code. All rights reserved.
          </TypographyMuted>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by developers, for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}