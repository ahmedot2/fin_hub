"use client";

import type { Resource } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-lg h-full group overflow-hidden">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        {resource.image ? (
          <Image
            src={resource.image.url}
            alt={resource.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={resource.image.hint}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <CardTitle className="text-xl font-bold leading-snug mb-2">{resource.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {resource.description}
          </CardDescription>
        </div>
        <div className="mt-4 flex justify-between items-center">
            <Button asChild variant="outline" size="sm">
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    Visit Site
                    <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </Button>
        </div>
      </div>
    </Card>
  );
}
