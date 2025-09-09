"use client";

import { useState } from 'react';
import type { Resource } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle2, CircleDashed, ExternalLink, Info, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { checkLinkHealth } from '@/app/actions';
import type { LinkHealthCheckerOutput } from '@/ai/flows/link-health-checker';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [verification, setVerification] = useState<LinkHealthCheckerOutput | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerification(null);
    try {
      const result = await checkLinkHealth(resource.url);
      setVerification(result);
      toast({
        title: "Verification Complete",
        description: `Checked ${resource.name}. Status: ${result.healthy ? 'Healthy' : 'Broken'}.`,
      });
    } catch (error) {
      console.error("Verification failed:", error);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Could not verify the link. Please try again later.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const VerificationStatus = () => {
    if (isVerifying) {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Verifying...</span>
        </div>
      );
    }

    if (!verification) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-muted-foreground cursor-help">
                <CircleDashed className="h-4 w-4" />
                <span>Unverified</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last check: {formatDistanceToNow(new Date(resource.lastVerified), { addSuffix: true })}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    const Icon = verification.healthy ? CheckCircle2 : XCircle;
    const color = verification.healthy ? "text-green-600" : "text-red-600";
    const darkColor = verification.healthy ? "dark:text-green-500" : "dark:text-red-500";

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex items-center gap-2 cursor-help font-medium", color, darkColor)}>
              <Icon className="h-4 w-4" />
              <span>{verification.healthy ? 'Healthy' : 'Broken'}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs space-y-1">
            <p className="font-bold">Status Code: {verification.statusCode}</p>
            <p className="text-sm text-muted-foreground">{verification.summary}</p>
            <p className="text-xs text-muted-foreground/80 pt-1">
              Verified: {new Date(verification.lastVerified).toLocaleString()}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className="flex h-full flex-col transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-snug">{resource.name}</CardTitle>
          <a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${resource.name}`}>
            <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </a>
        </div>
        <CardDescription className="pt-2 text-sm">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex items-center justify-between rounded-b-lg border-t bg-muted/50 p-3">
        <div className="flex items-center gap-2 text-sm">
          <VerificationStatus />
        </div>
        <Button variant="ghost" size="sm" onClick={handleVerify} disabled={isVerifying} className="text-primary hover:text-primary">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Verify Link</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
