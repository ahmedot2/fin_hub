import type { LucideIcon } from "lucide-react";

export interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  label: string;
  lastVerified: number;
  subcategory: string;
  image?: {
    url: string;
    hint: string;
  }
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  resources: Resource[];
  image: {
    url: string;
    hint: string;
  }
}
