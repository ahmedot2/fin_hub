"use client";

import type { Resource } from '@/lib/types';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
      <Card className="overflow-visible bg-transparent border-none shadow-none">
        <div className="card-inner">
          <div className="box">
            <div className="imgBox">
              {resource.image ? (
                <Image
                  src={resource.image.url}
                  alt={resource.name}
                  fill
                  className="object-cover"
                  data-ai-hint={resource.image.hint}
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No image</p>
                </div>
              )}
            </div>
            <div className="icon">
              <div className="iconBox">
                <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <ArrowUpRight size={24} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
            <CardTitle className="text-xl font-bold leading-snug mt-2">{resource.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-3 mt-1">
              {resource.description}
            </CardDescription>
        </div>
      </Card>
    </a>
  );
}
