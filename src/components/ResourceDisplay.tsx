import type { Category } from "@/lib/types";
import { ResourceCard } from "./ResourceCard";
import { SubcategoryTabs } from "./layout/SubcategoryTabs";
import React from "react";

interface ResourceDisplayProps {
  category: Category;
  searchQuery: string;
}

export function ResourceDisplay({ category, searchQuery }: ResourceDisplayProps) {
  const filteredResources = category.resources
    .filter(resource =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const subcategoriesInOrder = [...new Set(category.resources.map(r => r.subcategory))];
  const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

  const resourcesBySubcategory = filteredResources.reduce((acc, resource) => {
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

      {filteredResources.length > 0 ? (
        <>
          <SubcategoryTabs
            subcategories={subcategoriesInOrder}
            sectionRefs={sectionRefs}
          />
          {subcategoriesInOrder.map((subcategory) => {
            const resources = resourcesBySubcategory[subcategory];
            if (!resources || resources.length === 0) {
              return null;
            }
            return (
              <section
                key={subcategory}
                ref={(el) => (sectionRefs.current[subcategory] = el)}
                className="scroll-mt-24"
              >
                <h2 className="mb-6 border-b pb-2 text-2xl font-semibold tracking-tight text-foreground">{subcategory}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            )
          })}
        </>
      ) : (
        <div className="flex h-[calc(100vh-20rem)] items-center justify-center rounded-lg border-2 border-dashed bg-muted">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">No Results Found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or selecting a different category.</p>
          </div>
        </div>
      )}
    </div>
  );
}
