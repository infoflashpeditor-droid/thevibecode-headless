"use client";

import * as React from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
}

export function NewsletterSignup({ 
  className, 
  size = "md",
  placeholder = "Enter your email..."
}: NewsletterSignupProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Newsletter signup:", data);
      
      toast.success("Successfully subscribed!", {
        description: "Welcome to our newsletter! You'll receive updates about new posts and coding tips.",
      });
      
      form.reset();
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later or contact support if the problem persists.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  };

  const buttonSizes = {
    sm: "sm" as const,
    md: "default" as const,
    lg: "lg" as const
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={cn("space-y-2", className)}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type="email"
                    className={cn(sizeClasses[size])}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            size={buttonSizes[size]}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span className="hidden sm:inline">Subscribing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}