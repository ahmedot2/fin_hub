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
    <Card className={cn(
      "flex flex-col transition-all duration-300 hover:shadow-lg h-full group",
      resource.image && "relative text-primary-foreground overflow-hidden"
    )}>
      {resource.image && (
        <>
          <Image
            src={resource.image.url}
            alt={resource.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={resource.image.hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
        </>
      )}
      <div className={cn("flex flex-col h-full", resource.image && "z-20")}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg leading-snug">{resource.name}</CardTitle>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${resource.name}`}>
              <ExternalLink className={cn("h-5 w-5", !resource.image && "text-muted-foreground transition-colors hover:text-primary")} />
            </a>
          </div>
          <CardDescription className={cn("pt-2 text-sm", resource.image && "text-primary-foreground/80")}>
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
      </div>
    </Card>
  );
}
