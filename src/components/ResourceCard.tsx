"use client";

import type { Resource } from '@/lib/types';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {resource.image ? (
            <Image
              src={resource.image.url}
              alt={resource.name}
              fill
              className="object-contain"
              data-ai-hint={resource.image.hint}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No image available</p>
            </div>
          )}
           <div className="absolute bottom-0 w-full p-4 bg-black/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-primary-foreground">{resource.name}</h3>
          </div>
        </div>
        <div className="flip-card-back p-6 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold mb-2">{resource.name}</h3>
          <p className="text-sm mb-4 line-clamp-4">{resource.description}</p>
          <Button asChild variant="secondary">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Visit Site <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
