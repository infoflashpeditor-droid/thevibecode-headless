"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ConfigCheckResult {
  name: string;
  status: "success" | "error" | "warning";
  message: string;
  details?: string;
}

export function ConfigurationChecker() {
  const [checks, setChecks] = React.useState<ConfigCheckResult[]>([]);
  const [isChecking, setIsChecking] = React.useState(false);

  const performChecks = async () => {
    setIsChecking(true);
    const results: ConfigCheckResult[] = [];

    // Environment Variables Check
    if (process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
      results.push({
        name: "WordPress API URL",
        status: "success",
        message: "Environment variable configured",
        details: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      });
    } else {
      results.push({
        name: "WordPress API URL",
        status: "error",
        message: "Missing NEXT_PUBLIC_WORDPRESS_API_URL",
        details: "Add this to your .env.local file"
      });
    }

    // Site URL Check
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      results.push({
        name: "Site URL",
        status: "success",
        message: "Site URL configured",
        details: process.env.NEXT_PUBLIC_SITE_URL
      });
    } else {
      results.push({
        name: "Site URL",
        status: "warning",
        message: "Site URL not set",
        details: "Using default localhost"
      });
    }

    // WordPress API Connectivity
    try {
      const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://wp.thevibecode.io/wp-json/wp/v2";
      const response = await fetch(`${apiUrl}/posts?per_page=1`, {
        method: "HEAD"
      });

      if (response.ok) {
        results.push({
          name: "WordPress API Connection",
          status: "success",
          message: "API is accessible",
          details: `Status: ${response.status}`
        });
      } else {
        results.push({
          name: "WordPress API Connection",
          status: "error",
          message: "API returned error",
          details: `Status: ${response.status}`
        });
      }
    } catch (error) {
      results.push({
        name: "WordPress API Connection",
        status: "error",
        message: "Cannot connect to WordPress API",
        details: error instanceof Error ? error.message : "Network error"
      });
    }

    // Check if running in production
    const isProduction = process.env.NODE_ENV === "production";
    results.push({
      name: "Environment",
      status: isProduction ? "success" : "warning",
      message: isProduction ? "Production environment" : "Development environment",
      details: `NODE_ENV: ${process.env.NODE_ENV}`
    });

    setChecks(results);
    setIsChecking(false);

    const hasErrors = results.some(r => r.status === "error");
    if (hasErrors) {
      toast.error("Configuration issues found", {
        description: "Check the results below for details"
      });
    } else {
      toast.success("Configuration looks good!", {
        description: "All checks passed successfully"
      });
    }
  };

  React.useEffect(() => {
    performChecks();
  }, []);

  const getStatusIcon = (status: ConfigCheckResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: ConfigCheckResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Success</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Warning</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Configuration Status
          <Button
            variant="outline"
            size="sm"
            onClick={performChecks}
            disabled={isChecking}
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardTitle>
        <CardDescription>
          Verify your headless WordPress + Next.js configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
              {getStatusIcon(check.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{check.name}</h4>
                  {getStatusBadge(check.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{check.message}</p>
                {check.details && (
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                    {check.details}
                  </code>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}