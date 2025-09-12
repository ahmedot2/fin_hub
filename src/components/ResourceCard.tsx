"use client";

import type { Resource } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-lg h-full group overflow-hidden">
      {resource.image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={resource.image.url}
            alt={resource.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={resource.image.hint}
          />
        </div>
      )}
      <div className={cn("flex flex-col flex-grow", !resource.image && "h-full")}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg leading-snug">{resource.name}</CardTitle>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${resource.name}`}>
              <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </a>
          </div>
          <CardDescription className="pt-2 text-sm">
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
      </div>
    </Card>
  );
}
