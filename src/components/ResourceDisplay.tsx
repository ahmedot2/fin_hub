import type { Category } from "@/lib/types";
import { ResourceCard } from "./ResourceCard";

interface ResourceDisplayProps {
  category: Category;
}

export function ResourceDisplay({ category }: ResourceDisplayProps) {
  const resourcesBySubcategory = category.resources.reduce((acc, resource) => {
    const sub = resource.subcategory;
    if (!acc[sub]) {
      acc[sub] = [];
    }
    acc[sub].push(resource);
    return acc;
  }, {} as Record<string, typeof category.resources>);

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">{category.name}</h1>
        <p className="text-lg text-muted-foreground">
          {category.description}
        </p>
      </div>

      {Object.entries(resourcesBySubcategory).map(([subcategory, resources]) => (
        <section key={subcategory}>
          <h2 className="mb-6 border-b pb-2 text-2xl font-semibold tracking-tight text-foreground">{subcategory}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
