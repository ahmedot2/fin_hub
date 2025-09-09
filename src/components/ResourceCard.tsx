"use client";

import type { Resource } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
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
    </Card>
  );
}
